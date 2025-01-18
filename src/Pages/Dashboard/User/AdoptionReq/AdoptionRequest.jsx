import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton'
import toast from "react-hot-toast";
import useAuth from "@/Hook/useAuth";
import { useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

const AdoptionRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    useEffect(() => {
        document.title = 'Adoption Request || Kutto'
    }, []);

    const { data: adoptionReq = [], isLoading, refetch } = useQuery({
        queryKey: ['adoptionReq'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/adoption-request/${user?.email}`);
            return data;
        },
    });

    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 6,
    })

    const handleAdopt = async (id, status) => {
        try {
            await axiosSecure.patch(`/adopt-pet/${id}?status=${status}`);
            toast.success(`Pet marked as ${status}!`);
            refetch();
        } catch (error) {
            toast.error(`Failed to update pet adoption: ${error?.response?.data?.error || error.message}`);
        }
    };

    const columns = useMemo(() => [
        {
            accessorKey: "serialNumber",
            header: "#",
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'petImage',
            header: 'Pet Image',
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt={info.row.original.petName}
                    className="w-12 h-12 object-cover rounded-md"
                />
            )
        },
        {
            accessorKey: 'petAdopter.displayName',
            header: 'Name'
        },
        {
            accessorKey: 'petAdopter.email',
            header: 'Email'
        },
        {
            accessorKey: 'petAdopter.phone',
            header: 'Phone Number'
        },
        {
            accessorKey: 'petAdopter.location',
            header: 'Location'
        },
        {
            accessorKey: 'status',
            header: 'Status'
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="space-y-2">
                    <button
                        disabled={!info.row.original.status}
                        onClick={() => handleAdopt(info.row.original.petId, "accept")}
                        className="px-2 py-1 rounded-md bg-red-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed">
                        Accept
                    </button>
                    <button
                        disabled={!info.row.original.status}
                        onClick={() => handleAdopt(info.row.original.petId, "rejected")}
                        className="px-2 py-1 rounded-md bg-green-500 text-white disabled:bg-gray-700 disabled:cursor-not-allowed">
                        Reject
                    </button>
                </div>
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [])

    const table = useReactTable({
        data: adoptionReq,
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
        pageCount: Math.ceil(adoptionReq.length / pagination.pageSize),
    })

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
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
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
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-dark-lite">
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border border-gray-300 px-4 py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
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

export default AdoptionRequest;