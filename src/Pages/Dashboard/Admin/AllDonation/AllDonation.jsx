import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineEditCalendar } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation()

    const { data: allDonation = [], isLoading, refetch } = useQuery({
        queryKey: ["allDonation"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-donation-campaign-admin`);
            return data;
        },
    });

    useEffect(() => {
        document.title = 'All Donations || Kutto'
    }, []);

    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/donation-campaign-admin/${id}`);
                if (response?.status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your donation campaign has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                    });
                    refetch();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete ❗",
                        icon: "error",
                        confirmButtonColor: "#d33",
                    });
                }
            }
        });
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
                            onClick={() => navigate(`/dashboard/update-donation-campaign/${info.row.original?._id}`, { state: { from: location.pathname }, replace: true })}
                        >
                            <MdOutlineEditCalendar />
                        </button>

                        <button
                            className="bg-red-500 p-1 rounded-md text-white"
                            onClick={() => handleDelete(info.row.original._id)}
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
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        pageCount: Math.ceil(allDonation.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={75} count={7} />;
    }

    if (allDonation?.length === 0) {
        return <p className="text-center">No data found.</p>;
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
                                    className="border border-gray-300 px-4 py-2"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                        header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"
                                        ) : null
                                    }
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

export default AllDonation;
