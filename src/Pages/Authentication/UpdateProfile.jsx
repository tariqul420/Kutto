import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";
const UpdateProfile = () => {
    const { updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async ({ fullName, photoUrl }) => {

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
        } catch (error) {
            toast.error(error.code)
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

                    <div>
                        <input
                            className="inputField"
                            placeholder="Photo Url"
                            {...register("photoUrl", { required: 'Photo Url is required.', pattern: { value: new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i'), message: 'Invalid URL (png, jpg, jpeg, bmp, gif, webp).' } })} />
                        {errors.photoUrl && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.photoUrl.message} </p>}
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="inputButton"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;
