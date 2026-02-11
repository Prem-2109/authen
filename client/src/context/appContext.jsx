import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ VERY IMPORTANT

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/auth/is-auth"
            );

            if (data.success) {
                setLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Auth check failed"
            );
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/user/data"
            );

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch user data"
            );
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setLoggedIn,
        userData,
        setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
