import PetCard from "@/Components/PetListing/PetCard/PetCard";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const RecentPets = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: recentPets, isLoading } = useQuery({
        queryKey: ['recentPets'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/recent-pets');
            return data;
        }
    })

    return (
        <div className="my-16 w-11/12 mx-auto ">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton height={200} />
                            <Skeleton height={20} width="80%" className="mt-2" />
                            <Skeleton height={20} width="60%" className="mt-2" />
                        </div>
                    ))
                    : recentPets?.map((pet) => (
                        <PetCard key={pet?._id} pet={pet} />
                    ))}
            </div>

            <button
                onClick={() => navigate('/pet-listing')} className="bg-color-accent text-white p-3 px-4 mt-8 mx-auto block rounded-md">
                Show More
            </button>
        </div>
    );
};

export default RecentPets;