import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { MdCloudUpload, MdError } from "react-icons/md";
import ImageUpload from "../../Api/ImageUpload";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const UpdateProfile = () => {
    const { updateUserProfile, setUser, loading, setLoading } = useAuth();
    const [photoPreview, setPhotoPreview] = useState("");
    const navigate = useNavigate()

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const onSubmit = async ({ fullName, photo }) => {
        const photoFile = photo[0]

        const photoUrl = await ImageUpload(photoFile)

        // Update User Profile
        try {
            await updateUserProfile(fullName, photoUrl)
            setUser((prevUser) => ({
                ...prevUser,
                displayName: fullName,
                photoURL: photoUrl,
            }));
            toast.success('Profile Updated Successfully')
            navigate('/')
            reset()
        } catch (error) {
            toast.error(error.code)
            reset()
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6">
            <div className="w-full sm:w-[40%]  rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md dark:bg-dark-lite">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <h3 className="text-[1.8rem] font-[700]  text-center">
                        Update Profile
                    </h3>

                    <div>
                        <input
                            className="inputField"
                            placeholder="Full Name"
                            {...register("fullName", { required: 'Name is required', minLength: { value: 5, message: 'Name must be at least 5 characters long.' } })} />
                        {errors.fullName && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.fullName.message} </p>}
                    </div>

                    {/* Photo */}
                    <div>
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
                                rules={{ required: 'Photo is required.' }}
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
                            {
                                loading ? <ImSpinner9 size={24} className="animate-spin m-auto" /> : 'Update Profile'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;
