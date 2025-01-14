import PetCard from "@/Components/PetListing/PetCard/PetCard";

const PetListing = () => {
    return (
        <div className="my-20">
            <div className="w-11/12 mx-auto">
                {/* Search and Filter */}
                <div className="mb-6 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="inputField p-2 w-1/3"
                    />

                    <div className="flex gap-4 w-1/3">
                        <select
                            className="inputField p-2"
                        >
                            <option value="">Sort by date</option>
                            <option value="dog">New Date</option>
                            <option value="cat">Old Date</option>
                        </select>
                        <select
                            className="inputField p-2"
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
                    <PetCard />
                    <PetCard />
                    <PetCard />
                    <PetCard />
                    <PetCard />
                </div>

            </div>
        </div>
    );
};

export default PetListing;