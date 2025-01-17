import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import useTheme from "@/Hook/useTheme";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ donationId, donationName, donationImage, refetch, maxAmount, totalDonateAmount, setIsModalOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { theme } = useTheme()
    const { user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe is not loaded. Please try again.");
            return;
        }

        const remainingAmount = maxAmount - totalDonateAmount;
        if (remainingAmount < amount) {
            toast.error(`You can only donate up to $${remainingAmount}.`);
            return;
        }

        const donationAmount = parseFloat(amount);

        if (!donationAmount || donationAmount < 0) {
            toast.error("Please enter a valid donation amount.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        setLoading(true);

        try {
            const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
                amount: donationAmount,
            });

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            await axiosSecure.post("/save-payment-history", {
                donationId,
                donationName,
                donationImage,
                name: user?.displayName,
                email: user?.email,
                amount: donationAmount,
                paymentId: paymentIntent.id,
            });

            toast.success("Payment successful!");
            refetch();
            setIsModalOpen(false)
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-b border-gray-500 p-2 text-black dark:text-white mb-5 bg-transparent focus:outline-none"
                    placeholder="Donate Amount"
                />

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: theme === 'dark' ? '#fff' : '#000',
                                "::placeholder": {
                                    color: theme === 'dark' ? '#fff' : '#6b7280',
                                },
                            },
                            invalid: {
                                color: "#FF0000",
                            },
                        },
                    }}
                />

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`bg-color-accent w-full  text-white font-medium px-6 py-2 rounded-md mt-6 ${loading && "opacity-50 cursor-not-allowed"}`}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    donationId: PropTypes.string.isRequired,
    donationName: PropTypes.string.isRequired,
    donationImage: PropTypes.string.isRequired,
    maxAmount: PropTypes.string.isRequired,
    totalDonateAmount: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};

export default CheckoutForm;