import PetCard from "@/Components/PetListing/PetCard/PetCard";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PetListing = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('');
    const axiosPublic = useAxiosPublic()

    const { ref, inView } = useInView();

    const { data: pets, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["petListingAllPet", search, category, sort],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axiosPublic.get("/all-pet", {
                params: {
                    search,
                    category,
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

    console.log(pets?.pages);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, hasNextPage, inView]);

    const handelSearch = (e) => {
        setSearch(e.target.value)
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handelSortChange = (e) => {
        setSort(e.target.value)
    }

    return (
        <div className="my-20">
            <div className="w-11/12 mx-auto">
                {/* Search and Filter */}
                <div className="mb-6 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="inputField p-2 w-1/3"
                        value={search}
                        onChange={handelSearch}
                    />

                    <div className="flex gap-4 w-1/3">
                        <select
                            className="inputField p-2"
                            value={sort}
                            onChange={handelSortChange}
                        >
                            <option value="">Sort by date</option>
                            <option value="new">New Date</option>
                            <option value="old">Old Date</option>
                        </select>
                        <select
                            className="inputField p-2"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="fish">Fish</option>
                            <option value="parrot">Parrot</option>
                            <option value="turtle">Turtle</option>
                            <option value="birds">Birds</option>
                            <option value="gold fish">Gold Fish</option>
                            <option value="mouse">Mouse</option>
                            <option value="goat">Goat</option>
                            <option value="ferret">Ferret</option>
                        </select>
                    </div>
                </div>

                {/* Pet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        pets?.pages[0]?.map(pet => <PetCard key={pet?._id} pet={pet} />)
                    }
                </div>
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="h-4 mt-4">
                {isFetchingNextPage && <p>Loading more pets...</p>}
            </div>

            {!hasNextPage && pets?.pages.flat().length > 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No more pets to load.
                </p>
            )}
        </div >
    );
};

export default PetListing;