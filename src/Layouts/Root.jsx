import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer";

const Root = () => {
    return (
        <div className="font-Montserrat bg-color-primary text-color-text dark:bg-color-text dark:text-color-text-d">
            <Navbar />
            <div className="min-h-[calc(100vh-391px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;