import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BillingAddress = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Billing Address Submitted: ", data);
        toast.success("Billing address saved successfully!");
        reset();
    };

    return (
        <div className="w-full mt-10 p-6 bg-white border rounded shadow dark:bg-dark-lite">
            <h2 className="text-2xl font-bold mb-6">Billing Address</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex-1">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="inputField"
                            {...register("fullName", {
                                required: "Full name is required.",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters long.",
                                },
                            })}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Company Name (Optional) */}
                    <div className="flex-1">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Company Name (Optional)</label>
                        <input
                            type="text"
                            className="inputField"
                            {...register("companyName")}
                        />
                    </div>
                </div>

                {/* Street Address */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                    <input
                        type="text"
                        className="inputField"
                        {...register("street", {
                            required: "Street address is required.",
                        })}
                    />
                    {errors.street && (
                        <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* City */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">City</label>
                        <input
                            type="text"
                            className="inputField"
                            {...register("city", {
                                required: "City is required.",
                            })}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">State</label>
                        <input
                            type="text"
                            className="inputField"
                            {...register("state", {
                                required: "State is required.",
                            })}
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                        <input
                            type="text"
                            className="inputField"
                            {...register("postalCode", {
                                required: "Postal code is required.",
                                pattern: {
                                    value: /^[0-9]{5}$/,
                                    message: "Postal code must be a 5-digit number.",
                                },
                            })}
                        />
                        {errors.postalCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Country</label>
                    <select
                        className="inputField"
                        {...register("country", {
                            required: "Country is required.",
                        })}
                    >
                        <option value="">Select Country</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="India">India</option>
                    </select>
                    {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="inputButton"
                >
                    Save Billing Address
                </button>
            </form>
        </div>
    );
};

export default BillingAddress;
