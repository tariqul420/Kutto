import { useState } from "react";
import useAuth from "@/Hook/useAuth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import DOMPurify from 'dompurify';

const PetDetails = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const { user } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    console.log(id);

    const { data: pet = {} } = useQuery({
        queryKey: ["pet", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/pets/${id}`);
            return data;
        },
    });

    const sanitizedDescription = DOMPurify.sanitize(pet?.longDescription);


    const handleSubmitAdoptionRequest = async (e) => {
        e.preventDefault();

        // Prepare adoption data
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            petImage: pet.petImage,
            petOwner: {
                name: user.displayName,
                email: user.email,
            },
            phoneNumber,
            address,
        };

        try {
            // Send adoption data to the backend API (POST request)
            const response = await fetch("/api/adopt-pet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adoptionData),
            });

            if (response.ok) {
                toast.success("Adoption request submitted successfully!");
                // Reset the form fields
                setPhoneNumber("");
                setAddress("");
            } else {
                toast.error("Failed to submit adoption request.");
            }
        } catch (error) {
            console.error("Error submitting adoption request:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <section>
            {/* banner section */}
            <div className="relative flex items-center h-[30vh] bg-cover bg-center"
                style={{ backgroundImage: `url(https://img.freepik.com/free-photo/beautiful-domestic-cat-lying-fence_181624-30590.jpg?t=st=1736911879~exp=1736915479~hmac=48f8ad1c40a987291db211d282c6a46cc7e0c8a8c522abee2f77012be4dbf3d0&w=740)` }}>
                <div className="relative w-11/12 text-center text-white z-10">
                    <h1 className="font-bold text-5xl">
                        Pet
                        <span className="relative inline-block mx-2 text-white">
                            <span className="absolute inset-0 bg-color-accent clip-trapezoid"></span>
                            <span className="relative px-4 py-1">Details</span>
                        </span>
                    </h1>
                </div>
            </div>

            <div className="pet-details w-11/12 mx-auto flex flex-col lg:flex-row gap-8 my-16">
                {/* Pet Image on Left Side */}
                <div className="flex-1">
                    <img
                        src={pet.petImage}
                        alt={pet.petName}
                        className="w-full h-[400px] object-cover rounded-md"
                    />
                </div>

                {/* Pet Details on Right Side */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">{pet.petName}</h2>
                    <p><strong>Age:</strong> {pet?.petAge?.value} {pet?.petAge?.unit}</p>
                    <p><strong>Location:</strong> {pet?.petLocation}</p>
                    <p><strong>Category:</strong> {pet?.petCategories}</p>
                    <p><strong>Description:</strong> {pet?.shortDescription}</p>

                    <button className="px-4 py-2 rounded-md bg-color-accent">Adopt</button>

                    {/* <button onClick={handleAdoptClick} className="adopt-button bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Adopt
                </button> */}
                </div>
            </div>

            <div className="w-11/12 mx-auto my-20">
                <p className="text-2xl text-color-accent-d font-semibold border-b-2 border-color-accent inline">Details More</p>
                <div
                    className="pet-description text-base md:text-lg leading-relaxed mt-8"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
            </div>
        </section>
    );
};

export default PetDetails;