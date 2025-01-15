'use client'
import { Button, Modal, ModalAction, ModalContent, ModalHeader, ModalTitle } from 'keep-react'
import useAuth from "@/Hook/useAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import DOMPurify from 'dompurify';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '@/Hook/useAxiosSecure';
import toast from 'react-hot-toast';

const PetDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: pet = {} } = useQuery({
        queryKey: ["pet", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/pets/${id}`);
            return data;
        },
    });

    const onSubmit = async (data) => {
        const { location, phone } = data

        const petData = {
            petId: pet?._id,
            petAdopter: {
                email: user?.email,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                location: location,
                phone: phone
            }
        }

        try {
            await axiosSecure.post('/adoption-request', petData)
            reset()
            toast.success('Successfully added!')
        } catch (error) {
            toast.error(error?.response?.data)
            console.log(error);
        }
    };

    const sanitizedDescription = DOMPurify.sanitize(pet?.longDescription);

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
                        src={pet?.petImage}
                        alt={pet?.petName}
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

                    <Modal>
                        <ModalAction asChild>
                            <Button className="bg-color-accent hover:bg-color-accent">Adopt</Button>
                        </ModalAction>

                        <ModalContent>
                            <ModalHeader className="mb-6 flex flex-col justify-center">
                                <div className="space-y-1 text-center">
                                    <ModalTitle className='mb-4'>{pet?.petName}</ModalTitle>
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4 w-full">
                                                <div>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        disabled
                                                        value={user?.displayName}
                                                        {...register('name')}
                                                        className="inputField disabled:cursor-not-allowed"
                                                    />
                                                </div>

                                                <div>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        disabled
                                                        value={user?.email}
                                                        {...register('email')}
                                                        className="inputField disabled:cursor-not-allowed"
                                                    />
                                                </div>

                                                <div>
                                                    <input
                                                        id="phone"
                                                        placeholder='Phone Number'
                                                        name="phone"
                                                        type="number"
                                                        {...register('phone', { required: 'Phone number is required' })}
                                                        className="inputField"
                                                    />
                                                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                                                </div>

                                                <div>
                                                    <input
                                                        id="location"
                                                        name="location"
                                                        placeholder='Location'
                                                        type="text"
                                                        {...register('location', { required: 'Location is required' })}
                                                        className="inputField"
                                                    />
                                                    {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="px-4 py-2 bg-color-accent rounded-md mt-4"
                                                    type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </ModalHeader>
                        </ModalContent>
                    </Modal>
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