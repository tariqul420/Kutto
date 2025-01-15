import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton'
import useAuth from "@/Hook/useAuth";
import { LineProgress, LineProgressBar, LineProgressText, Modal, ModalAction, ModalContent, ModalDescription, ModalHeader, ModalTitle, } from "keep-react";
'use client'
import { BiSolidDonateHeart } from "react-icons/bi";
import { useState } from "react";
import toast from "react-hot-toast";

const MyDonationCampaign = () => {
    const [status, setStatus] = useState(true)
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data: myDonationCamp = [], isLoading, refetch } = useQuery({
        queryKey: ['myDonationCamp', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-donation/${user?.email}`);
            return data;
        },
    });

    if (isLoading) {
        return <Skeleton height={28} count={15} />;
    }

    if (myDonationCamp?.length === 0) {
        return <p className="text-center">No request found.</p>;
    }

    const handelStatusUpdate = async (id, camStatus) => {
        setStatus(!status)

        try {
            await axiosSecure.patch(`/donation-status/${id}?status=${camStatus}`)
            refetch()
            toast.success('Status Update Successfully!')
        } catch (error) {
            toast.error(error.code)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 dark:bg-dark-lite">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Donation Name</th>
                        <th className="border border-gray-300 px-4 py-2">Max Amount</th>
                        <th className="border border-gray-300 px-4 py-2">Donation Process</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myDonationCamp.map((donation, index) => (
                        <tr key={user?._id} className="hover:bg-gray-200 dark:hover:bg-dark-lite">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img
                                    src={donation?.donationImage}
                                    alt={donation?.donationName}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{donation?.donationName}</td>
                            <td className="border border-gray-300 px-4 py-2">$ {donation?.maxAmount}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <LineProgress progress={(donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0}>
                                    <LineProgressBar lineBackground="bg-error-50" className="bg-error-500" />
                                    <LineProgressText className="text-error-500">
                                        {Math.round((donation?.totalDonateAmount / donation?.maxAmount) * 100 || 0)}%
                                    </LineProgressText>
                                </LineProgress>
                            </td>
                            <td className={`border border-gray-300 px-4 py-2 ${donation?.status === "Running" ? 'text-green-500' : 'text-red-500'}`}> {donation?.status}</td>
                            <td className="border border-gray-300 px-4 py-2 flex flex-col gap-2">
                                <button
                                    onClick={() => handelStatusUpdate(donation?._id, status)}
                                    className="px-2 py-0 rounded-md bg-red-500 text-white">
                                    {
                                        status ? 'Pause' : 'Running'
                                    }
                                </button>
                                <button
                                    className="px-2 py-0 rounded-md bg-red-500 text-white">
                                    Edit
                                </button>
                                <Modal>
                                    <ModalAction asChild>
                                        <button className="px-2 py-0 rounded-md bg-red-500 text-white">Adopter</button>
                                    </ModalAction>
                                    <ModalContent className="max-w-[20rem] lg:max-w-[26rem]">
                                        <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
                                                <BiSolidDonateHeart size={50} />
                                            </div>
                                            <div className="space-y-1 text-center">
                                                <ModalTitle>Donation Details</ModalTitle>
                                                <ModalDescription>
                                                    Total Donation: <span className="text-color-accent">
                                                        ${donation?.totalDonateAmount}</span>, Total Donators: <span className="text-color-accent">
                                                        {donation?.
                                                            totalDonateUser} Members
                                                    </span>
                                                </ModalDescription>
                                            </div>
                                        </ModalHeader>
                                    </ModalContent>
                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonationCampaign;