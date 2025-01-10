import useAuth from "../Hook/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children
    }

    return <Navigate state={{ from: location.pathname }} to='/login' replace />
};

PrivateRouter.propTypes = {
    children: PropTypes.object.isRequired
}

export default PrivateRouter;