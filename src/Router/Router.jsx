import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Home from "../Pages/Home/Home";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import Error404 from "../Pages/Error/Error404";
import PrivateRoute from "./Private/PrivateRoute";
import Settings from "../Pages/Dashboard/Common/Settings/Settings";
import Dashboard from "../Pages/Dashboard/Common/Dashboard/Dashboard";
import AddPet from "../Pages/Dashboard/User/AddPet/AddPet";
import MyAddedPets from "../Pages/Dashboard/User/MyAddedPets/MyAddedPets";
import AdoptionRequest from "../Pages/Dashboard/User/AdoptionReq/AdoptionRequest";
import CreateDonationCampaign from "../Pages/Dashboard/User/CreateDonateCamp/CreateDonationCampaign";
import MyDonationCampaign from "../Pages/Dashboard/User/MyDonateCamp/MyDonationCampaign";
import MyDonations from "../Pages/Dashboard/User/MyDonations/MyDonations";
import AllUsers from "../Pages/Dashboard/Admin/Users/AllUsers";
import AllPets from "../Pages/Dashboard/Admin/AllPets/AllPets";
import AllDonation from "../Pages/Dashboard/Admin/AllDonation/AllDonation";
import AdminRoute from "./Private/AdminRoute";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import UpdatePet from "@/Components/Dashboard/User/UpdatePet/UpdatePet";
import UpdateDonationCampaign from "@/Components/MyDonationCamp/UpdateDonationCampaign";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";
import PetCategories from "@/Pages/PetCategories/PetCategories";

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
                        path: 'setting',
                        element: <Settings />
                    },
                    {
                        path: 'add-pet',
                        element: <AddPet />
                    },
                    {
                        path: 'my-add-pets',
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
                        path: '/dashboard/my-donations',
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
                        path: '/dashboard/all-donation',
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