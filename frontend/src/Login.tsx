import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./slices/userSlice";
import { BASE_URL } from "./utils/constants";
import { useNavigate, Link } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import { Spinner } from "./components/ui";

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
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to find your next dev match."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="text-brand font-semibold hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {error && <div className="dt-alert dt-alert-error mb-5">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="dt-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="dt-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className="dt-label">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-brand font-medium hover:underline mb-1.5">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dt-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="dt-btn dt-btn-primary w-full py-3 mt-2">
          {loading && <Spinner className="w-4 h-4" />}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
