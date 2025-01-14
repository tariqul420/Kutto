import AboutUs from "@/Components/Home/AboutUs/AboutUs";
import { Banner } from "@/Components/Home/Banner/Banner";
import CallToAction from "@/Components/Home/CallToAction/CallToAction";
import FAQ from "@/Components/Home/FAQ/FAQ";
import PetCategory from "@/Components/Home/PetCategory/PetCategory";
import Testimonials from "@/Components/Home/Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <PetCategory />
            <CallToAction />
            <AboutUs />
            <FAQ />
            <Testimonials />
        </div>
    );
};

export default Home;