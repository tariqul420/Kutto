import Lottie from "lottie-react";
import useAuth from "../../Hook/useAuth";
import forgotPassword from '../../assets/Lottie/forgot_password.json'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { email, setEmail, resetPassword } = useAuth()

    const handelSendEmail = async (e) => {
        e.preventDefault()
        const email = e.target.email.value

        // Reset Password
        try {
            await resetPassword(email)
            toast.success('Reset password link sent to your email')
            setEmail('')
            navigate('/login')
        } catch (error) {
            toast.error(error.code)
        }
    }

    return (
        <section className="w-10/12 mx-auto h-auto flex items-center my-12 justify-center gap-12">
            <div className="w-full sm:w-[40%] rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md flex-1 dark:bg-dark-lite">

                {/* Forgot Password Form */}
                <form onSubmit={handelSendEmail} className="w-full flex flex-col gap-5">
                    <h3 className="text-[1.8rem] font-[700] text-center">
                        Forget password
                    </h3>

                    <input
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={email ? email : ''}
                        placeholder="Email"
                        className="inputField"
                    />

                    <button
                        type="submit"
                        className="inputButton">
                        Reset Password
                    </button>
                </form>
            </div>
            <div className="flex-1">
                <Lottie animationData={forgotPassword} />
            </div>
        </section>
    );
};

export default ForgotPassword;
