import NavBar from "./components/NavBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants';
import { addUser } from "./slices/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading && !publicRoutes.includes(location.pathname)) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-violet-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-start justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="w-full max-w-6xl animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Body;
