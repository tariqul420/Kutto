import useAuth from "../../../Hook/useAuth";

const Profile = () => {
    const { user } = useAuth()

    return (
        <div className="flex items-center gap-[10px] cursor-pointer relative">
            <div className="relative">
                <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                    alt="avatar" className="w-[40px] h-[40px] rounded-full object-cover border-2 border-solid border-[#3B82F6]" />
                <div
                    className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div >
            <h1 className="text-[1.2rem] font-[700] sm:block hidden">{user?.displayName.substring(0, 10)}!</h1>
        </div>

    );
};

export default Profile;