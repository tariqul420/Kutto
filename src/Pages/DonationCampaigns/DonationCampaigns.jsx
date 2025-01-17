import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CgSpinnerTwo } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import DonationCard from "@/Components/DonationsCampaigns/DonationCard";
import EmptyComponent from "@/Components/Shared/EmptyComponent/EmptyComponent";

const DonationCampaigns = () => {
    const [sort, setSort] = useState('');
    const axiosPublic = useAxiosPublic();
    const { ref, inView } = useInView();

    const { data: pets, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["petListingAllPet", sort],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axiosPublic.get("/donation-campaign", {
                params: {
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
        <div className="my-20">
            <div className="w-11/12 mx-auto">
                {/* Sort by date */}
                <div className="mb-6 flex w-1/4 ml-auto">
                    <select
                        className="inputField p-2"
                        value={sort}
                        onChange={handelSortChange}
                    >
                        <option value="">Sort by date</option>
                        <option value="new">New Date</option>
                        <option value="old">Old Date</option>
                    </select>
                </div>

                {/* Pet Cards or Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="p-4">
                                <Skeleton height={200} />
                                <Skeleton height={20} width="80%" className="mt-2" />
                                <Skeleton height={20} width="60%" className="mt-2" />
                            </div>
                        ))
                        : noData ?
                            <EmptyComponent />
                            :
                            pets?.pages[0]?.map((donation) => (
                                <DonationCard key={donation?._id} donation={donation} />
                            ))}
                </div>
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="h-4 mt-4">
                {isFetchingNextPage && <CgSpinnerTwo color="#6b7280" size={20} />}
            </div>

            {!hasNextPage && pets?.pages.flat().length > 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No more pets to load.
                </p>
            )}
        </div>
    );
};

export default DonationCampaigns;