import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const [user, loading] = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to='/login' />
};

AdminRoute.propTypes = {
    children: PropTypes.object,
}

export default AdminRoute;