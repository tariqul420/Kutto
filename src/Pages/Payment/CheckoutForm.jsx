import useAxiosSecure from "@/Hook/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ donationId, donationName, donationImage, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    console.log(amount);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe is not loaded. Please try again.");
            return;
        }

        const donationAmount = parseFloat(amount);
        if (!donationAmount || donationAmount < 0) {
            toast.error("Please enter a valid donation amount.");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create Payment Intent
            const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
                amount: donationAmount,
            });

            // Step 2: Confirm Payment
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            // Step 3: Save payment history
            await axiosSecure.post("/save-payment-history", {
                donationId,
                donationName,
                donationImage,
                userEmail: "user@example.com",
                amount: donationAmount,
                paymentId: paymentIntent.id,
            });

            toast.success("Payment successful!");
            refetch();
        } catch (error) {
            toast.error(error.code);
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
                    className="border-b border-gray-500 p-2 text-gray-600 mb-5 focus:outline-none" placeholder="Donate Amount" />
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />

                <button
                    type="submit"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!stripe || loading}
                    className={`bg-color-accent text-white font-medium px-6 py-2 rounded-md mt-4 ${loading && "opacity-50 cursor-not-allowed"}`}
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
    refetch: PropTypes.func.isRequired,
};

export default CheckoutForm;