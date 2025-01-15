import { useForm } from "react-hook-form";
import { MdCalendarToday, MdCloudUpload, MdError } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import ImageUpload from "@/Api/ImageUpload";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";

const UpdateDonationCampaign = () => {
    const [photoPreview, setPhotoPreview] = useState("");
    const [longDesc, setLongDesc] = useState('');
    const [longDescError, setLongDescError] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Update a Donation || Kutto";
    }, []);

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (petData) => {
            await axiosSecure.put(`/update-pe/${id}`, petData);
        },
        onSuccess: () => {
            toast.success("Data Updated Successfully!!!");
            queryClient.invalidateQueries(["myDonationCamp"]);
            navigate("/dashboard/my-donation-campaign");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update pet data.");
        },
    });

    const { data: donation = {}, isLoading } = useQuery({
        queryKey: ["donationDetails", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donation-details/${id}`);
            return data;
        },
    });

    const [lastDate, setLastDate] = useState(donation?.lastDate ? new Date(donation.lastDate) : new Date());

    const onSubmit = async (data) => {
        const { donationName, maxAmount, shortDescription, donationImg } = data;
        const photoFile = donationImg[0];

        if (longDesc.trim() === "" || longDesc === "<p><br></p>") {
            setLongDescError(true);
            return;
        }
        setLongDescError(false);

        if (!lastDate) {
            toast.error("Last donation date is required.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!lastDate || lastDate < today) {
            toast.error("Last donation date cannot be in the past.");
            return;
        }

        try {
            let imgUrl = donation?.donationImage;

            if (photoFile) {
                imgUrl = await ImageUpload(photoFile);
            }

            const donationData = {
                donationImage: imgUrl,
                donationName,
                maxAmount: parseFloat(maxAmount),
                lastDate: lastDate.toISOString(),
                shortDescription,
                totalDonateUser: parseInt(0),
                totalDonateAmount: parseInt(0),
                status: "Running",
                longDescription: longDesc,
                donationOwner: {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                },
            };

            await mutateAsync(donationData);
            reset();
            setPhotoPreview("");
            setLongDesc("");
            setLastDate(null);
        } catch (error) {
            toast.error(error.message || "Image upload failed.");
        }
    };

    useEffect(() => {
        if (!isLoading && donation) {
            setLongDesc(donation?.longDescription || "");
            setPhotoPreview(donation?.donationImage || "");
        }
    }, [donation, isLoading]);

    if (isLoading) return <p>Loading...</p>

    return (
        <section className="w-11/12 mx-auto h-auto flex flex-col-reverse lg:flex-row my-0 dark:bg-dark-lite rounded-md bg-white">
            {/* Create donation Form */}
            <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <h3 className="text-[3rem] font-[700] text-center">Update a Donation</h3>

                    <div className="flex gap-4">
                        {/* Donation Name */}
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue={donation?.donationName}
                                placeholder="Donation Name"
                                className="inputField"
                                {...register("donationName", { required: "Donation name is required." })}
                            />
                            {errors.donationName && (
                                <p className="flex text-red-500 gap-1 items-center">
                                    <MdError /> {errors.donationName.message}
                                </p>
                            )}
                        </div>

                        {/* Last Donation Date */}
                        <div className="relative flex-1">
                            <MdCalendarToday className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 z-[999]" />
                            <DatePicker
                                selected={lastDate}
                                onChange={(date) => setLastDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Last Donation Date"
                                className="inputField w-full pl-10" // Add padding to make space for the icon
                            />
                            {!lastDate && (
                                <p className="flex text-red-500 gap-1 items-center mt-1">
                                    <MdError /> Last donation date is required.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Max Donation Amount */}
                    <div className="flex-1">
                        <input
                            type="number"
                            defaultValue={donation?.maxAmount}
                            placeholder="Max Donation Amount"
                            className="inputField"
                            {...register("maxAmount", {
                                required: "Max Donation Amount is required.",
                                min: {
                                    value: 1,
                                    message: "Minium Donation Amount must be at least 1."
                                }
                            })}
                        />
                        {errors.maxAmount && (
                            <p className="flex text-red-500 gap-1 items-center">
                                <MdError /> {errors.maxAmount.message}
                            </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <textarea
                            rows={2}
                            defaultValue={donation?.shortDescription}
                            placeholder="Short Description"
                            className="inputField w-full"
                            {...register("shortDescription", { required: "Short description is required." })}
                        />
                        {errors.shortDescription && (
                            <p className="flex text-red-500 gap-1 items-center">
                                <MdError /> {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={longDesc}
                            onChange={setLongDesc}
                            className={longDescError ? "border border-red-500" : ""}
                        />
                        {longDescError && (
                            <p className="flex text-red-500 gap-1 items-center mt-1">
                                <MdError /> Long description is required.
                            </p>
                        )}
                    </div>

                    {/* Donation Photo */}
                    <div>
                        <label
                            htmlFor="donationImg"
                            className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-color-accent transition-all"
                        >
                            <span className="text-gray-500 flex items-center gap-2">
                                <MdCloudUpload className="text-xl" /> Upload Photo
                            </span>
                            {photoPreview && (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-14 h-14 object-cover rounded-md border border-gray-300 ml-4"
                                />
                            )}
                            <input
                                id="donationImg"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("donationImg", {
                                    onChange: (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setPhotoPreview(URL.createObjectURL(file));
                                        }
                                    },
                                })}
                            />
                        </label>
                        {errors.donationImg && (
                            <p className="flex text-red-500 gap-1 items-center mt-1">
                                <MdError /> {errors.donationImg.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button type="submit" className="inputButton">
                            {isPending ? "Adding..." : "Add Donation"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateDonationCampaign;