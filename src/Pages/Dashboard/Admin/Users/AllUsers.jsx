import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton'
import toast from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });

    const handelAdmin = async (email) => {
        try {
            await axiosSecure.patch(`/user-role-update/${email}`);
            toast.success('Update Successfully.');
            refetch();
        } catch (error) {
            toast.error(error.code);
        }
    };

    if (isLoading) {
        return <Skeleton height={50} count={9} />;
    }

    if (users.length === 0) {
        return <p className="text-center">No users found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 dark:bg-dark-lite">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user?._id} className="hover:bg-gray-200 dark:hover:bg-dark-lite">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img referrerPolicy="no-referrer" className="h-10 w-10 rounded-full" src={user?.image || 'https://img.freepik.com/premium-photo/3d-profile-button_459124-909.jpg?w=740'} alt={user?.name} loading="lazy" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{user?.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user?.email}</td>
                            <td className={`border border-gray-300 px-4 py-2 ${user?.role === 'admin' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-200'}`}>{user?.role}</td>
                            <td className="border border-gray-300 px-4 py-2 text-green-500">{user?.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    aria-label={`Promote ${user?.name} to admin`}
                                    onClick={() => handelAdmin(user?.email)}
                                    disabled={user?.role === 'admin'}
                                    className="px-3 py-1 bg-color-accent text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                                >
                                    Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;