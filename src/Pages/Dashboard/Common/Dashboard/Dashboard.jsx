import DashboardSidebar from "@/Components/Dashboard/Sidebar/DashboardSidebar";
import { useEffect, useState } from "react";
import { MdPets } from "react-icons/md";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [dashboardOpen, setDashboardOpen] = useState(false)
    const [showDashboard, setShowDashboard] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setShowDashboard(false);
        } else {
            setShowDashboard(true);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY]);

    return (
        <div className="flex relative gap-6 dashboard overflow-hidden">

            <div
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className={`inline-flex fixed items-center top-[92px] left-0 md:hidden z-[9999] transition-transform duration-300 ${showDashboard ? "translate-x-0" : "-translate-x-full"}`}>
                <span className="flex pl-10 p-2 pr-4 items-center justify-center rounded-r-full bg-gray-400 text-heading-6 font-semibold text-white dark:bg-metal-800">
                    <MdPets />
                </span>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 transform bg-white dark:bg-black transition-transform duration-300 ease-in-out md:static md:transform-none ${dashboardOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                <DashboardSidebar setDashboardOpen={setDashboardOpen} />
            </div>

            {/* Main Content */}
            <div className="sm:m-2 w-full overflow-hidden min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
