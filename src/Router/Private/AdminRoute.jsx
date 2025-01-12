import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useRole from "../../Hook/useRole";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";


const AdminRoute = ({ children }) => {
    const [user, loading] = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) {
        return <LoadingSpinner />
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to={'/dashboard'} replace={true} />
};

AdminRoute.propTypes = {
    children: PropTypes.object,
}

export default AdminRoute;