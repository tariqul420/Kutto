import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const MyDonations = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myDonations = [], isLoading, refetch } = useQuery({
        queryKey: ["myDonatioHistory", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-donation-history/${user?.email}`);
            return data;
        },
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const handelRefundUI = (id) => {
        toast.custom(
            <div className="backdrop-blur-lg p-3 flex gap-4 rounded-md dark:bg-dark-lite bg-gray-200 items-center">
                <p className="text-lg font-medium">Are you sure refund it!</p>
                <button
                    onClick={() => handleRefund(id)}
                    className="px-2 py-1 rounded-md bg-red-500 font-medium">Refund</button>
                <button
                    onClick={() => toast.dismiss()}
                    className="px-2 py-1 rounded-md bg-green-500 font-medium">Cancel</button>
            </div>
            , {
                position: "top-center",
            }
        )
    }

    const handleRefund = async (id) => {
        try {
            await axiosSecure.delete(`/delete-pet/${id}`);
            toast.success("Donation Refund Successfully!");
            toast.dismiss()
            refetch()
        } catch (error) {
            toast.error(error.code);
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
                accessorKey: "amount",
                header: "Amount 💵",
            },
            {
                accessorKey: "paymentId",
                header: "Transaction ID",
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => (
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className="bg-red-500 p-1 rounded-md text-white"
                            onClick={() => handelRefundUI(info.row.original._id)}
                        >
                            Refund
                        </button>
                    </div>
                ),
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const table = useReactTable({
        data: myDonations,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        pageCount: Math.ceil(myDonations.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={20} count={15} />;
    }

    if (myDonations?.length === 0) {
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
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
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

export default MyDonations;
