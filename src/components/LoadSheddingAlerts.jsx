import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, BellRing, CheckCircle2, X } from "lucide-react";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const POLL_INTERVAL = 60_000;
const SEEN_KEY = "barpa_load_shedding_notice_ids_v1";

function getRows(payload) {
  if (Array.isArray(payload?.loadShedding)) return payload.loadShedding;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.records)) return payload.records;
  if (Array.isArray(payload)) return payload;
  return [];
}

function getId(item) {
  return String(item?.id || item?.ID || item?.noticeId || "").trim();
}

function isPublicNotice(item) {
  const status = String(item?.status || "").trim().toLowerCase();
  return ["scheduled", "ongoing", "active"].includes(status);
}

function getTitle(item) {
  return String(item?.notice || item?.Notice || "নতুন লোডশেডিং বিজ্ঞপ্তি").trim();
}

function getMessage(item) {
  const date = item?.date || item?.Date || "";
  const start = item?.startTime || item?.StartTime || "";
  const end = item?.endTime || item?.EndTime || "";
  const feeder = item?.feeder || item?.Feeder || "";
  const area = item?.area || item?.Area || "";
  return [
    date ? `তারিখ: ${date}` : "",
    start || end ? `সময়: ${start || "—"} – ${end || "—"}` : "",
    feeder ? `ফিডার: ${feeder}` : "",
    area ? `এলাকা: ${area}` : "",
  ].filter(Boolean).join(" • ");
}

function readSeenIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved.map(String) : []);
  } catch {
    return new Set();
  }
}

function saveSeenIds(ids) {
  try {
    // Keep the latest 300 IDs to avoid unbounded local storage growth.
    localStorage.setItem(SEEN_KEY, JSON.stringify([...ids].slice(-300)));
  } catch {
    // Alerts still work for the current page session if storage is unavailable.
  }
}

/**
 * Customer-facing Load Shedding Alert.
 * Add <LoadSheddingAlerts /> to a public page such as LoadShedding.jsx.
 *
 * This checks the public getLoadShedding API while the website is open.
 * For notifications while the browser/site is closed, a push service (for
 * example Firebase Cloud Messaging + a service worker) is required.
 */
export default function LoadSheddingAlerts() {
  const [permission, setPermission] = useState(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "unsupported"
  );
  const [latestNotice, setLatestNotice] = useState(null);
  const [noticeCount, setNoticeCount] = useState(0);
  const [error, setError] = useState("");
  const seenRef = useRef(null);
  const initializedRef = useRef(false);
  const busyRef = useRef(false);

  const enableAlerts = useCallback(async () => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        new Notification("বরপা লোডশেডিং অ্যালার্ট চালু হয়েছে", {
          body: "নতুন লোডশেডিং নোটিশ প্রকাশ হলে এই ব্রাউজারে অ্যালার্ট পাবেন, ওয়েবসাইট খোলা থাকা অবস্থায়।",
        });
      }
    } catch (e) {
      console.error("Notification permission:", e);
      setError("এই ব্রাউজারে নোটিফিকেশন চালু করা যায়নি।");
    }
  }, []);

  const checkNotices = useCallback(async () => {
    if (!API_URL || busyRef.current) return;
    busyRef.current = true;
    try {
      const response = await fetch(
        `${API_URL}?action=getLoadShedding&t=${Date.now()}`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error("লোডশেডিং নোটিশ পাওয়া যায়নি।");
      const payload = await response.json();
      if (payload?.success === false) {
        throw new Error(payload.message || "নোটিশ লোড করা যায়নি।");
      }

      const rows = getRows(payload).filter(isPublicNotice);
      setNoticeCount(rows.length);
      setError("");

      if (!seenRef.current) seenRef.current = readSeenIds();

      const identifiedRows = rows.filter((item) => getId(item));
      const currentIds = new Set(identifiedRows.map(getId));

      // On a true first visit (no saved IDs), establish a baseline so old
      // notices do not all alert at once. On later visits, alert for IDs that
      // are not yet in storage, including notices added while the user was away.
      const isFirstVisit = !initializedRef.current && seenRef.current.size === 0;
      initializedRef.current = true;

      const newNotices = isFirstVisit
        ? []
        : identifiedRows.filter((item) => !seenRef.current.has(getId(item)));

      if (newNotices.length > 0) {
        const newest = newNotices[0];
        setLatestNotice(newest);
        newNotices.forEach((item) => seenRef.current.add(getId(item)));
      }

      // Mark currently visible notices as seen, including the first-visit baseline.
      currentIds.forEach((id) => seenRef.current.add(id));
      saveSeenIds(seenRef.current);

      if (newNotices.length > 0 && permission === "granted" && "Notification" in window) {
        newNotices.slice(0, 3).forEach((item) => {
          const notification = new Notification(getTitle(item), {
            body: getMessage(item) || "বরপা সাব-জোনাল অফিস থেকে নতুন লোডশেডিং নোটিশ প্রকাশিত হয়েছে।",
            tag: getId(item),
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        });
      }
    } catch (e) {
      console.error("Load shedding alerts:", e);
      setError(e.message || "নোটিশ আপডেট চেক করা যায়নি।");
    } finally {
      busyRef.current = false;
    }
  }, [permission]);

  useEffect(() => {
    checkNotices();
    const timer = window.setInterval(checkNotices, POLL_INTERVAL);
    const onFocus = () => checkNotices();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [checkNotices]);

  return (
    <section className="w-full" aria-label="লোডশেডিং নোটিশ অ্যালার্ট">
      <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <BellRing size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
              নতুন লোডশেডিং বিজ্ঞপ্তির অ্যালার্ট
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              নতুন নোটিশ প্রকাশ হলে দ্রুত জানতে ব্রাউজার নোটিফিকেশন চালু করুন।
              ওয়েবসাইট খোলা থাকা অবস্থায় প্রতি ১ মিনিটে নোটিশ চেক হবে।
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {noticeCount}টি চলমান/নির্ধারিত নোটিশ পাওয়া গেছে
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={enableAlerts}
          disabled={permission === "granted" || permission === "unsupported"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {permission === "granted" ? (
            <><CheckCircle2 size={17} /> অ্যালার্ট চালু আছে</>
          ) : permission === "denied" ? (
            <><Bell size={17} /> ব্রাউজার সেটিংসে অনুমতি দিন</>
          ) : permission === "unsupported" ? (
            <><Bell size={17} /> এই ব্রাউজারে সমর্থিত নয়</>
          ) : (
            <><Bell size={17} /> অ্যালার্ট চালু করুন</>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700" role="status">
          {error}
        </p>
      )}

      {latestNotice && (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4" role="status" aria-live="polite">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={20} />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-emerald-900">নতুন বিজ্ঞপ্তি প্রকাশিত হয়েছে</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{getTitle(latestNotice)}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{getMessage(latestNotice)}</p>
          </div>
          <button
            type="button"
            onClick={() => setLatestNotice(null)}
            className="rounded-lg p-1 text-slate-500 hover:bg-white hover:text-slate-800"
            aria-label="বিজ্ঞপ্তি বন্ধ করুন"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
