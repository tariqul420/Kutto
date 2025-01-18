import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });

    useEffect(() => {
        document.title = 'All Users || Kutto'
    }, []);

    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8,
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

    const columns = useMemo(
        () => [
            {
                accessorKey: "serialNumber",
                header: "#",
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: "image",
                header: "Photo",
                cell: (info) => (
                    <img
                        src={info.getValue()}
                        alt={info.row.original.petName}
                        className="w-12 h-12 object-cover rounded-md"
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "role",
                header: "Role",
                cell: (info) => (
                    <span className={`${info.getValue() === 'admin' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-200'}`} > {info.getValue()}</span >
                )
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: (info) => (
                    <span className="text-green-500">{info.getValue()}</span>
                )
            },
            {
                id: "actions",
                header: "Actions",
                cell: (info) => (
                    <button
                        aria-label={`Promote ${info.row.original.name} to admin`}
                        onClick={() => handelAdmin(info.row.original.email)}
                        disabled={info.row.original.role === 'admin'}
                        className="px-3 py-1 bg-color-accent text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Admin
                    </button>
                ),
            }
        ],

        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const table = useReactTable({
        data: users,
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
        pageCount: Math.ceil(users.length / pagination.pageSize),
    });

    if (isLoading) {
        return <Skeleton height={60} count={10} />;
    }

    if (users?.length === 0) {
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

export default AllPets;