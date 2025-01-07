import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const { user, logOutUser } = useAuth()

    const handelLogout = () => {
        logOutUser()
    };

    return (
        <div className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
            <div className="relative">
                <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                    alt="avatar" className="w-[40px] h-[40px] rounded-full object-cover border-2 border-solid border-[#3B82F6]" />
                <div
                    className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div>

            <h1 className="text-[1.2rem] font-[700] sm:block hidden">{user?.displayName.substring(0, 10)}!</h1>

            <div
                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    View Profile
                </p>
                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <IoSettingsOutline />
                    Settings
                </p>
                <p
                    onClick={() => navigate('/update-profile')}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    Update Profile
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
                className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 sm:block hidden`} />

        </div>

    );
};

export default Profile;