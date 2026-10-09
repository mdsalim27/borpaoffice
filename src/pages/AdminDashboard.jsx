


import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
Search,
RefreshCw,
Clock,
LoaderCircle,
CheckCircle,
FileText,
Phone,
MapPin,
User,
Hash,
X,
ShieldCheck,
AlertTriangle,
LogOut,
CalendarDays,
Filter,
ChevronDown,
Eye,
Zap,
Database,
Activity,
CircleCheck,
CircleAlert,
BarChart3,
TrendingUp,
PieChart,
Target,
Calendar,
Layers3,
} from "lucide-react";
import LoadSheddingForm from "../components/LoadSheddingForm";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "";

const STATUS_OPTIONS = ["Pending", "Processing", "Resolved"];

function AdminDashboard() {
const navigate = useNavigate();

const [complaints, setComplaints] = useState([]);
const [loadSheddingRows, setLoadSheddingRows] = useState([]);
const [loadSheddingLoading, setLoadSheddingLoading] = useState(false);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [error, setError] = useState("");

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

const [selectedComplaint, setSelectedComplaint] = useState(null);
const [updatingId, setUpdatingId] = useState("");
const [showLogoutModal, setShowLogoutModal] = useState(false);

// Analytics period
const [chartPeriod, setChartPeriod] = useState("7");

// =========================
// Fetch Complaints
// =========================
const fetchComplaints = async (isRefresh = false) => {
if (!API_URL) {
setError("Google Apps Script URL পাওয়া যায়নি। .env ফাইল চেক করুন।");
setLoading(false);
setRefreshing(false);
return;
}


try {
  if (isRefresh) {
    setRefreshing(true);
  } else {
    setLoading(true);
  }

  setError("");

  const url =
    `${API_URL}?action=getComplaints&key=${encodeURIComponent(
      ADMIN_KEY
    )}&t=${Date.now()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Complaint data load করা যায়নি।");
  }

  setComplaints(Array.isArray(data.complaints) ? data.complaints : []);
} catch (err) {
  console.error(err);
  setError(
    err.message || "Server থেকে complaint data load করতে সমস্যা হয়েছে।"
  );
} finally {
  setLoading(false);
  setRefreshing(false);
}


};

// =========================
// Fetch Load Shedding History (Sheet2)
// =========================
const fetchLoadShedding = async (isRefresh = false) => {
  if (!API_URL) return;
  if (isRefresh) setLoadSheddingLoading(true);
  try {
    const url = `${API_URL}?action=getLoadShedding&key=${encodeURIComponent(ADMIN_KEY)}&t=${Date.now()}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Load shedding data load করা যায়নি।");
    const rows = Array.isArray(data.loadShedding)
      ? data.loadShedding
      : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.records)
          ? data.records
          : Array.isArray(data)
            ? data
            : [];
    setLoadSheddingRows(rows);
  } catch (err) {
    console.error("Load shedding history:", err);
  } finally {
    setLoadSheddingLoading(false);
  }
};

useEffect(() => {
  fetchComplaints();
  fetchLoadShedding();
}, []);

// =========================
// Logout
// =========================
const handleLogout = () => {
sessionStorage.removeItem("adminLoggedIn");
navigate("/admin/login", { replace: true });
};

// =========================
// Update Status
// =========================
const updateStatus = async (complaintId, status) => {
if (!API_URL) {
setError("Google Apps Script URL পাওয়া যায়নি।");
return;
}


try {
  setUpdatingId(complaintId);
  setError("");

  const formData = new FormData();

  formData.append("action", "updateStatus");
  formData.append("key", ADMIN_KEY);
  formData.append("complaintId", complaintId);
  formData.append("status", status);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Status update failed.");
  }

  setComplaints((prev) =>
    prev.map((item) =>
      item.complaintId === complaintId
        ? { ...item, status }
        : item
    )
  );

  setSelectedComplaint((prev) =>
    prev && prev.complaintId === complaintId
      ? { ...prev, status }
      : prev
  );
} catch (err) {
  console.error(err);
  setError(err.message || "Status update করতে সমস্যা হয়েছে।");
} finally {
  setUpdatingId("");
}


};

// =========================
// Filter + Search
// =========================
const filteredComplaints = useMemo(() => {
const query = search.trim().toLowerCase();


return complaints.filter((item) => {
  const matchesStatus =
    statusFilter === "All" || item.status === statusFilter;

  if (!query) return matchesStatus;

  const searchableText = [
    item.complaintId,
    item.name,
    item.mobile,
    item.consumerNo,
    item.address,
    item.type,
    item.details,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return matchesStatus && searchableText.includes(query);
});


}, [complaints, search, statusFilter]);

// =========================
// Date Helpers
// =========================
const parseComplaintDate = (dateValue) => {
if (!dateValue) return null;


const date = new Date(dateValue);

if (!Number.isNaN(date.getTime())) {
  return date;
}

// Supports dd/MM/yyyy HH:mm
const match = String(dateValue).match(
  /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/
);

if (match) {
  const [, day, month, year, hour = "0", minute = "0"] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute)
  );
}

return null;


};

const startOfDay = (date) => {
const result = new Date(date);
result.setHours(0, 0, 0, 0);
return result;
};

const startOfMonth = (date) => {
const result = new Date(date.getFullYear(), date.getMonth(), 1);
result.setHours(0, 0, 0, 0);
return result;
};

// =========================
// Advanced Statistics
// =========================
const analytics = useMemo(() => {
const now = new Date();


const todayStart = startOfDay(now);
const monthStart = startOfMonth(now);

let today = 0;
let thisMonth = 0;

let pending = 0;
let processing = 0;
let resolved = 0;

const typeMap = {};

complaints.forEach((item) => {
  const complaintDate = parseComplaintDate(item.date);

  if (complaintDate) {
    if (complaintDate >= todayStart) {
      today++;
    }

    if (complaintDate >= monthStart) {
      thisMonth++;
    }
  }

  const status = item.status || "Pending";

  if (status === "Pending") pending++;
  if (status === "Processing") processing++;
  if (status === "Resolved") resolved++;

  const type = item.type || "Other";

  typeMap[type] = (typeMap[type] || 0) + 1;
});

const total = complaints.length;

const resolvedRate =
  total > 0 ? Math.round((resolved / total) * 100) : 0;

const pendingRate =
  total > 0 ? Math.round((pending / total) * 100) : 0;

const processingRate =
  total > 0 ? Math.round((processing / total) * 100) : 0;

const topTypes = Object.entries(typeMap)
  .map(([name, count]) => ({
    name,
    count,
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

return {
  total,
  today,
  thisMonth,
  pending,
  processing,
  resolved,
  resolvedRate,
  pendingRate,
  processingRate,
  topTypes,
};


}, [complaints]);

// =========================
// Daily Chart Data
// =========================
const dailyChart = useMemo(() => {
const days = Number(chartPeriod);
const result = [];


const now = new Date();

for (let i = days - 1; i >= 0; i--) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - i);

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);

  const count = complaints.filter((item) => {
    const complaintDate = parseComplaintDate(item.date);

    return (
      complaintDate &&
      complaintDate >= date &&
      complaintDate < nextDate
    );
  }).length;

  result.push({
    date,
    count,
    label: date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
  });
}

return result;


}, [complaints, chartPeriod]);

const maxDailyCount = Math.max(
...dailyChart.map((item) => item.count),
1
);

// =========================
// Monthly Chart
// =========================
const monthlyChart = useMemo(() => {
const result = [];


const now = new Date();

for (let i = 5; i >= 0; i--) {
  const date = new Date(
    now.getFullYear(),
    now.getMonth() - i,
    1
  );

  const nextDate = new Date(
    now.getFullYear(),
    now.getMonth() - i + 1,
    1
  );

  const count = complaints.filter((item) => {
    const complaintDate = parseComplaintDate(item.date);

    return (
      complaintDate &&
      complaintDate >= date &&
      complaintDate < nextDate
    );
  }).length;

  result.push({
    date,
    count,
    label: date.toLocaleDateString("en-US", {
      month: "short",
    }),
  });
}

return result;


}, [complaints]);

const maxMonthlyCount = Math.max(
...monthlyChart.map((item) => item.count),
1
);

// =========================
// Load Shedding Monthly Analytics (last 6 months)
// =========================
const parseLoadSheddingDate = (value) => {
  if (!value) return null;
  const raw = String(value).trim();
  let match = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  match = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
  if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
};

const getLoadSheddingDuration = (item) => {
  const startValue = item.startTime ?? item.StartTime ?? "";
  const endValue = item.endTime ?? item.EndTime ?? "";
  const toMinutes = (value) => {
    const match = String(value).trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (!match) return null;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const meridiem = (match[3] || "").toUpperCase();
    if (meridiem === "PM" && hour < 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;
    if (hour > 23 || minute > 59) return null;
    return hour * 60 + minute;
  };
  const start = toMinutes(startValue);
  const end = toMinutes(endValue);
  if (start === null || end === null) return 0;
  let duration = end - start;
  if (duration < 0) duration += 24 * 60;
  return duration / 60;
};

const loadSheddingMonthlyChart = useMemo(() => {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const rows = loadSheddingRows.filter((item) => {
      const date = parseLoadSheddingDate(item.date ?? item.Date);
      return date && date >= monthStart && date < nextMonth;
    });
    const hours = rows.reduce((total, item) => total + getLoadSheddingDuration(item), 0);
    const completed = rows.filter((item) => String(item.status ?? item.Status ?? "").toLowerCase() === "completed").length;
    months.push({
      key: `${monthStart.getFullYear()}-${monthStart.getMonth()}`,
      label: monthStart.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
      count: rows.length,
      hours: Math.round(hours * 10) / 10,
      completed,
    });
  }
  return months;
}, [loadSheddingRows]);

const maxLoadSheddingCount = Math.max(...loadSheddingMonthlyChart.map((item) => item.count), 1);
const totalLoadSheddingHours = Math.round(loadSheddingMonthlyChart.reduce((total, item) => total + item.hours, 0) * 10) / 10;
const totalLoadSheddingRecords = loadSheddingMonthlyChart.reduce((total, item) => total + item.count, 0);

// =========================
// Status Helpers
// =========================
const getStatusStyle = (status) => {
if (status === "Resolved") {
return {
badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
icon: <CheckCircle size={14} />,
};
}


if (status === "Processing") {
  return {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <LoaderCircle size={14} />,
  };
}

return {
  badge: "bg-amber-50 text-amber-700 border-amber-200",
  icon: <Clock size={14} />,
};


};

// =========================
// Loading Screen
// =========================
if (loading) {
return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4"> <div className="text-center"> <div className="relative mx-auto mb-5 h-16 w-16"> <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />


        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin" />

        <Database
          className="absolute inset-0 m-auto text-emerald-600"
          size={25}
        />
      </div>

      <h2 className="text-xl font-bold text-slate-800">
        Loading Admin Dashboard
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Google Sheets থেকে complaint data নেওয়া হচ্ছে...
      </p>
    </div>
  </div>
);


}

return ( <div className="min-h-screen bg-slate-50 text-slate-800">


  {/* =========================
      Header
  ========================= */}
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[76px] items-center justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white shadow-lg shadow-emerald-200">
            <ShieldCheck size={25} />

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                Admin Dashboard
              </h1>

              <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                Live
              </span>
            </div>

            <p className="truncate text-xs text-slate-500 sm:text-sm">
              বরপা সাব-জোনাল অফিস • অভিযোগ ব্যবস্থাপনা
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>

          <button
            onClick={() => { fetchComplaints(true); fetchLoadShedding(true); }}
            disabled={refreshing}
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : "group-hover:rotate-180 transition-transform"
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            <LogOut size={17} />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>

  {/* =========================
      Main
  ========================= */}
  <main className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

    {/* Error */}
    {error && (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
        <AlertTriangle
          className="mt-0.5 shrink-0"
          size={20}
        />

        <div className="flex-1">
          <p className="font-bold">
            Something went wrong
          </p>

          <p className="mt-1 text-sm">
            {error}
          </p>
        </div>

        <button
          onClick={() => setError("")}
          className="rounded-lg p-1 transition hover:bg-red-100"
        >
          <X size={18} />
        </button>
      </div>
    )}

    {/* =========================
        Load Shedding Form — kept at the top for quick entry
    ========================= */}
    <div className="mb-6">
      <LoadSheddingForm
        adminKey={ADMIN_KEY}
        onSuccess={() => {
          fetchComplaints(true);
          fetchLoadShedding(true);
        }}
      />
    </div>

    {/* =========================
        Monthly Load Shedding History Chart
    ========================= */}
    <section className="mb-6 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 px-5 py-5 text-white sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <Zap size={23} />
            </div>
            <div>
              <h3 className="text-lg font-black sm:text-xl">Monthly Load Shedding History</h3>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">গত ৬ মাসের লোডশেডিং রেকর্ড • Google Sheet Sheet2</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchLoadShedding(true)}
            disabled={loadSheddingLoading}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25 disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw size={16} className={loadSheddingLoading ? "animate-spin" : ""} />
            Refresh history
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
          <p className="text-xs font-bold text-orange-700">Last 6 months · Records</p>
          <p className="mt-1 text-2xl font-black text-orange-800">{totalLoadSheddingRecords}</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-bold text-blue-700">Estimated scheduled hours</p>
          <p className="mt-1 text-2xl font-black text-blue-800">{totalLoadSheddingHours} <span className="text-sm">hrs</span></p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-bold text-emerald-700">Completed notices</p>
          <p className="mt-1 text-2xl font-black text-emerald-800">{loadSheddingMonthlyChart.reduce((total, item) => total + item.completed, 0)}</p>
        </div>
      </div>

      <div className="px-4 pb-5 sm:px-6">
        {loadSheddingRows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
            <Zap className="mx-auto text-slate-300" size={30} />
            <p className="mt-3 text-sm font-bold text-slate-600">এখনো কোনো Load Shedding history পাওয়া যায়নি</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Sheet2-এ রেকর্ড আছে কি না এবং Apps Script-এর getLoadShedding action পরীক্ষা করুন।</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {loadSheddingMonthlyChart.map((item) => (
                <div key={item.key} className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-extrabold text-slate-600">{item.label}</span>
                    <span className="text-xs font-black text-orange-700">{item.count}</span>
                  </div>
                  <div className="mt-3 flex h-28 items-end rounded-xl bg-white p-2">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-orange-600 to-amber-400 transition-all duration-500"
                      style={{ height: `${item.count ? Math.max((item.count / maxLoadSheddingCount) * 100, 8) : 3}%` }}
                      title={`${item.count} notices`}
                    />
                  </div>
                  <p className="mt-3 text-sm font-black text-slate-800">{item.hours} hrs</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{item.completed} completed</p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-extrabold">Month</th>
                    <th className="px-4 py-3 font-extrabold">Notices</th>
                    <th className="px-4 py-3 font-extrabold">Estimated hours</th>
                    <th className="px-4 py-3 font-extrabold">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loadSheddingMonthlyChart.map((item) => (
                    <tr key={`${item.key}-row`} className="hover:bg-orange-50/50">
                      <td className="px-4 py-3 font-bold text-slate-700">{item.label}</td>
                      <td className="px-4 py-3 font-black text-orange-700">{item.count}</td>
                      <td className="px-4 py-3 text-slate-600">{item.hours} hours</td>
                      <td className="px-4 py-3 text-emerald-700">{item.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-400">নোট: Estimated hours শুরুর ও শেষের সময় থেকে গণনা করা হয়। একাধিক feeder/area-র একই সময়ে থাকা নোটিশ আলাদা রেকর্ড হিসেবে গণনা হবে।</p>
          </>
        )}
      </div>
    </section>

    {/* =========================
        Hero
    ========================= */}
    <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 p-6 text-white shadow-xl shadow-emerald-100 sm:p-8">

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
            <Activity size={14} />
            Advanced Analytics
          </div>

          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            অভিযোগ ব্যবস্থাপনা কেন্দ্র
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
            অভিযোগের সংখ্যা, Status, দৈনিক ও মাসিক
            performance এক নজরে পর্যবেক্ষণ করুন।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[500px]">

          <HeroStat
            label="Total"
            value={analytics.total}
          />

          <HeroStat
            label="Today"
            value={analytics.today}
          />

          <HeroStat
            label="This Month"
            value={analytics.thisMonth}
          />

          <HeroStat
            label="Resolved"
            value={`${analytics.resolvedRate}%`}
          />
        </div>
      </div>
    </section>

    {/* =========================
        Main KPI Cards
    ========================= */}
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Complaints"
        value={analytics.total}
        subtitle="সকল অভিযোগ"
        icon={<FileText size={23} />}
        iconClass="bg-slate-100 text-slate-700"
        valueClass="text-slate-900"
      />

      <StatCard
        title="Today's Complaints"
        value={analytics.today}
        subtitle="আজকের নতুন অভিযোগ"
        icon={<CalendarDays size={23} />}
        iconClass="bg-purple-50 text-purple-600"
        valueClass="text-purple-600"
      />

      <StatCard
        title="This Month"
        value={analytics.thisMonth}
        subtitle="চলতি মাসের অভিযোগ"
        icon={<TrendingUp size={23} />}
        iconClass="bg-blue-50 text-blue-600"
        valueClass="text-blue-600"
      />

      <StatCard
        title="Resolved Rate"
        value={`${analytics.resolvedRate}%`}
        subtitle={`${analytics.resolved} টি সমাধান`}
        icon={<Target size={23} />}
        iconClass="bg-emerald-50 text-emerald-600"
        valueClass="text-emerald-600"
      />
    </section>

    {/* =========================
        Status Progress
    ========================= */}
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <PieChart size={18} />
            </div>

            <h3 className="font-extrabold text-slate-900">
              Complaint Status Overview
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            বর্তমান অভিযোগের Status distribution
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Total {analytics.total}
        </span>
      </div>

      <div className="mb-6 h-4 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full w-full">
          {analytics.total > 0 && (
            <>
              <div
                className="bg-amber-400 transition-all duration-700"
                style={{
                  width: `${analytics.pendingRate}%`,
                }}
              />

              <div
                className="bg-blue-500 transition-all duration-700"
                style={{
                  width: `${analytics.processingRate}%`,
                }}
              />

              <div
                className="bg-emerald-500 transition-all duration-700"
                style={{
                  width: `${analytics.resolvedRate}%`,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <StatusOverview
          title="Pending"
          count={analytics.pending}
          percentage={analytics.pendingRate}
          icon={<Clock size={18} />}
          boxClass="bg-amber-50 border-amber-100"
          iconClass="bg-amber-100 text-amber-600"
          textClass="text-amber-600"
          barClass="bg-amber-400"
        />

        <StatusOverview
          title="Processing"
          count={analytics.processing}
          percentage={analytics.processingRate}
          icon={<LoaderCircle size={18} />}
          boxClass="bg-blue-50 border-blue-100"
          iconClass="bg-blue-100 text-blue-600"
          textClass="text-blue-600"
          barClass="bg-blue-500"
        />

        <StatusOverview
          title="Resolved"
          count={analytics.resolved}
          percentage={analytics.resolvedRate}
          icon={<CheckCircle size={18} />}
          boxClass="bg-emerald-50 border-emerald-100"
          iconClass="bg-emerald-100 text-emerald-600"
          textClass="text-emerald-600"
          barClass="bg-emerald-500"
        />
      </div>
    </section>

  
    
    <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

      {/* Top Complaint Types */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Layers3 size={18} />
            </div>

            <h3 className="font-extrabold text-slate-900">
              Top Complaint Types
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            কোন ধরনের অভিযোগ সবচেয়ে বেশি এসেছে
          </p>
        </div>

        {analytics.topTypes.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-400">
            কোনো complaint type পাওয়া যায়নি।
          </div>
        ) : (
          <div className="space-y-4">
            {analytics.topTypes.map((item, index) => {
              const percentage =
                analytics.total > 0
                  ? Math.round(
                      (item.count / analytics.total) * 100
                    )
                  : 0;

              return (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">
                        {index + 1}
                      </span>

                      <span className="truncate text-sm font-bold text-slate-700">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-sm font-black text-slate-800">
                        {item.count}
                      </span>

                      <span className="text-xs font-semibold text-slate-400">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Performance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Target size={18} />
            </div>

            <h3 className="font-extrabold text-slate-900">
              Performance
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Complaint resolution performance
          </p>
        </div>

        <div className="flex justify-center py-3">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-slate-100">

            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #10b981 ${analytics.resolvedRate}%,
                  #e2e8f0 ${analytics.resolvedRate}% 100%
                )`,
              }}
            />

            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
              <span className="text-3xl font-black text-emerald-600">
                {analytics.resolvedRate}%
              </span>

              <span className="mt-1 text-xs font-bold text-slate-400">
                Resolved
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">

          <PerformanceRow
            label="Pending"
            value={analytics.pending}
            percentage={analytics.pendingRate}
            dotClass="bg-amber-400"
          />

          <PerformanceRow
            label="Processing"
            value={analytics.processing}
            percentage={analytics.processingRate}
            dotClass="bg-blue-500"
          />

          <PerformanceRow
            label="Resolved"
            value={analytics.resolved}
            percentage={analytics.resolvedRate}
            dotClass="bg-emerald-500"
          />
        </div>
      </div>
    </section>

    {/* =========================
        Search + Filter
    ========================= */}
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div className="relative w-full xl:max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Complaint ID, নাম, মোবাইল, Consumer No..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Filter size={17} />
            Filter
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="h-12 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
            >
              <option value="All">
                All Status
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-600">
            {filteredComplaints.length} Results
          </div>
        </div>
      </div>
    </section>

    {/* =========================
        Complaint Table
    ========================= */}
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileText size={18} />
            </div>

            <h3 className="font-extrabold text-slate-900">
              Complaint List
            </h3>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            সকল গ্রাহক অভিযোগের বিস্তারিত তথ্য
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {complaints.length} Total Records
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FileText size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-800">
            কোনো অভিযোগ পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Search অথবা Status filter পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-[1050px] w-full text-left">

            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">

                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Complaint
                </th>

                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Complaint Type
                </th>

                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredComplaints.map((item) => {

                const statusStyle =
                  getStatusStyle(item.status);

                return (
                  <tr
                    key={`${item.complaintId}-${item.row}`}
                    className="group transition hover:bg-emerald-50/30"
                  >

                    <td className="px-5 py-5 align-top">
                      <div className="flex items-start gap-3">

                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
                          <Hash size={17} />
                        </div>

                        <div>
                          <p className="font-extrabold text-slate-900">
                            {item.complaintId || "N/A"}
                          </p>

                          <p className="mt-1 max-w-[210px] truncate text-xs text-slate-500">
                            Consumer: {item.consumerNo || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <div className="flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <User size={16} />
                        </div>

                        <div>
                          <p className="font-bold text-slate-800">
                            {item.name || "N/A"}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Phone size={12} />
                            {item.mobile || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <span className="inline-flex max-w-[190px] rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                        {item.type || "Other"}
                      </span>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {item.date || "N/A"}
                      </div>
                    </td>

                    <td className="px-5 py-5 align-top">

                      <div className="flex flex-col gap-2">

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle.badge}`}
                        >
                          {statusStyle.icon}

                          {item.status || "Pending"}
                        </span>

                        <div className="relative w-fit">

                          <select
                            value={item.status || "Pending"}
                            disabled={
                              updatingId ===
                              item.complaintId
                            }
                            onChange={(e) =>
                              updateStatus(
                                item.complaintId,
                                e.target.value
                              )
                            }
                            className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-xs font-semibold text-slate-600 outline-none transition hover:border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 disabled:opacity-60"
                          >
                            {STATUS_OPTIONS.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>

                          <ChevronDown
                            size={13}
                            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-right align-top">

                      <button
                        onClick={() =>
                          setSelectedComplaint(item)
                        }
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Eye size={17} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>

    {/* Footer */}
    <div className="mt-5 flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">

      <div className="flex items-center gap-2">
        <ShieldCheck size={14} />
        Barpa Sub-Zonal Office Complaint Management System
      </div>

      <div className="flex items-center gap-2">
        <Zap size={13} />
        React + Google Sheets
      </div>
    </div>
  </main>

  {/* =========================
      Complaint Details Modal
  ========================= */}
  {selectedComplaint && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={() => setSelectedComplaint(null)}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 p-6 text-white">

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <FileText size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-100">
                  Complaint Details
                </p>

                <h3 className="mt-1 text-xl font-black">
                  {selectedComplaint.complaintId}
                </h3>
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedComplaint(null)
              }
              className="rounded-xl bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5 sm:p-6">

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Status
                </p>

                <div className="mt-2">

                  {(() => {
                    const style =
                      getStatusStyle(
                        selectedComplaint.status
                      );

                    return (
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold ${style.badge}`}
                      >
                        {style.icon}

                        {selectedComplaint.status ||
                          "Pending"}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    disabled={
                      updatingId ===
                      selectedComplaint.complaintId
                    }
                    onClick={() =>
                      updateStatus(
                        selectedComplaint.complaintId,
                        status
                      )
                    }
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      selectedComplaint.status === status
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">

            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-emerald-500" />

              <h4 className="font-extrabold text-slate-900">
                Customer Information
              </h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              <InfoBox
                icon={<User size={17} />}
                label="Customer Name"
                value={selectedComplaint.name}
              />

              <InfoBox
                icon={<Phone size={17} />}
                label="Mobile Number"
                value={selectedComplaint.mobile}
              />

              <InfoBox
                icon={<Hash size={17} />}
                label="Consumer Number"
                value={selectedComplaint.consumerNo}
              />

              <InfoBox
                icon={<CalendarDays size={17} />}
                label="Complaint Date"
                value={selectedComplaint.date}
              />
            </div>
          </div>

          <div className="mb-6">

            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-blue-500" />

              <h4 className="font-extrabold text-slate-900">
                Location
              </h4>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Address
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                    {selectedComplaint.address ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>

            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-amber-500" />

              <h4 className="font-extrabold text-slate-900">
                Complaint Information
              </h4>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Complaint Type
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {selectedComplaint.type ||
                    "Other"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Details
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {selectedComplaint.details ||
                    "No details provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <SettingsIcon />
            Status can be updated
          </div>

          <button
            onClick={() =>
              setSelectedComplaint(null)
            }
            className="ml-auto rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}

  {/* =========================
      Logout Modal
  ========================= */}
  {showLogoutModal && (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={() => setShowLogoutModal(false)}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <LogOut size={25} />
        </div>

        <div className="mt-5 text-center">

          <h3 className="text-xl font-black text-slate-900">
            Logout করবেন?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Admin dashboard থেকে বের হয়ে Login page-এ ফিরে যাবেন।
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            onClick={() =>
              setShowLogoutModal(false)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )}
</div>


);
}

// ======================================================
// Hero Stat
// ======================================================
function HeroStat({ label, value }) {
return ( <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"> <p className="text-xs text-emerald-100">
{label} </p>


  <p className="mt-1 text-2xl font-black">
    {value}
  </p>
</div>


);
}

// ======================================================
// Main Stat Card
// ======================================================
function StatCard({
title,
value,
subtitle,
icon,
iconClass,
valueClass,
}) {
return ( <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">


  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 transition group-hover:scale-150" />

  <div className="relative flex items-center justify-between">

    <div>
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${valueClass}`}
      >
        {value}
      </p>
    </div>

    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110 ${iconClass}`}
    >
      {icon}
    </div>
  </div>

  <div className="relative mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
    <Activity size={14} />
    {subtitle}
  </div>
</div>


);
}

// ======================================================
// Status Overview
// ======================================================
function StatusOverview({
title,
count,
percentage,
icon,
boxClass,
iconClass,
textClass,
barClass,
}) {
return (
<div
className={`rounded-2xl border p-4 ${boxClass}`}
> <div className="flex items-center justify-between">


    <div className="flex items-center gap-3">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-700">
          {title}
        </p>

        <p className={`text-xs font-semibold ${textClass}`}>
          {percentage}%
        </p>
      </div>
    </div>

    <span className="text-2xl font-black text-slate-800">
      {count}
    </span>
  </div>

  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
    <div
      className={`h-full rounded-full transition-all duration-700 ${barClass}`}
      style={{
        width: `${percentage}%`,
      }}
    />
  </div>
</div>


);
}

// ======================================================
// Performance Row
// ======================================================
function PerformanceRow({
label,
value,
percentage,
dotClass,
}) {
return ( <div className="flex items-center gap-3">


  <span
    className={`h-2.5 w-2.5 rounded-full ${dotClass}`}
  />

  <span className="flex-1 text-sm font-semibold text-slate-600">
    {label}
  </span>

  <span className="text-sm font-black text-slate-800">
    {value}
  </span>

  <span className="w-12 text-right text-xs font-bold text-slate-400">
    {percentage}%
  </span>
</div>


);
}

// ======================================================
// Info Box
// ======================================================
function InfoBox({ icon, label, value }) {
return ( <div className="rounded-2xl border border-slate-200 bg-white p-4">


  <div className="flex items-start gap-3">

    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
      {icon}
    </div>

    <div className="min-w-0">

      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  </div>
</div>


);
}

// Small icon component to avoid extra dependency
function SettingsIcon() {
return ( <svg
   width="14"
   height="14"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
 > <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /> <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.9 1.9-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.7v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.9-1.9.06-.06A1.7 1.7 0 0 0 7.74 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.7h.18A1.7 1.7 0 0 0 7.74 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.9-1.9.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.21 5V4h2.7v1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.9 1.9-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03H21v2.7h-.04A1.7 1.7 0 0 0 19.4 15Z" /> </svg>
);
}

export default AdminDashboard;

