import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Body = () => {
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