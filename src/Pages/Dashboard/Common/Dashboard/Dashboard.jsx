import { IoSettings } from "react-icons/io5";
import { MdOutlinePets, MdOutlinePostAdd, MdPets } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../../Hook/useAuth";
import { useState } from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaDonate, FaUsers } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { TbBrandMyOppo } from "react-icons/tb";
import useRole from "../../../../Hook/useRole";
import { Divider } from "keep-react";

const Dashboard = () => {
    const { logOutUser } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [role] = useRole();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col md:flex-row gap-6 dashboard overflow-hidden">
            {/* Sidebar */}
            <div
                className={`p-6 md:m-4 bg-white dark:bg-dark-lite shadow-md rounded-md transition-all ${isSidebarOpen
                    ? "max-h-[100vh] w-full md:w-[350px] flex flex-row justify-between gap-8  md:flex-col overflow-x-auto items-center md:items-start"
                    : "w-0 overflow-hidden"
                    }`}
            >
                <div className="flex flex-col md:flex-col items-center md:items-start">
                    <h3 className="text-2xl font-semibold hidden md:block">
                        <span>Pagination</span>
                        <span className="text-base text-color-accent">
                            ({role === 'admin' ? 'Admin' : 'User'})
                        </span>
                    </h3>
                    <ul
                        className={`mt-4 flex flex-row md:flex-col gap-4 md:gap-2 ${isSidebarOpen ? "space-x-4 md:space-x-0" : ""
                            }`}
                    >
                        {/* for admin */}
                        {role === "admin" && (
                            <>
                                <li className="dashboardLink">
                                    <NavLink className="dashboardIcon" to={"/dashboard/all-users"}>
                                        <FaUsers />
                                        <span className="hidden md:inline">All Users</span>
                                    </NavLink>
                                </li>
                                <li className="dashboardLink">
                                    <NavLink className="dashboardIcon" to={"/dashboard/all-pets"}>
                                        <MdOutlinePets />
                                        <span className="hidden md:inline">All Pets</span>
                                    </NavLink>
                                </li>
                                <li className="dashboardLink">
                                    <NavLink className="dashboardIcon" to={"/dashboard/all-donation"}>
                                        <FaDonate />
                                        <span className="hidden md:inline">All Donation</span>
                                    </NavLink>
                                </li>

                                <Divider className="font-bold text-color-accent dark:text-color-accent" variant="center">OR</Divider>
                            </>
                        )}

                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to="/dashboard/add-pet">
                                <MdOutlinePostAdd />
                                <span className="hidden md:inline">Add a pet</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to={"/dashboard/my-add-pets"}>
                                <MdPets />
                                <span className="hidden md:inline">My added pets</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to={"/dashboard/adoption-request"}>
                                <FaCodePullRequest />
                                <span className="hidden md:inline">Adoption Request</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to={"/dashboard/create-donation"}>
                                <FaDonate />
                                <span className="hidden md:inline">Create Donate C...</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to={"/dashboard/my-donation-campaign"}>
                                <BiSolidDonateHeart />
                                <span className="hidden md:inline">My Donation C...</span>
                            </NavLink>
                        </li>
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to={"/dashboard/my-donations"}>
                                <TbBrandMyOppo />
                                <span className="hidden md:inline">My Donations</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-start">
                        <li className="dashboardLink">
                            <NavLink className="dashboardIcon" to="/dashboard/setting">
                                <IoSettings />
                                <span className="hidden md:inline">Setting</span>
                            </NavLink>
                        </li>
                        <li
                            onClick={() => logOutUser()}
                            className="dashboardLink dashboardIcon"
                        >
                            <HiOutlineLogout />
                            <span className="hidden md:inline">Logout</span>
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
                    {isSidebarOpen ? "Close" : "Open"} Sidebar
                </button>
            </div>

            {/* Main Content */}
            <div className="sm:m-4 w-full overflow-hidden min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
