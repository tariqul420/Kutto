import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton'
import toast from "react-hot-toast";
import useAuth from "@/Hook/useAuth";

const AdoptionRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data: adoptionReq = [], isLoading, refetch } = useQuery({
        queryKey: ['adoptionReq'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/adoption-request/${user?.email}`);
            return data;
        },
    });

    const handleAdopt = async (id, status) => {
        try {
            await axiosSecure.patch(`/adopt-pet/${id}?status=${status}`);
            toast.success(`Pet marked as ${status}!`);
            refetch();
        } catch (error) {
            toast.error(`Failed to update pet adoption: ${error?.response?.data?.error || error.message}`);
        }
    };

    if (isLoading) {
        return <Skeleton height={80} count={6} />;
    }

    if (adoptionReq?.length === 0) {
        return <p className="text-center">No request found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 dark:bg-dark-lite">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Pet Image</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                        <th className="border border-gray-300 px-4 py-2">Location</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adoptionReq.map((pet, index) => (
                        <tr key={user?._id} className="hover:bg-gray-200 dark:hover:bg-dark-lite">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img
                                    src={pet?.petImage}
                                    alt={pet?.petName}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{pet?.petAdopter?.displayName}</td>
                            <td className="border border-gray-300 px-4 py-2">{pet?.petAdopter?.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{pet?.petAdopter?.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{pet?.petAdopter?.location}</td>
                            <td className="border border-gray-300 px-4 py-2">{pet?.status}</td>
                            <td className="border border-gray-300 px-4 py-2 space-y-2">
                                <button
                                    disabled={!pet?.status}
                                    onClick={() => handleAdopt(pet?.petId, "accept")}
                                    className="px-2 py-1 rounded-md bg-red-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed">
                                    Accept
                                </button>
                                <button
                                    disabled={!pet?.status}
                                    onClick={() => handleAdopt(pet?.petId, "rejected")}
                                    className="px-2 py-1 rounded-md bg-green-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptionRequest;