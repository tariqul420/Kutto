import PetAdoptionProcess from "@/Components/AboutUs/PetAdoptionProcess";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
    const navigate = useNavigate()

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
            <p className="text-lg mb-6 text-justify">
                Welcome to <span className="font-semibold text-color-accent">Kutto</span> – your trusted companion in the journey of pet adoption. At Kutto, we understand the deep connection between humans and animals, and our mission is to help you find the perfect furry friend to add to your family.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p className="text-lg text-justify">
                        Kutto was born from a passion for animals and the belief that every pet deserves a loving home. We are a group of animal lovers and dedicated individuals who want to make the pet adoption process seamless and joyful for both adopters and pets alike.
                    </p>
                </div>
                <div>
                    <img src="https://images.pexels.com/photos/5951633/pexels-photo-5951633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Our Story" className="rounded-lg shadow-lg w-full h-[210px] object-cover" />
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
            <p className="text-lg mb-6 text-justify">
                We connect pet lovers with shelter animals in need of a forever home. Our platform provides an easy-to-use experience, featuring detailed profiles, adoption tips, and resources for new pet owners. Whether you&apos;re looking for a playful puppy, a loyal dog, or a cuddly cat, Kutto makes it easier than ever to find your new best friend.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-lg  mb-6 text-justify">
                Our goal is to promote responsible pet adoption and raise awareness about the importance of adopting over buying. Through our platform, we aim to reduce the number of homeless animals and create a supportive community for pet owners.
            </p>

            {/* pet adoption process */}
            <h2 className="text-2xl font-semibold mb-4 text-center">Pet Adoption Process</h2>
            <PetAdoptionProcess />

            <div className="flex flex-col sm:flex-row justify-between gap-8 mb-12">
                <div className="flex-1 text-justify">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-lg ">
                        <li><strong className="font-semibold">Comprehensive Listings:</strong> Browse through a wide variety of pets from various shelters.</li>
                        <li><strong className="font-semibold">Easy Adoption Process:</strong> Step-by-step guidance to help you adopt your pet with ease.</li>
                        <li><strong className="font-semibold">Educational Resources:</strong> Learn how to care for your new furry friend with our expert tips and advice.</li>
                        <li><strong className="font-semibold">Supportive Community:</strong> Connect with other pet lovers and share your experiences.</li>
                    </ul>
                </div>

                <div className="flex-1 text-justify">
                    <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
                    <p className="text-lg  mb-6">
                        Join us in our mission to provide loving homes for all pets. We are constantly looking to grow our community, raise awareness, and support our local shelters. Every adoption saves lives – together, we can make a difference!
                    </p>
                    <button
                        onClick={() => navigate(`/pet-listing`)} className="px-6 py-3 text-white font-semibold rounded-lg bg-color-accent transition duration-300">
                        Adopt Now
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="text-lg ">
                    Thank you for being part of our mission! Whether you&apos;re adopting or supporting, we appreciate your love for animals.
                </p>
            </div>
        </div>
    );
};

export default AboutUsPage;
