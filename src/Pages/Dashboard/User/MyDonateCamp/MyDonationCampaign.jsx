import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton'
import useAuth from "@/Hook/useAuth";
import { LineProgress, LineProgressBar, LineProgressText, Modal, ModalAction, ModalContent, ModalDescription, ModalHeader, ModalTitle, } from "keep-react";
'use client'
import { BiSolidDonateHeart } from "react-icons/bi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";

const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        document.title = 'My Donation Campaign || Kutto'
    }, []);

    const { data: myDonationCamp = [], isLoading, refetch } = useQuery({
        queryKey: ['myDonationCamp', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-donation/${user?.email}`);
            return data;
        },
    });

    const handelStatusUpdate = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Running' ? 'Pause' : 'Running';

        try {
            await axiosSecure.patch(`/donation-status/${id}?status=${newStatus}`);
            refetch();
            toast.success('Status updated successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: "serialNumber",
                header: "#",
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: "donationImage",
                header: "Image",
                cell: (info) => (
                    <img
                        src={info.getValue()}
                        alt={info.row.original.donationImage}
                        className="w-12 h-12 object-cover rounded-md"
                    />
                ),
            },
            {
                accessorKey: "donationName",
                header: "Donation Name",
            },
            {
                accessorKey: "maxAmount",
                header: "Max Amount",
                cell: (info) => (
                    <p>$ {info.getValue()}</p>
                )
            },
            {
                accessorKey: "donationProcess",
                header: "Donation Process",
                cell: (info) => (
                    <LineProgress progress={(info.row.original.totalDonateAmount / info.row.original.maxAmount) * 100 || 0}>
                        <LineProgressBar lineBackground="bg-error-50" className="bg-error-500" />
                        <LineProgressText className="text-error-500">
                            {Math.round((info.row.original.totalDonateAmount / info.row.original.maxAmount) * 100 || 0)}%
                        </LineProgressText>
                    </LineProgress>
                )
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: (info) => (
                    <span className={`${info.row.original.status === "Running" ? 'text-green-500' : 'text-red-500'}`}>{info.getValue()}</span>
                )
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => (
                    <div className="flex flex-col gap-2">
                        <button
                            disabled={
                                info.row.original.status === "Complete" ||
                                info.row.original.maxAmount === info.row.original.totalDonateAmount
                            }
                            onClick={() => handelStatusUpdate(info.row.original._id, info.row.original.status)}
                            className="px-2 py-0 rounded-md bg-red-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            {info.row.original.status === "Complete" ? "Completed" : info.row.original.status === "Running" ? "Pause" : "Running"}
                        </button>
                        <button
                            onClick={() => navigate(`/dashboard/update-donation-campaign/${info.row.original._id}`, { state: { from: location.pathname }, replace: true })}
                            className="px-2 py-0 rounded-md bg-red-500 text-white">
                            Update
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
                                                ${info.row.original.totalDonateAmount}</span>, Total Donators: <span className="text-color-accent">
                                                {info.row.original.
                                                    totalDonateUser} Members
                                            </span>
                                        </ModalDescription>
                                    </div>
                                </ModalHeader>
                            </ModalContent>
                        </Modal>
                    </div>
                ),
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [navigate]
    );

    const table = useReactTable({
        data: myDonationCamp,
        columns,
        state: {
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualGrouping: false,
        pageCount: Math.ceil(myDonationCamp.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={100} count={5} />;
    }

    if (myDonationCamp?.length === 0) {
        return <p className="text-center">No request found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 dark:bg-dark-lite">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() ? (
                                        header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-dark-lite">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 flex-wrap">
                <button
                    className="bg-color-accent px-2 py-1 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-600"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>

                <span className="my-2 sm:my-0">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <button
                    className="bg-color-accent px-2 py-1 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-600"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyDonationCampaign;