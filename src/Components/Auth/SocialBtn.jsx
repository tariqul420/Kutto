import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../Hook/useAuth";

const SocialBtn = ({ redirectUrl }) => {
    const { socialAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const facebookProvider = new FacebookAuthProvider();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const successMessage = location.pathname === "/login" ? "Login successfully ❤️" : "Registration successfully ❤️";

    const handelFacebook = async () => {
        try {
            await socialAuth(facebookProvider)
                .then(() => {
                    toast.success(successMessage)
                    navigate(redirectUrl)
                }).catch(error => {
                    toast.error(error.code)
                })
        } catch (error) {
            toast.error(error.code)
        }
    };

    const handelGoogle = async () => {
        try {
            await socialAuth(googleProvider)
                .then(() => {
                    toast.success(successMessage)
                    navigate(redirectUrl)
                }).catch(error => {
                    toast.error(error.code)
                    console.log(error);
                })
        } catch (error) {
            toast.error(error.code)
            console.log(error);
        }
    };

    const handelGithub = async () => {
        try {
            await socialAuth(githubProvider)
            toast.success(successMessage)
            navigate(redirectUrl)
        } catch (error) {
            toast.error(error.code)
        }
    };

    return (
        <ul className="border-solid border-black text-3xl flex gap-8">
            <li
                onClick={handelFacebook}
                className="border cursor-pointer border-solid border-black dark:border-white p-1 rounded-full">
                <FaFacebook />
            </li>
            <li
                onClick={handelGoogle}
                className="border cursor-pointer border-solid border-black dark:border-white p-1 rounded-full">
                <FaGoogle />
            </li>
            <li
                onClick={handelGithub}
                className="border cursor-pointer border-solid border-black dark:border-white p-1 rounded-full">
                <FaGithub />
            </li>
        </ul>
    );
};

SocialBtn.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
};

export default SocialBtn;