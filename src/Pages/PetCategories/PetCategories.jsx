import PetCard from "@/Components/PetListing/PetCard/PetCard";
import EmptyComponent from "@/Components/Shared/EmptyComponent/EmptyComponent";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

const PetCategories = () => {
    const { category } = useParams()
    const axiosPublic = useAxiosPublic();
    const { ref, inView } = useInView();

    const { data: petByCategory, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["petByCategoryPet", category],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axiosPublic.get(`/pets-category/${category}`, {
                params: {
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

    const noData = !isLoading && petByCategory?.pages.flat().length === 0;

    return (
        <section>
            {/* Banner Section */}
            <div
                className="relative flex items-center h-[30vh] bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a1181f6-133f-416f-813a-4fa3ce6d7bd6/dgf5tim-b309290d-b8e6-4349-b341-5cfb186141ad.png/v1/fill/w_1280,h_431,q_80,strp/animals_pet_dog_banner_panorama_by_viaankart_dgf5tim-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBhMTE4MWY2LTEzM2YtNDE2Zi04MTNhLTRmYTNjZTZkN2JkNlwvZGdmNXRpbS1iMzA5MjkwZC1iOGU2LTQzNDktYjM0MS01Y2ZiMTg2MTQxYWQucG5nIiwiaGVpZ2h0IjoiPD00MzEiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8wYTExODFmNi0xMzNmLTQxNmYtODEzYS00ZmEzY2U2ZDdiZDZcL3ZpYWFua2FydC00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.Of0gx_gOs73n23MB1EWAUwKypJ836_Xcy9O1K5wIZgw)`,
                }}
            >
                <div className="relative w-11/12 text-center text-white z-10">
                    <h1 className="font-bold text-5xl">
                        <span className="relative inline-block mx-2 text-white">
                            <span className="absolute inset-0 bg-color-accent clip-trapezoid"></span>
                            <span className="relative px-4 py-1 capitalize">{category}</span>
                        </span>
                    </h1>
                </div>
            </div>


            {/* Infinite Scroll Loader */}
            <div ref={ref} className="flex items-center justify-center mt-8">
                {isFetchingNextPage && <CgSpinnerTwo color="#F04335" size={25} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-11/12 mx-auto">
                {isLoading ? (
                    Array(6).fill().map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton height={200} />
                            <Skeleton height={20} width="80%" className="mt-2" />
                            <Skeleton height={20} width="60%" className="mt-2" />
                        </div>
                    ))
                ) : noData
                    ? <EmptyComponent /> : (
                        petByCategory.pages.flat()?.map((pet) => (
                            <PetCard key={pet?._id} pet={pet} />
                        ))
                    )}
            </div>

            {!hasNextPage && petByCategory?.pages.flat().length > 0 && (
                <p className="text-center text-gray-500 my-6">
                    No more pets to load.
                </p>
            )}
        </section>
    );
};

export default PetCategories;