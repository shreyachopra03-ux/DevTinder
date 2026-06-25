import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || searchParams.get("rawResetToken") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Invalid reset link. No token found.");
        setChecking(false);
        return;
      }
      try {
        await axios.get(BASE_URL + "/profile/reset-password", {
          params: { token },
          withCredentials: true,
        });
        setValid(true);
      } catch (err: any) {
        setError(err?.response?.data || "Invalid or expired link");
      } finally {
        setChecking(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/profile/reset-password", {
        rawResetToken: token,
        newPassword,
      }, { withCredentials: true });
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err?.response?.data || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-3 py-20">
          <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Verifying link...</p>
        </div>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="flex justify-center w-full animate-fade-in-up">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-5xl mb-4">🔗</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid or Expired Link</h2>
            <p className="text-sm text-slate-500 mb-6">{error}</p>
            <Link to="/forgot-password" className="inline-block px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg transition">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
            <p className="text-sm text-slate-500 mt-1">Enter your new password</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
              {error}
            </div>
          )}

          {msg && (
            <div className="mb-5 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-medium rounded-xl">
              {msg} Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="Min. 8 characters" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="Repeat password" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
