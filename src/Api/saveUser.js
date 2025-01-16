import axios from "axios";

const saveUser = async (user) => {
    await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/users`, {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
    })
};

export default saveUser;