import DashboardSidebar from "@/Components/Dashboard/Sidebar/DashboardSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [dashboardOpen, setDashboardOpen] = useState(false)

    return (
        <div className="flex relative gap-6 dashboard overflow-hidden">

            <div
                onClick={() => setDashboardOpen(true)}
                className="inline-flex fixed items-center top-[92px] left-0 md:hidden z-[9999]">
                <span className="flex pl-10 p-1 pr-4 items-center justify-center rounded-r-full bg-metal-900 text-heading-6 font-semibold text-white dark:bg-metal-800">
                    K.
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
