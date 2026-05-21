import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

const Body = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
        <div className="grow">
            <Outlet />
        </div>
            <Footer />
        </div>
    )
};

export default Body;