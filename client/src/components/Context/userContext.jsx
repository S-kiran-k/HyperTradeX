/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const UserContext = createContext({
    userData: {}, // Will have the user data
    setUser: () => { }, // Set user data
});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    const setUser = (data) => {
        setUserData(data);
    };

    return (
        <UserContext.Provider value={{ userData, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;