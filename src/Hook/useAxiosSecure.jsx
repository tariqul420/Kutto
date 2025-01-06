import axios from "axios";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.interceptors.response.use((res) => {
            return res;
        }, async (err) => {
            if (err.status === 401 || err.status === 403) {
                try {
                    await logOutUser();
                    navigate('/login')
                } catch (error) {
                    toast.error(error.message);
                }
            }

            return Promise.reject(err);
        })
    }, [logOutUser, navigate]);

    return axiosInstance;
};

export default useAxiosSecure;