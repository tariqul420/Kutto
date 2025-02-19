import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            toast.success("Thank you for subscribing!");
            setEmail("");
        } else {
            toast.error("Please enter a valid email.");
        }
    };

    return (
        <section className="bg-gradient-to-r to-white dark:from-dark-lite px-6 rounded-xl shadow-lg max-w-3xl mx-auto text-center py-16 mb-16">
            <h2 className="text-3xl font-bold mb-3 ">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with the latest pet adoption news, tips, and stories!</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="relative w-full sm:w-auto">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:w-72 rounded-lg border focus:ring-2 focus:ring-blue-300 bg-transparent focus:outline-none"
                    />
                </div>
                <button type="submit" className="bg-color-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-color-accent/80 transition">Subscribe</button>
            </form>
        </section>
    );
};

export default Newsletter;
