import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import AuthBtn from "./AuthBtn";
import useAuth from "../../../Hook/useAuth";
import Profile from "./Profile";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode, MdOutlinePets } from "react-icons/md";
import useTheme from "@/Hook/useTheme";

const Navbar = () => {
    const { user } = useAuth();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
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
        <nav
            className={`w-full py-6 sticky top-0 z-[1000] bg-white dark:bg-dark-lite transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"} ${location.pathname.startsWith('/dashboard') ? 'hidden' : ''}`}
        >
            <div className="w-11/12 mx-auto flex items-center justify-between">
                <div>
                    <Link to="/">
                        <h2 className="font-bold text-4xl font-Montserrat max-sm:hidden flex gap-1">
                            Kutto
                            <span className="text-color-accent">
                                <MdOutlinePets />
                            </span>
                        </h2>
                        <div className="sm:hidden text-4xl text-color-accent">
                            <MdOutlinePets />
                        </div>
                    </Link>
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
                            <li className="navBarLink">
                                <NavLink to="/about-us">About Us</NavLink>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white dark:bg-gray-700"
                    >
                        {theme === "dark" ? (
                            <IoMdSunny size={30} color="#F04335" />
                        ) : (
                            <MdDarkMode size={30} color="#1E1E1E" />
                        )}
                    </button>

                    {user ? <Profile /> : <AuthBtn />}

                    <CiMenuFries
                        className="text-[1.8rem] mr-1 cursor-pointer lg:hidden flex"
                        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    />
                </div>

                <aside
                    className={`${mobileSidebarOpen
                        ? "translate-y-0 opacity-100 z-[2000]"
                        : "translate-y-[-200px] opacity-0 z-[-1]"
                        } lg:hidden bg-gray-200 dark:bg-dark-lite boxShadow p-4 text-center absolute top-[65px] right-0 w-full md:w-4/12 rounded-md transition-all duration-300`}
                >
                    <ul className="flex flex-col justify-center items-center gap-[20px] text-[1rem] lg:flex">
                        <li onClick={() => setMobileSidebarOpen(false)} className="navBarLink">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li onClick={() => setMobileSidebarOpen(false)} className="navBarLink">
                            <NavLink to="/pet-listing">Pet Listing</NavLink>
                        </li>
                        <li onClick={() => setMobileSidebarOpen(false)} className="navBarLink">
                            <NavLink to="/donation-campaigns">Donation Campaigns</NavLink>
                        </li>
                    </ul>
                </aside>
            </div>
        </nav>
    );
};

export default Navbar;