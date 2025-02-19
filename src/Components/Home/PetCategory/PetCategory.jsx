import { FaFishFins } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { PiDogFill, PiRabbitFill } from "react-icons/pi";
import { GiEgyptianBird, GiGoat, GiParrotHead, GiSeatedMouse, GiTropicalFish, GiTurtle } from "react-icons/gi";
import { Link } from "react-router-dom";

const PetCategory = () => {
    const petCategories = [
        { slug: "dog", name: "Dog", icon: <PiDogFill /> },
        { slug: "cat", name: "Cat", icon: <MdOutlinePets /> },
        { slug: "rabbit", name: "Rabbit", icon: <PiRabbitFill /> },
        { slug: "fish", name: "Fish", icon: <FaFishFins /> },
        { slug: "parrot", name: "Parrot", icon: <GiParrotHead /> },
        { slug: "turtle", name: "Turtle", icon: <GiTurtle /> },
        { slug: "bird", name: "Bird", icon: <GiEgyptianBird /> },
        { slug: "gold fish", name: "Gold Fish", icon: <GiTropicalFish /> },
        { slug: "mouse", name: "Mouse", icon: <GiSeatedMouse /> },
        { slug: "goat", name: "Goat", icon: <GiGoat /> },
    ];

    return (
        <div className="w-full py-16">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Pet Categories</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {petCategories.map((category) => (
                    <Link
                        to={`/pets/${category.slug}`}
                        key={category.slug}
                        className="w-56 h-56 bg-gray-200 dark:bg-dark-lite rounded-lg flex flex-col items-center justify-center p-4 transition-all hover:scale-105"
                    >
                        <div className="text-4xl text-gray-600 dark:text-gray-300 mb-4">
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{category.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PetCategory;