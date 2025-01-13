import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init";
import PropTypes from "prop-types";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("")
    console.log('Current User ==>', user);

    const socialAuth = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photoUrl) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser && currentUser?.email) {
                //save user in mongodb
                await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/users`, {
                    name: currentUser?.displayName,
                    image: currentUser?.photoURL,
                    email: currentUser?.email,
                })

                const userInformation = { email: currentUser?.email }
                await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/jwt`, userInformation, { withCredentials: true })
                setLoading(false)
            } else {
                await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/logout`, { withCredentials: true })
                setLoading(false)
            }

            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, []);

    const authInfo = {
        socialAuth,
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logOutUser,
        updateUserProfile,
        resetPassword,
        email,
        setEmail
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );


};

AuthProvider.propTypes = {
    children: PropTypes.array.isRequired
}

export default AuthProvider;