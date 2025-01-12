import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Home from "../Pages/Home/Home";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import Error404 from "../Pages/Error/Error404";
import UpdateProfile from "../Pages/Authentication/UpdateProfile";
import PrivateRoute from "./Private/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Common/Dashboard";

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
                path: '/update-profile',
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                )
            },
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                )
            }
        ]
    }
])

export default router