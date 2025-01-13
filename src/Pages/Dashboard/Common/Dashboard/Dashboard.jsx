import { IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../../Hook/useAuth";

const Dashboard = () => {
    const { logOutUser } = useAuth();

    return (
        <div className="flex gap-8 min-h-screen dashboard overflow-hidden">
            {/* Sidebar */}
            <div className="p-6 flex flex-col justify-between m-4 bg-white dark:bg-dark-lite shadow-md rounded-md">
                <div>
                    <h3 className="text-2xl font-semibold">Pagination</h3>
                    <ul className="mt-4">
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to="/user/dashboard">
                                <MdDashboard />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="space-y-2">
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to="/dashboard/setting">
                                <IoSettings />
                                <span>Setting</span>
                            </NavLink>
                        </li>
                        <li
                            onClick={() => logOutUser()}
                            className="dashboardLink flex items-center gap-1 text-lg font-medium">
                            <HiOutlineLogout />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="m-4 w-full max-h-screen overflow-y-auto no-scrollbar">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
