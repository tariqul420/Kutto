import AboutUs from "@/Components/Home/AboutUs/AboutUs";
import { Banner } from "@/Components/Home/Banner/Banner";
import CallToAction from "@/Components/Home/CallToAction/CallToAction";
import FAQ from "@/Components/Home/FAQ/FAQ";
import Newsletter from "@/Components/Home/NewsLetter/NewsLetter";
import PetCategory from "@/Components/Home/PetCategory/PetCategory";
import RecentPets from "@/Components/Home/RecentPets/RecentPets";
import Testimonials from "@/Components/Home/Testimonials/Testimonials";
import { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        document.title = 'Kutto'
    }, []);

    return (
        <div>
            <Banner />
            <PetCategory />
            <CallToAction />
            <RecentPets />
            <AboutUs />
            <FAQ />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;