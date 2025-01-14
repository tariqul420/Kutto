import AboutUs from "@/Components/Home/AboutUs/AboutUs";
import { Banner } from "@/Components/Home/Banner/Banner";
import CallToAction from "@/Components/Home/CallToAction/CallToAction";
import PetCategory from "@/Components/Home/PetCategory/PetCategory";

const Home = () => {
    return (
        <div>
            <Banner />
            <PetCategory />
            <CallToAction />
            <AboutUs />
        </div>
    );
};

export default Home;