

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Clock,
  Zap,
  AlertTriangle,
  RefreshCw,
  MapPin,
  CalendarDays,
  Radio,
  Info,
  CheckCircle2,
  Activity,
  CalendarClock,
} from "lucide-react";
import LoadSheddingAlerts from "../components/LoadSheddingAlerts";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const FILTERS = [
  { value: "All", label: "সব নোটিশ" },
  { value: "Ongoing", label: "চলমান" },
  { value: "Scheduled", label: "নির্ধারিত" },
  { value: "Completed", label: "সম্পন্ন" },
];

const LoadShedding = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLoadShedding = useCallback(async (manual = false) => {
    if (!API_URL) {
      setError("VITE_GOOGLE_SCRIPT_URL .env ফাইলে পাওয়া যায়নি।");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    if (manual) setRefreshing(true);

    try {
      const url =
        `${API_URL}${API_URL.includes("?") ? "&" : "?"}` +
        "action=getLoadShedding";

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("সার্ভার থেকে তথ্য আনা যায়নি।");
      }

      const result = await response.json();

      if (result.success === false) {
        throw new Error(result.message || "API error");
      }

      const rows = Array.isArray(result.loadShedding)
        ? result.loadShedding
        : Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.records)
        ? result.records
        : [];

      const visibleRows = rows.filter((item) => {
        const status = String(item.status || "Scheduled")
          .trim()
          .toLowerCase();

        return !["cancelled", "inactive"].includes(status);
      });

      // Ongoing first, then scheduled, then completed.
      const priority = {
        Ongoing: 0,
        Active: 1,
        Scheduled: 2,
        Completed: 3,
      };

      visibleRows.sort((a, b) => {
        const pa = priority[a.status] ?? 4;
        const pb = priority[b.status] ?? 4;

        if (pa !== pb) return pa - pb;

        return String(a.date || "").localeCompare(
          String(b.date || "")
        );
      });

      setNotices(visibleRows);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      console.error("Load Shedding Error:", err);
      setError(
        "লোডশেডিংয়ের তথ্য আনা যায়নি। ইন্টারনেট, Apps Script URL এবং deployment পরীক্ষা করুন।"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLoadShedding();

    const timer = setInterval(() => {
      fetchLoadShedding();
    }, 60000);

    return () => clearInterval(timer);
  }, [fetchLoadShedding]);

  const counts = useMemo(() => {
    const total = notices.length;
    const ongoing = notices.filter((n) =>
      ["Ongoing", "Active"].includes(n.status)
    ).length;
    const scheduled = notices.filter(
      (n) => n.status === "Scheduled"
    ).length;
    const completed = notices.filter(
      (n) => n.status === "Completed"
    ).length;

    return { total, ongoing, scheduled, completed };
  }, [notices]);

  const filteredNotices = useMemo(() => {
    if (filter === "All") return notices;

    if (filter === "Ongoing") {
      return notices.filter((n) =>
        ["Ongoing", "Active"].includes(n.status)
      );
    }

    return notices.filter((n) => n.status === filter);
  }, [notices, filter]);

  const formatTime = (time) => {
    if (!time) return "সময় উল্লেখ নেই";

    const match = String(time).trim().match(/^(\d{1,2}):(\d{2})/);
    if (!match) return String(time);

    let hour = Number(match[1]);
    const minute = match[2];
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${period}`;
  };

  const formatBanglaTime = (time) => {
    if (!time) return "সময় উল্লেখ নেই";

    const match = String(time).trim().match(/^(\d{1,2}):(\d{2})/);
    if (!match) return String(time);

    const hour = Number(match[1]);
    const minute = match[2];

    let period = "রাত";

    if (hour >= 5 && hour < 12) period = "সকাল";
    else if (hour >= 12 && hour < 16) period = "দুপুর";
    else if (hour >= 16 && hour < 18) period = "বিকাল";

    const toBangla = (value) =>
      String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

    return `${period} ${toBangla(hour % 12 || 12)}:${toBangla(minute)}`;
  };

  const formatDate = (date) => {
    if (!date) return "তারিখ উল্লেখ নেই";

    const value = String(date).trim();
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (match) return `${match[3]}/${match[2]}/${match[1]}`;

    return value;
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "Ongoing":
        return {
          label: "চলমান",
          english: "ONGOING",
          style: "bg-red-100 text-red-800 border-red-200",
          icon: <Activity size={16} />,
        };

      case "Active":
        return {
          label: "সক্রিয়",
          english: "ACTIVE",
          style: "bg-red-100 text-red-800 border-red-200",
          icon: <Activity size={16} />,
        };

      case "Completed":
        return {
          label: "সম্পন্ন",
          english: "COMPLETED",
          style: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle2 size={16} />,
        };

      default:
        return {
          label: "নির্ধারিত",
          english: "SCHEDULED",
          style: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <CalendarClock size={16} />,
        };
    }
  };

  return (








    <section className="w-full px-4 py-6 md:px-8">

{/* New Load Shedding Alert */}
<section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
  <LoadSheddingAlerts />
</section>

      {/* Heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 md:text-3xl">
            Live Load Shedding Status
          </h1>
          <p className="mt-1 text-sm text-slate-600 md:text-base">
            লাইভ লোডশেডিং অবস্থা ও সর্বশেষ বিজ্ঞপ্তি
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchLoadShedding(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Summary Statistics */}
      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Info size={19} />
            <span className="text-sm font-semibold">মোট নোটিশ</span>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-800">
            {loading ? "—" : counts.total}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total Notices</p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-red-700">
            <Activity size={19} />
            <span className="text-sm font-semibold">চলমান</span>
          </div>
          <p className="mt-3 text-3xl font-black text-red-700">
            {loading ? "—" : counts.ongoing}
          </p>
          <p className="mt-1 text-xs text-red-600">Ongoing</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700">
            <CalendarClock size={19} />
            <span className="text-sm font-semibold">নির্ধারিত</span>
          </div>
          <p className="mt-3 text-3xl font-black text-amber-700">
            {loading ? "—" : counts.scheduled}
          </p>
          <p className="mt-1 text-xs text-amber-600">Scheduled</p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 size={19} />
            <span className="text-sm font-semibold">সম্পন্ন</span>
          </div>
          <p className="mt-3 text-3xl font-black text-green-700">
            {loading ? "—" : counts.completed}
          </p>
          <p className="mt-1 text-xs text-green-600">Completed</p>
        </div>
      </div>

      {/* Auto-refresh status */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
          </span>
          <span className="font-semibold">
            স্বয়ংক্রিয় আপডেট চালু — প্রতি ৬০ সেকেন্ডে
          </span>
        </div>

        {lastUpdated && (
          <span className="text-xs text-blue-700">
            সর্বশেষ: {lastUpdated.toLocaleTimeString("en-GB")}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-white px-4 py-12 text-center">
          <RefreshCw className="mb-3 animate-spin text-red-600" size={35} />
          <p className="font-semibold text-slate-700">
            লোডশেডিংয়ের তথ্য লোড হচ্ছে...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="mt-1 shrink-0" />
            <div>
              <h2 className="font-bold">তথ্য লোড করা যায়নি</h2>
              <p className="mt-1 text-sm leading-6">{error}</p>
              <button
                type="button"
                onClick={() => fetchLoadShedding(true)}
                className="mt-3 rounded-lg bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && (
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const selected = filter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  selected
                    ? "border-red-700 bg-red-700 text-white shadow"
                    : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:bg-red-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* No notices */}
      {!loading && !error && filteredNotices.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Info size={32} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-800">
            {filter === "All"
              ? "বর্তমানে কোনো লোডশেডিং বিজ্ঞপ্তি নেই"
              : "এই বিভাগে কোনো বিজ্ঞপ্তি নেই"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            নতুন বিজ্ঞপ্তি প্রকাশ করা হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}

      {/* Notice Cards */}
      {!loading && !error && filteredNotices.length > 0 && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {filteredNotices.map((item, index) => {
            const status = getStatusInfo(item.status);

            return (
              <article
                key={item.id || `${item.date}-${item.feeder}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-orange-500 p-5 text-white md:p-6">
                  <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/20">
                        <AlertTriangle size={27} />
                      </div>
                      <div>
                        <h2 className="text-lg font-extrabold md:text-xl">
                          LOAD SHEDDING NOTICE
                        </h2>
                        <p className="mt-1 text-sm text-red-50">
                          লোডশেডিং সংক্রান্ত জরুরি বিজ্ঞপ্তি
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold">
                      #{item.id || index + 1}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-5 md:p-6">
                  {/* Live Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-500">
                      বর্তমান অবস্থা / Current Status
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold ${status.style}`}
                    >
                      {status.icon}
                      {status.english}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    {status.label}
                  </p>

                  {/* Date */}
                  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                    <CalendarDays className="mt-1 shrink-0 text-red-600" size={22} />
                    <div>
                      <p className="text-sm text-slate-500">
                        Date / তারিখ
                      </p>
                      <p className="mt-1 font-bold text-slate-800">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-5">
                    <div className="mb-3 flex items-center justify-center gap-2 text-red-700">
                      <Clock size={22} />
                      <h3 className="font-bold">Load Shedding Time</h3>
                    </div>

                    <p className="text-center text-2xl font-black tracking-wide text-red-800 md:text-3xl">
                      {formatTime(item.startTime)}
                      <span className="mx-2 text-orange-500">–</span>
                      {formatTime(item.endTime)}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-red-700 md:text-base">
                      <Zap size={18} />
                      <span>
                        {formatBanglaTime(item.startTime)}
                        {" – "}
                        {formatBanglaTime(item.endTime)}
                      </span>
                    </div>
                  </div>

                  {/* Feeder and Area */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                      <Radio className="mt-1 shrink-0 text-orange-600" size={21} />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Feeder / ফিডার</p>
                        <p className="mt-1 break-words font-bold text-slate-800">
                          {item.feeder || "উল্লেখ নেই"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                      <MapPin className="mt-1 shrink-0 text-red-600" size={21} />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Area / এলাকা</p>
                        <p className="mt-1 break-words font-bold text-slate-800">
                          {item.area || "উল্লেখ নেই"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notice */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-amber-800">
                      <AlertTriangle size={19} />
                      <h3 className="font-bold">Notice / বিজ্ঞপ্তি</h3>
                    </div>

                    <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                      {item.notice ||
                        "নির্ধারিত সময়ে বিদ্যুৎ সরবরাহ বন্ধ থাকতে পারে। সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।"}
                    </p>
                  </div>

                  {item.updatedAt && (
                    <p className="text-xs text-slate-500">
                      সর্বশেষ আপডেট: {item.updatedAt}
                    </p>
                  )}

                  <div className="border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
                    নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
                    <br />
                    বরপা সাব-জোনাল অফিস
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate-500">
        লোডশেডিংয়ের স্ট্যাটাস প্রতি ৬০ সেকেন্ডে পুনরায় যাচাই করা হয়।
      </p>
    </section>
  );
};

export default LoadShedding;