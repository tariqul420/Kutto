import { IoSettings } from "react-icons/io5";
import { MdOutlinePostAdd, MdPets } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../../Hook/useAuth";
import { useState } from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { TbBrandMyOppo } from "react-icons/tb";

const Dashboard = () => {
    const { logOutUser } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col md:flex-row gap-6 dashboard">
            {/* Sidebar */}
            <div className={`p-6 m-4 flex flex-col justify-between bg-white dark:bg-dark-lite shadow-md rounded-md ${isSidebarOpen ? 'max-h-[70vh] w-[350px]' : 'w-0 overflow-hidden'} transition-all`}>
                <div>
                    <h3 className="text-2xl font-semibold">Pagination</h3>
                    <ul className="mt-4 space-y-2">
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to="/dashboard/add-pet">
                                <MdOutlinePostAdd />
                                <span>Add a pet</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to={''}>
                                <MdPets />
                                <span>My added pets</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to={'/dashboard/adoption-request'}>
                                <FaCodePullRequest />
                                <span>Adoption Request</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to={'/dashboard/create-donation'}>
                                <FaDonate />
                                <span>Create Donate cam.</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to={'/dashboard/my-donation-campaign'}>
                                <BiSolidDonateHeart />
                                <span>My Donation cam.</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className={`flex items-center gap-1 text-lg font-medium`} to={'/dashboard/my-donations'}>
                                <TbBrandMyOppo />
                                <span>My Donations</span>
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

            {/* Mobile Toggle Button */}
            <div className="md:hidden absolute top-6 right-6 z-20">
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-gray-700 text-white rounded-md"
                >
                    {isSidebarOpen ? 'Close' : 'Open'} Sidebar
                </button>
            </div>

            {/* Main Content */}
            <div className="sm:m-4 w-full min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;