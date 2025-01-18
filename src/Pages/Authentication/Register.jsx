import { useState } from "react";
import Lottie from "lottie-react";
import { Controller, useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdCloudUpload, MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import spaceRegister from '../../assets/Lottie/space_register.json'
import toast from "react-hot-toast";
import ImageUpload from "../../Api/ImageUpload";
import SocialBtn from "../../Components/Auth/SocialBtn";
import { ImSpinner9 } from "react-icons/im";
import saveUser from "@/Api/saveUser";

const Register = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [photoPreview, setPhotoPreview] = useState("");
    const [isEyeOpenRe, setIsEyeOpenRe] = useState(false);
    const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm()
    const { createUser, updateUserProfile, loading, setLoading } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const { fullName, email, password, photo } = data;
        const photoFile = photo[0]

        setLoading(true)

        const photoUrl = await ImageUpload(photoFile)

        // Register with email and password
        try {
            const result = await createUser(email, password)
            await updateUserProfile(fullName, photoUrl)
            await saveUser({ ...result?.user, displayName: fullName, photoURL: photoUrl })
            toast.success("Registration successfully ❤️")
            navigate('/')
            reset()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('User already exists!')
                navigate('/login')
                reset()
            } else {
                toast.error(error.code)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="w-11/12 md:w-10/12 mx-auto h-auto flex flex-col-reverse max-sm:mb-8 lg:flex-row my-0 lg:my-4">
                {/* Register Form */}
                <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1 dark:bg-dark-lite">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                        <h3 className="text-[1.8rem] font-[700] text-center">
                            Register
                        </h3>

                        <div>
                            {/* Full Name */}
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full  name"
                                className="inputField"
                                {...register("fullName", { required: 'Name is required', minLength: { value: 5, message: 'Name must be at least 5 characters long.' } })}
                            />
                            {errors.fullName && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.fullName.message} </p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="inputField"
                                {...register("email", { required: 'Email is required' })}
                            />
                            {errors.email && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.email.message} </p>}
                        </div>

                        {/* Password */}
                        <div className="w-full relative">
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="inputField"
                                {...register("password", {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                        message: 'Password must be 6+ chars with uppercase, lowercase, and a number.'
                                    }
                                })}
                            />

                            {errors.password && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.password.message} </p>}

                            {isEyeOpen ? (
                                <BsEyeSlash
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpen(false)}
                                />
                            ) : (
                                <BsEye
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpen(true)}
                                />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="w-full relative">
                            <input
                                type={isEyeOpenRe ? "text" : "password"}
                                name="password"
                                placeholder="Confirm Password"
                                className="inputField"
                                {...register("confirmPassword", {
                                    required: 'Confirm Password is required',
                                    validate: value => value === watch('password') || 'Passwords do not match'
                                })}
                            />

                            {errors.confirmPassword && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.confirmPassword.message} </p>}

                            {isEyeOpenRe ? (
                                <BsEyeSlash
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpenRe(false)}
                                />
                            ) : (
                                <BsEye
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpenRe(true)}
                                />
                            )}
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


                        {/* Register button */}
                        <div className="w-full flex items-center justify-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="inputButton disabled:cursor-not-allowed"
                            >
                                {
                                    loading ? <ImSpinner9 size={24} className="animate-spin m-auto" /> : 'Register'
                                }
                            </button>
                        </div>
                        <div className="flex items-center justify-center w-full gap-1">
                            <span className="text-[1rem] dark:text-gray-400 font-[500]">
                                Already have an account?{" "}
                            </span>
                            <span>
                                <Link to={"/login"} className="text-[1rem] font-[500]">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-full flex items-center justify-center gap-3">
                            <hr className="w-[45%] bg-gray-400 h-[2px]" />
                            <p>or</p>
                            <hr className="w-[45%] bg-gray-400 h-[2px]" />
                        </div>

                        <SocialBtn redirectUrl={"/"} />
                    </div>
                </div>

                {/* Lottie image */}
                <div className="flex-1">
                    <Lottie animationData={spaceRegister} />
                </div>
            </section>
        </>
    );
};

export default Register;