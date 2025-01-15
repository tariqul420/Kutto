import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: myPets = [], isLoading, refetch } = useQuery({
        queryKey: ["myPets", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-pets/${user?.email}`);
            return data;
        },
    });

    const [sorting, setSorting] = useState([]);
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

    const handleAdopt = async (id) => {
        try {
            await axiosSecure.patch(`/adopt-pet/${id}`, { adopted: true });
            toast.success("Pet marked as adopted!");
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
                accessorKey: "petImage",
                header: "Image",
                cell: (info) => (
                    <img
                        src={info.getValue()}
                        alt={info.row.original.petName}
                        className="w-12 h-12 object-cover rounded-md"
                    />
                ),
            },
            {
                accessorKey: "petName",
                header: "Pet Name",
            },
            {
                accessorKey: "petCategories",
                header: "Category",
            },
            {
                accessorKey: "adopted",
                header: "Adoption Status",
                cell: (info) => (info.getValue() ? "Adopted" : "Not Adopted"),
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => (
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className="bg-orange-600 p-1 rounded-md text-white"
                            onClick={() => navigate(`/dashboard/update-pet/${info.row.original._id}`)}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 p-1 rounded-md text-white"
                            onClick={() => handelDeleteUI(info.row.original._id)}
                        >
                            Delete
                        </button>
                        {!info.row.original.adopted && (
                            <button
                                className="bg-green-500 p-1 rounded-md text-white"
                                onClick={() => handleAdopt(info.row.original._id)}
                            >
                                Adopted
                            </button>
                        )}
                    </div>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [navigate]
    );

    const table = useReactTable({
        data: myPets,
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
        pageCount: Math.ceil(myPets.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={20} count={15} />;
    }

    if (myPets?.length === 0) {
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

export default MyAddedPets;
