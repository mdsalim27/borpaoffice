

import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw, Trash2, Clock, CalendarDays, MapPin, Zap, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const ADMIN_KEY = "BarpaAdmin@2026";

const initialForm = { date: "", startTime: "", endTime: "", feeder: "", area: "", status: "Active", notice: "" };

export default function LoadSheddingManager() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState("");

  const loadData = useCallback(async () => {
    if (!API_URL) return setMessage("API URL পাওয়া যায়নি।");
    setLoading(true);
    try {
      const url = `${API_URL}?action=getLoadShedding&key=${encodeURIComponent(ADMIN_KEY)}&t=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.loadShedding || []);
      setMessage("");
    } catch (err) {
      setMessage("ডেটা লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const params = new URLSearchParams();
      params.append("action", "saveLoadShedding");
      params.append("key", ADMIN_KEY);
      params.append("id", editingId);
      params.append("date", form.date);
      params.append("startTime", form.startTime);
      params.append("endTime", form.endTime);
      params.append("feeder", form.feeder.trim());
      params.append("area", form.area.trim());
      params.append("status", form.status);
      params.append("notice", form.notice.trim());

      const res = await fetch(API_URL, { method: "POST", body: params });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setMessage("নোটিশ সফলভাবে সংরক্ষিত হয়েছে।");
      setForm(initialForm);
      setEditingId("");
      await loadData();
    } catch (err) {
      setMessage("সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("মুছে ফেলবেন?")) return;
    try {
      const params = new URLSearchParams();
      params.append("action", "deleteLoadShedding");
      params.append("key", ADMIN_KEY);
      params.append("id", id);

      const res = await fetch(API_URL, { method: "POST", body: params });
      const data = await res.json();
      if (data.success) {
        setMessage("মুছে ফেলা হয়েছে।");
        await loadData();
      }
    } catch (err) {
      setMessage("ডিলিট হয়নি।");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2"><Zap /> Load Shedding Manager</h1>
      {message && <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">{message}</div>}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <input required type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded" />
        <input required name="feeder" placeholder="Feeder" value={form.feeder} onChange={handleChange} className="p-2 border rounded" />
        <input required type="time" name="startTime" value={form.startTime} onChange={handleChange} className="p-2 border rounded" />
        <input required type="time" name="endTime" value={form.endTime} onChange={handleChange} className="p-2 border rounded" />
        <input required name="area" placeholder="Area" value={form.area} onChange={handleChange} className="p-2 border rounded" />
        <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <textarea required name="notice" placeholder="Notice" value={form.notice} onChange={handleChange} className="p-2 border rounded md:col-span-2" />
        <button disabled={saving} className="bg-red-600 text-white p-2 rounded font-bold md:col-span-2">
          {saving ? "সংরক্ষণ হচ্ছে..." : editingId ? "আপডেট করুন" : "সংরক্ষণ করুন"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-white border rounded-xl shadow-sm space-y-2">
            <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100'}`}>{item.status}</span>
            <h3 className="font-bold">{item.notice}</h3>
            <p className="text-sm text-slate-500">{item.date} ({item.startTime} - {item.endTime})</p>
            <p className="text-sm text-slate-500">{item.feeder} • {item.area}</p>
            <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm font-semibold flex items-center gap-1"><Trash2 size={14} /> Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}