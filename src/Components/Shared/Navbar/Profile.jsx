import { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import useRole from "@/Hook/useRole";

const Profile = () => {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { user, logOutUser } = useAuth()
    const [role] = useRole()
    const location = useLocation()

    const dashboard = location.pathname.startsWith('/dashboard')

    const handelLogout = async () => {
        await logOutUser()
    };

    return (
        <div className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
            <div className="relative">
                <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                    alt="avatar" className={` ${dashboard ? 'w-[30px] h-[30px]' : 'w-[40px] h-[40px]'} rounded-full object-cover border-2 border-solid border-[#3B82F6]`} />
                <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div>

            {
                !dashboard && (
                    <h1 className="text-[1.2rem] font-[700] sm:block hidden">{user?.displayName?.substring(0, 10)}!</h1>
                )
            }

            <div
                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1000]" : "translate-y-[10px] opacity-0 z-[-1] hidden"} bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] dark:bg-gray-700 shadow-md`}>
                <p
                    onClick={() => navigate(`${role === "admin" ? '/dashboard/all-users' : 'dashboard/my-added-pets'}`)}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] hover:bg-gray-50 dark:hover:bg-gray-600/30">
                    <MdDashboard />
                    Dashboard
                </p>

                <div className="mt-3 border-t border-gray-200 pt-[5px]">
                    <p
                        onClick={handelLogout}
                        className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                        <TbLogout2 />
                        Logout
                    </p>
                </div>
            </div>

            <div
                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1000]" : "translate-y-[10px] opacity-0 z-[-1] hidden"} bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] dark:bg-gray-700 shadow-md`}>
                <p
                    onClick={() => navigate(`${role === "admin" ? '/dashboard/all-users' : 'dashboard/my-added-pets'}`)}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] hover:bg-gray-50 dark:hover:bg-gray-600/30">
                    <MdDashboard />
                    Profile
                </p>
                <p
                    onClick={() => navigate(`${role === "admin" ? '/dashboard/all-users' : 'dashboard/my-added-pets'}`)}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] hover:bg-gray-50 dark:hover:bg-gray-600/30">
                    <MdDashboard />
                    Settings
                </p>

                <div className="mt-3 border-t border-gray-200 pt-[5px]">
                    <p
                        onClick={handelLogout}
                        className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                        <TbLogout2 />
                        Logout
                    </p>
                </div>
            </div>

            <IoIosArrowUp
                className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 sm:block hidden`} />

        </div>
    );
};

export default Profile;