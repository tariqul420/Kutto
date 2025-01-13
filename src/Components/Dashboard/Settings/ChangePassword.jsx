import { useState } from "react";
import { useForm } from "react-hook-form";
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import useAuth from "../../../Hook/useAuth";

const ChangePassword = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const { currentPassword, newPassword } = data;

        setLoading(true);

        try {
            // Reauthenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update the password
            await updatePassword(user, newPassword);
            toast.success("Password updated successfully.");
            reset();
        } catch (error) {
            toast.error("Current Password Not Valid");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-8/12 mt-10 p-6 border rounded bg-white shadow dark:bg-dark-lite">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input
                        type="password"
                        className="inputField"
                        {...register("currentPassword", {
                            required: "Current password is required.",
                        })}
                    />
                    {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* New Password */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input
                            type="password"
                            className="inputField"
                            {...register("newPassword", {
                                required: "New password is required.",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long.",
                                },
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="inputField"
                            {...register("confirmPassword", {
                                required: "Please confirm your password.",
                                validate: (value) =>
                                    value === watch("newPassword") || "Passwords do not match.",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="inputButton w-full"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
