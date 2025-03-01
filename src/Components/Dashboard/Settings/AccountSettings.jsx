import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCloudUpload, MdError } from "react-icons/md";
import { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../Hook/useAuth";
import useRole from "@/Hook/useRole";
import ImageUploadCloud from "@/Api/ImageUploadCloud";
import useAxiosSecure from "@/Hook/useAxiosSecure";

const AccountSettings = () => {
    const { updateUserProfile, user, setUser, loading, setLoading } = useAuth();
    const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole()

    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            setValue("fullName", user.displayName || "");
            setValue("email", user.email || "");
        }
    }, [user, setValue]);

    const onSubmit = async ({ fullName, photo }) => {
        const photoFile = photo[0];

        const photoUrl = await ImageUploadCloud(photoFile);

        // Update User Profile
        try {
            await updateUserProfile(fullName, photoUrl);
            setUser((prevUser) => ({
                ...prevUser,
                displayName: fullName,
                photoURL: photoUrl,
            }));

            await axiosSecure.patch(`/users/${user?.email}`, {
                name: fullName,
                image: photoUrl,
            })

            toast.success("Profile Updated Successfully");
            navigate("/");
            reset();
        } catch (error) {
            toast.error(error.code);
            reset();
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-6 border rounded bg-white shadow dark:bg-dark-lite">
            <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>
            <div className="flex flex-col md:flex-row items-center gap-20">
                <div className="w-full md:w-[40%]">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input
                                className="inputField"
                                {...register("fullName", {
                                    required: "Name is required",
                                    minLength: { value: 5, message: "Name must be at least 5 characters long." },
                                })}
                            />
                            {errors.fullName && (
                                <p className="flex text-red-500 gap-1 items-center">
                                    <MdError /> {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Email (Disabled) */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                className="inputField cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                                placeholder="Email"
                                {...register("email")}
                                disabled
                            />
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Photo</label>
                            <label
                                htmlFor="photo"
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
                                <Controller
                                    name="photo"
                                    control={control}
                                    rules={{
                                        required: "Photo is required."
                                    }}
                                    render={({ field }) => (
                                        <input
                                            id="photo"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setPhotoPreview(URL.createObjectURL(file));
                                                }
                                                field.onChange(e.target.files);
                                            }}
                                        />
                                    )}
                                />
                            </label>
                            {errors.photo && (
                                <p className="flex text-red-500 gap-1 items-center mt-1">
                                    <MdError /> {errors.photo.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="w-full flex items-center justify-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="inputButton disabled:cursor-not-allowed"
                            >
                                {loading ? <ImSpinner9 size={24} className="animate-spin m-auto" /> : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-4 md:mt-0 flex items-center justify-center flex-col gap-4">
                    <img
                        referrerPolicy="no-referrer"
                        className="w-52 h-52 border-2 border-solid border-color-accent rounded-full p-1 object-cover" src={user?.photoURL} alt="profile photo" />

                    <p className="bg-color-accent px-3 rounded-lg text-white">{role}</p>
                </div>
            </div>
        </section>
    );
};

export default AccountSettings;
