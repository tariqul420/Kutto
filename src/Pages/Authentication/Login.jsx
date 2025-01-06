import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdError } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import spaceLogin from '../../assets/Lottie/space_login.json'
import Lottie from "lottie-react";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { socialAuth, setEmail, loginUser } = useAuth()

    const googleProvider = new GoogleAuthProvider();

    const onSubmit = async (data) => {
        const { email, password } = data

        // Login with email and password
        try {
            await loginUser(email, password)
            setEmail('')
            toast.success('Login Successfully')
            navigate(location?.state ? location?.state : '/')
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                toast.error('Invalid Email or Password')
            } else {
                toast.error(error.code)
            }
        }
    }

    return (
        <>
            <section className="w-10/12 mx-auto h-auto flex flex-col-reverse lg:flex-row my-0 lg:my-12">

                {/* Login Form */}
                <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                        <h3 className="text-[1.8rem] font-[700] text-center">
                            Login
                        </h3>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="inputField"
                                {...register("email", { required: 'Email is required', onChange: (e) => setEmail(e.target.value) })}
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
                                    required: 'Password is required'
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-[1rem] text-color-primary2 font-[500]">Remember Me</span>
                            </label>
                            <p onClick={() => navigate('/login/forgot-password')} className="text-[1rem] text-color-primary2 font-[500] cursor-pointer">
                                Forget password
                            </p>
                        </div>


                        <div className="w-full flex items-center justify-center">
                            <button
                                type="submit"
                                className="inputButton"
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex items-center justify-center w-full gap-1">
                            <span className="text-[1rem] dark:text-gray-400 font-[500]">
                                Don&apos;t have an account?{" "}
                            </span>
                            <span>
                                <Link to={"/register"} className="text-[1rem] font-[500]">
                                    Register
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
                        onClick={() => { socialAuth(googleProvider), navigate('/') }}
                        className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-medium"
                    >
                        <FcGoogle className="text-[2rem]" />
                        Sign In with Google
                    </button>
                </div>

                {/* Lottie image */}
                <div className="flex-1">
                    <Lottie animationData={spaceLogin} />
                </div>
            </section>
        </>
    );
};

export default Login;