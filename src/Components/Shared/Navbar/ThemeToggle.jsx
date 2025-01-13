
import { useState, useEffect } from "react";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
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
    );
};

export default ThemeToggle;
