import useAuth from "../Hook/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/Common/LoadingSpinner";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-w-screen flex items-center justify-center my-12">
                {/* <ScaleLoader
                    height={60}
                    margin={2}
                    width={5}
                    color="#3B82F6"
                /> */}
                <LoadingSpinner />
            </div>
        )
    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login' />
};

PrivateRouter.propTypes = {
    children: PropTypes.object.isRequired
}

export default PrivateRouter;