import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants';
import { addUser } from "./slices/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async() => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));

    } catch (err) { 
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) { 
              navigate("/login");
            }
        } else {
           console.error("Non Axios error occurred:", err);
        }
    }};

    useEffect(() => {
      fetchUser();
    }, [])

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;