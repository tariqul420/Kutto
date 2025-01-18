import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CgSpinnerTwo } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import DonationCard from "@/Components/DonationsCampaigns/DonationCard";
import EmptyComponent from "@/Components/Shared/EmptyComponent/EmptyComponent";

const DonationCampaigns = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const axiosPublic = useAxiosPublic();
    const { ref, inView } = useInView();

    const { data: pets, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["allDonationCampaigns", search, sort],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axiosPublic.get("/donation-campaign", {
                params: {
                    search,
                    sort,
                    page: pageParam,
                    limit: 6,
                },
            });
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 6 ? allPages.length + 1 : undefined;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, inView]);

    const handelSortChange = (e) => {
        setSort(e.target.value);
    };

    const noData = !isLoading && pets?.pages.flat().length === 0;

    return (
        <div className="mb-20 mt-6">
            <div className="w-11/12 mx-auto">
                {/* Sort by date */}
                <div className="mb-6 flex gap-4 justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="inputField p-2 w-1/3 max-sm:w-full"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="inputField p-2 w-1/3 max-sm:w-full"
                        value={sort}
                        onChange={handelSortChange}
                    >
                        <option value="">Sort by date</option>
                        <option value="new">New Date</option>
                        <option value="old">Old Date</option>
                    </select>
                </div>

                {/* Donation Cards or Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="p-4">
                                <Skeleton height={200} />
                                <Skeleton height={20} width="80%" className="mt-2" />
                                <Skeleton height={20} width="60%" className="mt-2" />
                            </div>
                        ))
                        : noData ? (
                            <EmptyComponent />
                        ) : (
                            pets?.pages.flat().map((donation) => (
                                <DonationCard key={donation?._id} donation={donation} />
                            ))
                        )}
                </div>
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="flex items-center justify-center mt-8">
                {isFetchingNextPage && <CgSpinnerTwo className="animate-spin" color="#F04335" size={25} />}
            </div>

            {!hasNextPage && pets?.pages.flat().length > 0 && (
                <p className="text-center text-gray-500 mt-4">No more donations to load.</p>
            )}
        </div>
    );
};

export default DonationCampaigns;