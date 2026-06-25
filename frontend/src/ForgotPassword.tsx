import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/profile/forgot-password", { emailId }, { withCredentials: true });
      setMsg(res.data.message);
      setSent(true);
    } catch (err: any) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Forgot Password</h2>
            <p className="text-sm text-slate-500 mt-1">Enter your email and we'll send you a reset link</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
              {error}
            </div>
          )}

          {msg && (
            <div className="mb-5 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-medium rounded-xl">
              {msg}
            </div>
          )}

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email Address</label>
                <input type="email" value={emailId} onChange={e => setEmailId(e.target.value)} required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                  placeholder="you@example.com" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">📧</div>
              <p className="text-sm text-slate-600">Check your inbox for the password reset link.</p>
            </div>
          )}

          <p className="text-center text-sm text-slate-500 mt-6">
            Remember your password? <Link to="/login" className="text-violet-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
