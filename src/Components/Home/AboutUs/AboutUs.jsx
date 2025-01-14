const AboutUs = () => {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">
                    About Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Our Mission
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            At PetPal, we believe that every pet deserves a loving home. Our mission is to provide an easy and reliable platform where pet lovers can connect with animals in need of adoption. We aim to reduce the number of abandoned animals and promote responsible pet ownership. By facilitating the process of pet adoption, we hope to create a community where every pet finds its forever family.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Through our platform, we strive to offer pet adoption as a seamless, transparent, and enriching experience. Whether you’re adopting your first pet or adding a new member to your family, PetPal is here to guide you every step of the way.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Why We Created PetPal
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            PetPal was created with a simple goal in mind: to make pet adoption easier and more accessible for everyone. We understand that adopting a pet is a big decision, and it requires careful consideration. That’s why our platform connects pet seekers with animals that need a home, ensuring a transparent, straightforward adoption process.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We are driven by the desire to help animals in need and create a world where every pet is loved and cared for. By fostering a community of compassionate individuals, we can make a meaningful impact on the lives of pets and their new families.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
