import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdCloudUpload, MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import spaceRegister from '../../assets/Lottie/space_register.json'
import toast from "react-hot-toast";
import ImageUpload from "../../Api/ImageUpload";

const Register = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isEyeOpenRe, setIsEyeOpenRe] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const { socialAuth, createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()

    const googleProvider = new GoogleAuthProvider();

    const onSubmit = async (data) => {
        const { fullName, email, password, photo } = data;
        const photoFile = photo[0]

        const photoUrl = await ImageUpload(photoFile)

        // Register with email and password
        try {
            await createUser(email, password)
            await updateUserProfile(fullName, photoUrl)
            toast.success('Register Successfully.')
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
        }
    }

    return (
        <>
            <section className="w-11/12 md:w-10/12 mx-auto h-auto flex flex-col-reverse lg:flex-row my-0 lg:my-12">
                {/* Register Form */}
                <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1">
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

                        <div>
                            {/* Photo */}
                            <label
                                htmlFor="photo"
                                className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-color-accent transition-all"
                            >
                                <span className="text-gray-500 flex items-center gap-2">
                                    <MdCloudUpload className="text-xl" /> Upload Photo
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    {...register("photo", { required: 'Photo is required.' })}
                                />
                            </label>
                            {errors.photo && (
                                <p className="flex text-red-500 gap-1 items-center mt-1">
                                    <MdError /> {errors.photo.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <button
                                type="submit"
                                className="inputButton"
                            >
                                Register
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

                    <div className="w-full my-1 flex items-center justify-center gap-3">
                        <hr className="w-[45%] bg-gray-400 h-[2px]" />
                        <p>or</p>
                        <hr className="w-[45%] bg-gray-400 h-[2px]" />
                    </div>

                    <button
                        onClick={() => socialAuth(googleProvider)}
                        className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-medium"
                    >
                        <FcGoogle className="text-[2rem]" />
                        Sign Up with Google
                    </button>
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