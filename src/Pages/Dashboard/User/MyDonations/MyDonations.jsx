import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

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

    useEffect(() => {
        document.title = 'My Donations || Kutto'
    }, []);

    const [refunding, setRefunding] = useState(false)
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
    });

    const handleRefund = async (id, amount) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setRefunding(true)
                try {
                    await axiosSecure.patch(`/refund-donation/${id}`, { amount });

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your donation campaign has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                    });
                    refetch();
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to Refund ❗",
                        icon: "error",
                        confirmButtonColor: "#d33",
                    });
                } finally {
                    setRefunding(false)
                }
            }
        });
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
                header: "Amount",
                cell: (info) => (
                    <p>$ {info.row.original.amount}</p>
                )
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
                            onClick={() => handleRefund(info.row.original.donationId, info.row.original.amount)}
                        >
                            {refunding ? 'Refunding...' : 'Refund'}
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
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualGrouping: false,
        pageCount: Math.ceil(myDonations.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={60} count={8} />;
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

export default MyDonations;