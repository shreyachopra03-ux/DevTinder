import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from './slices/userSlice';
import { BASE_URL } from './utils/constants';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err: any) {
      setError(err?.response?.data || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-3xl font-black tracking-tight text-slate-900 mb-2">
              DEV<span className="text-violet-600">TINDER</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to find your dev match</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-5 text-sm">
            <Link to="/forgot-password" className="text-violet-600 hover:underline font-medium">
              Forgot password?
            </Link>
            <Link to="/signup" className="text-violet-600 hover:underline font-medium">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
