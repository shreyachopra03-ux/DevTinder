import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from './slices/userSlice';
import { BASE_URL } from './utils/constants';
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", emailId: "", password: "", gender: "male", age: 18
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/signup", form, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err: any) {
      setError(err?.response?.data || "Signup failed");
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
            <h2 className="text-xl font-bold text-slate-900">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1">Join DevTinder and find your dev match</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email</label>
              <input type="email" name="emailId" value={form.emailId} onChange={handleChange} required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={8}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Age</label>
                <input type="number" name="age" value={form.age} onChange={handleChange} min={18} required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account? <Link to="/login" className="text-violet-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
