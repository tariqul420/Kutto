import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user.email}`);
            return res?.data?.role;
        }
    })

    return [role, isLoading]
};

export default useRole;