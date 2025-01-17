import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineEditCalendar } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: allDonation = [], isLoading, refetch } = useQuery({
        queryKey: ["allDonation"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-donation-campaign-admin`);
            return data;
        },
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const handelDeleteUI = (id) => {
        toast.custom(
            <div className="backdrop-blur-lg p-3 flex gap-4 rounded-md dark:bg-dark-lite bg-gray-200 items-center">
                <p className="text-lg font-medium">Are you sure delete it!</p>
                <button
                    onClick={() => handleDelete(id)}
                    className="px-2 py-1 rounded-md bg-red-500 font-medium">Delete</button>
                <button
                    onClick={() => toast.dismiss()}
                    className="px-2 py-1 rounded-md bg-green-500 font-medium">Cancel</button>
            </div>
            , {
                position: "top-center",
            }
        )
    }

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/delete-pet/${id}`);
            toast.success("Pet deleted successfully!");
            toast.dismiss()
            refetch()
        } catch (error) {
            toast.error(error.code);
            toast.dismiss()
        }
    };

    const handelStatusUpdate = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Running' ? 'Pause' : 'Running';

        try {
            await axiosSecure.patch(`/donation-status/${id}?status=${newStatus}`);
            refetch(); // Re-fetch the data to reflect changes
            toast.success('Status updated successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

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
                        alt={info.row.original.donationName}
                        className="w-12 h-12 object-cover rounded-md"
                    />
                ),
            },
            {
                accessorKey: "donationName",
                header: "Pet Name",
            },
            {
                accessorKey: "maxAmount",
                header: "Max Amount",
                cell: (info) => <p>$ {info.getValue()}</p>
            },
            {
                accessorKey: "totalDonateAmount",
                header: "Donated Amount",
                cell: (info) => <p>$ {info.getValue()}</p>
            },
            {
                accessorKey: "donationOwner.email",
                header: "Donation Owner",
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: (info) => {
                    return (
                        <p
                            className={`${info.getValue() === 'Running' && 'text-green-600'} 
                                  ${info.getValue() === 'Pause' && 'text-red-600'} 
                                  ${info.getValue() === 'Complete' && 'text-blue-600 font-semibold'}`}
                        >
                            {info.getValue()}
                        </p>
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => (
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className="bg-orange-600 p-1 rounded-md text-white"
                            onClick={() => navigate(`/dashboard/update-donation-campaign/${info.row.original?._id}`)}
                        >
                            <MdOutlineEditCalendar />
                        </button>

                        <button
                            className="bg-red-500 p-1 rounded-md text-white"
                            onClick={() => handelDeleteUI(info.row.original._id)}
                        >
                            <RiDeleteBin5Fill />
                        </button>

                        <button
                            disabled={
                                info.row.original?.status === "Complete" ||
                                info.row.original?.maxAmount === info.row.original?.totalDonateAmount
                            }
                            onClick={() => handelStatusUpdate(info.row.original?._id, info.row.original.status)}
                            className="px-2 py-0 rounded-md bg-red-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            {info.row.original?.status === "Complete" ? "Completed" : info.row.original.status === "Running" ? "Pause" : "Running"}
                        </button>
                    </div>
                ),
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [navigate]
    );

    const table = useReactTable({
        data: allDonation,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        pageCount: Math.ceil(allDonation.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={60} count={8} />;
    }

    if (allDonation?.length === 0) {
        return <p className="text-center">No data found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                    className="bg-color-accent-d px-2 py-1 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-600"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>

                <span className="my-2 sm:my-0">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <button
                    className="bg-color-accent-d px-2 py-1 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-600"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllDonation;
