import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "";

function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!password.trim()) {
      setError("অনুগ্রহ করে Admin Password দিন।");
      return;
    }

    if (!ADMIN_KEY) {
      setError(
        "Admin password configuration পাওয়া যায়নি। .env ফাইল চেক করুন।"
      );
      return;
    }

    setLoading(true);

    // Demo authentication
    if (password === ADMIN_KEY) {
      localStorage.setItem("barpa_admin_logged_in", "true");

      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 300);

      return;
    }

    setLoading(false);
    setError("ভুল Admin Password।");
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl">
            <ShieldCheck size={40} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-800">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            বরপা সাব-জোনাল অফিস
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Complaint Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Administrator Access
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Dashboard access করতে Admin Password দিন।
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Admin Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-sm">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Login হচ্ছে...
                </>
              ) : (
                <>
                  <LockKeyhole size={19} />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-xs leading-5 text-slate-500">
              এই অংশটি শুধুমাত্র অনুমোদিত Administrator-এর জন্য।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;