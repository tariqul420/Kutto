import { DashboardSidebar } from "@/Components/Dashboard/Sidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex relative gap-6 dashboard overflow-hidden">

            {/* OpenSidebar */}
            <div>
                <DashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="sm:m-2 w-full overflow-hidden min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
