import UserProfile from "@/Components/Dashboard/Profile/UserProfile";
import UpdatePet from "@/Components/Dashboard/User/UpdatePet/UpdatePet";
import UpdateDonationCampaign from "@/Components/MyDonationCamp/UpdateDonationCampaign";
import AboutUsPage from "@/Pages/AboutUs/AboutUsPage";
import Overview from "@/Pages/Dashboard/Common/Overview/Overview";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";
import PetCategories from "@/Pages/PetCategories/PetCategories";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllDonation from "../Pages/Dashboard/Admin/AllDonation/AllDonation";
import AllPets from "../Pages/Dashboard/Admin/AllPets/AllPets";
import AllUsers from "../Pages/Dashboard/Admin/Users/AllUsers";
import Dashboard from "../Pages/Dashboard/Common/Dashboard/Dashboard";
import Settings from "../Pages/Dashboard/Common/Settings/Settings";
import AddPet from "../Pages/Dashboard/User/AddPet/AddPet";
import AdoptionRequest from "../Pages/Dashboard/User/AdoptionReq/AdoptionRequest";
import CreateDonationCampaign from "../Pages/Dashboard/User/CreateDonateCamp/CreateDonationCampaign";
import MyAddedPets from "../Pages/Dashboard/User/MyAddedPets/MyAddedPets";
import MyDonationCampaign from "../Pages/Dashboard/User/MyDonateCamp/MyDonationCampaign";
import MyDonations from "../Pages/Dashboard/User/MyDonations/MyDonations";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import Error404 from "../Pages/Error/Error404";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import AdminRoute from "./Private/AdminRoute";
import PrivateRoute from "./Private/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/login/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/pet-listing',
                element: <PetListing />
            },
            {
                path: '/about-us',
                element: <AboutUsPage />
            },
            {
                path: 'pets/:category',
                element: <PetCategories />
            },
            {
                path: '/donation-campaigns',
                element: <DonationCampaigns />
            },
            {
                path: '/pet-details/:id',
                element: <PetDetails />
            },
            {
                path: '/donation-details/:id',
                element: <DonationDetails />
            },
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: 'settings',
                        element: <Settings />
                    },
                    {
                        path: 'profile',
                        element: <UserProfile />
                    },
                    {
                        path: 'overview',
                        element: <Overview />
                    },
                    {
                        path: 'add-pet',
                        element: <AddPet />
                    },
                    {
                        path: 'my-added-pets',
                        element: <MyAddedPets />
                    },
                    {
                        path: '/dashboard/adoption-request',
                        element: <AdoptionRequest />
                    },
                    {
                        path: '/dashboard/create-donation',
                        element: <CreateDonationCampaign />
                    },
                    {
                        path: '/dashboard/my-donation-campaign',
                        element: <MyDonationCampaign />
                    },
                    {
                        path: 'update-donation-campaign/:id',
                        element: <UpdateDonationCampaign />
                    },
                    {
                        path: '/dashboard/my-donate',
                        element: <MyDonations />
                    },

                    {
                        path: 'update-pet/:id',
                        element: <UpdatePet />
                    },
                    {
                        path: '/dashboard/all-users',
                        element: (
                            <AdminRoute>
                                <AllUsers />
                            </AdminRoute>
                        )
                    },
                    {
                        path: '/dashboard/all-pets',
                        element: (
                            <AdminRoute>
                                <AllPets />
                            </AdminRoute>
                        )
                    },
                    {
                        path: '/dashboard/all-donations',
                        element: (
                            <AdminRoute>
                                <AllDonation />
                            </AdminRoute>
                        )
                    },
                ]
            }
        ]
    }
])

export default router