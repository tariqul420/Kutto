import useAuth from "@/Hook/useAuth";
import useRole from "@/Hook/useRole";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { IoMdSettings } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [role] = useRole();
    const { user } = useAuth();

    const joinUser = user.metadata.createdAt ? new Date(Number(user.metadata.createdAt)) : null;
    const lastLogin = user.metadata.lastLoginAt ? new Date(Number(user.metadata.lastLoginAt)) : null;

    const joinDateFormatted = joinUser ? format(joinUser, "EEEE, MMMM d, yyyy") : "Unknown";
    const lastLoginFormatted = lastLogin ? format(lastLogin, "EEEE, MMMM d, yyyy") : "Unknown";

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Profile</h1>
                </div>
                <div className="items-center mt-4 grid grid-cols-12">
                    <img src={user?.photoURL || "/profile.jpg"} alt="Profile" className="w-32 h-32 rounded-full border-4 object-cover border-gray-300 dark:border-gray-600 col-span-2" />
                    <div className="ml-6 col-span-10">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{user.displayName || "Unknown User"}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{user.email || "No email provided"}</p>
                        <p className="text-gray-700 dark:text-gray-300">Role: {role || "Not assigned"}</p>
                        <p className="text-gray-700 dark:text-gray-300">Location: {user.location || "Not provided"}</p>
                        <p className="text-gray-700 dark:text-gray-300">Joined: {joinDateFormatted}</p>
                        <p className="text-gray-700 dark:text-gray-300">Last Login: {lastLoginFormatted}</p>
                        <p className="text-gray-700 dark:text-gray-300">User Name: {user?.uid || "Not assigned"}</p>
                        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{user.bio || "I believe in giving pets a loving home. I'm here to find my perfect furry companion or help others do the same. If you're looking for a new pet or want to share information about pets available for adoption, feel free to reach out!"}</p>
                        <Link
                            to={`/dashboard/settings`}
                            className="mt-3 px-4 py-2 bg-color-accent text-white rounded-lg  items-center gap-2 inline-flex">
                            <MdEdit /> Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* User Details */}
            <div className="w-full max-w-5xl mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">More Information (Default)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Phone Number</h3>
                        <p className="text-gray-700 dark:text-gray-300">(+880) 1743892058</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Occupation</h3>
                        <p className="text-gray-700 dark:text-gray-300">Web Developer</p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Website</h3>
                        <a href="https://tariqul.vercel.app/" target="_blank" className="text-gray-700 dark:text-gray-300">tariqul.vercel.app</a>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Hobbies</h3>
                        <p className="text-gray-700 dark:text-gray-300">Reading, Cycling, Exploring Nature</p>
                    </div>
                </div>
            </div>


            {/* Settings */}
            <div className="w-full max-w-5xl mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2"><IoMdSettings /> Account Settings</h2>
                <button
                    onClick={() => toast.error("Feature Not Available")}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Delete Account</button>
            </div>
        </div>
    );
};

export default UserProfile;
