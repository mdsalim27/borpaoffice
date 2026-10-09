import { useState } from "react";
import {
  Send,
  LoaderCircle,
  CheckCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function LoadSheddingForm({ adminKey, onSuccess }) {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    feeder: "",
    area: "",
    status: "Scheduled",
    notice: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-50";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSaved(false);

    try {
      if (!API_URL) {
        throw new Error(
          "Google Apps Script URL পাওয়া যায়নি। .env ফাইল পরীক্ষা করুন।"
        );
      }

      if (!adminKey) {
        throw new Error(
          "Admin Key পাওয়া যায়নি। VITE_ADMIN_KEY পরীক্ষা করুন।"
        );
      }

      // URLSearchParams sends application/x-www-form-urlencoded data,
      // which Apps Script can read reliably through e.parameter.
      const data = new URLSearchParams();
      data.append("action", "saveLoadShedding");
      data.append("key", adminKey);

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, String(value ?? ""));
      });

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ||
            result.error ||
            "Load Shedding Notice সংরক্ষণ করা যায়নি।"
        );
      }

      setSaved(true);
      setMessage("Notice সফলভাবে Google Sheet-এ সংরক্ষিত হয়েছে!");

      setForm({
        date: "",
        startTime: "",
        endTime: "",
        feeder: "",
        area: "",
        status: "Scheduled",
        notice: "",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Load Shedding Submit Error:", err);
      setSaved(false);
      setMessage(
        err.message || "Notice Submit করতে সমস্যা হয়েছে।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="load-shedding-form"
      className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <Zap size={23} />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Load Shedding Notice
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            নতুন বিদ্যুৎ বন্ধের নোটিশ তৈরি ও সংরক্ষণ করুন।
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
        {message && (
          <div
            className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${
              saved
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {saved ? (
              <CheckCircle size={19} className="shrink-0" />
            ) : (
              <AlertTriangle size={19} className="shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Date *
            </label>
            <input
              className={inputClass}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Feeder Name *
            </label>
            <input
              className={inputClass}
              name="feeder"
              value={form.feeder}
              onChange={handleChange}
              placeholder="যেমন: Rupshi-1"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Area *
            </label>
            <input
              className={inputClass}
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="যেমন: বরপা, রূপসী"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Start Time *
            </label>
            <input
              className={inputClass}
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Expected End Time *
            </label>
            <input
              className={inputClass}
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notice Status *
            </label>
            <select
              className={inputClass}
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Scheduled">Scheduled — নির্ধারিত</option>
              <option value="Ongoing">Ongoing — চলমান</option>
              <option value="Completed">Completed — শেষ</option>
              <option value="Cancelled">Cancelled — বাতিল</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Notice Details *
          </label>
          <textarea
            className={inputClass}
            name="notice"
            value={form.notice}
            onChange={handleChange}
            rows={4}
            placeholder="বিদ্যুৎ বন্ধের কারণ, কাজের বিবরণ ও গ্রাহকদের জন্য প্রয়োজনীয় নির্দেশনা লিখুন..."
            required
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Submit করলে Notice Google Sheet-এর LoadShedding ট্যাবে পাঠানো হবে।
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                সংরক্ষণ হচ্ছে...
              </>
            ) : (
              <>
                <Send size={17} />
                Notice Submit করুন
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

