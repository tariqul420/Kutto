import DashboardSidebar from "@/Components/Dashboard/Sidebar/DashboardSidebar";
import Profile from "@/Components/Shared/Navbar/Profile";
import useTheme from "@/Hook/useTheme";
import { useEffect, useState } from "react";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode, MdPets } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [dashboardOpen, setDashboardOpen] = useState(false)
    const [showDashboard, setShowDashboard] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { theme, toggleTheme } = useTheme()

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
        <div className="flex relative gap-1 dashboard overflow-hidden">

            {/* sidebar only mobile screen */}
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
                <nav
                    className={`w-full sticky top-0 z-[1000] bg-white dark:bg-dark-lite transition-transform duration-300 mb-2 py-1`}
                >
                    <div className="w-11/12 mx-auto flex items-center justify-between">
                        <div>

                        </div>

                        <div className="items-center gap-[15px] flex">
                            <div className="border-r-2 pr-4 max-sm:hidden">
                                <ul className="items-center gap-[20px] text-[1rem] font-semibold lg:flex hidden">
                                    <li className="navBarLink">
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li className="navBarLink">
                                        <NavLink to="/pet-listing">Pet Listing</NavLink>
                                    </li>
                                    <li className="navBarLink">
                                        <NavLink to="/donation-campaigns">Donation Campaigns</NavLink>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-white dark:bg-gray-700"
                            >
                                {theme === "dark" ? (
                                    <IoMdSunny size={20} color="#F04335" />
                                ) : (
                                    <MdDarkMode size={20} color="#1E1E1E" />
                                )}
                            </button>

                            <Profile />
                        </div>
                    </div>
                </nav>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
