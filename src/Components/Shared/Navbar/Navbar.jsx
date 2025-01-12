import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import AuthBtn from "./AuthBtn";
import useAuth from "../../../Hook/useAuth";
import Profile from "./Profile";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user } = useAuth();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
            className={`w-full py-6 sticky top-0 z-[1000] bg-white dark:bg-dark-lite transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
        >
            <div className="w-11/12 mx-auto flex items-center justify-between">
                <div>
                    <Link to="/">
                        <h2 className="font-bold text-4xl font-Montserrat max-sm:hidden">
                            Web-Name
                        </h2>
                        <img
                            className="sm:hidden w-[3rem]"
                            src="/service-logo.png" alt="Logo" />
                    </Link>
                </div>

                <div className="items-center gap-[15px] flex">
                    <div className="border-r-2 pr-4 max-sm:hidden">
                        <ul className="items-center gap-[20px] text-[1rem] font-semibold lg:flex hidden">
                            <li className="navBarLink">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className="navBarLink">
                                <NavLink to="/services">Services</NavLink>
                            </li>
                            <li className="navBarLink">
                                <NavLink to="/contact-us">Contact Us</NavLink>
                            </li>
                            {
                                user && (
                                    <li className="navBarLink">
                                        <NavLink to="/dashboard">Dashboard</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <ThemeToggle />

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
                        <li className="navBarLink">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="navBarLink">
                            <NavLink to="/services">Services</NavLink>
                        </li>
                        <li className="navBarLink">
                            <NavLink to="/contact-us">Contact Us</NavLink>
                        </li>
                        {
                            user && (
                                <li className="navBarLink">
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </aside>
            </div>
        </nav>
    );
};

export default Navbar;