import PetCard from "@/Components/PetListing/PetCard/PetCard";

const PetListing = () => {
    return (
        <div className="my-20">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
            </div>
        </div>
    );
};

export default PetListing;