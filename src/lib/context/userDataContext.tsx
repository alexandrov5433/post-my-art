'use client';

import { useState, createContext, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { UserData, UserDataContextData } from "../definitions";
import { getUserIDFromSessionCookie } from "../actions/session";
import { fetchUserData } from "../actions/data";

const UserDataContext = createContext({} as UserDataContextData);

const UserDataContextProvider = ({ children }: { children: ReactNode }) => {

    const [userData, setUserData] = useState(null);
    const [userDataRefreshTrigger, setTriggerUserDataRefresh] = useState(false);
    const contextVal = {
        userData,
        userDataRefreshTrigger,
        setTriggerUserDataRefresh
    };
    useEffect(() => {
        const userDataFetcher = async () => {
            const userID = await getUserIDFromSessionCookie();
            if (!userID) {
                return setUserData(null);
            }
            const userData = await fetchUserData(userID);
            if (!userData) {
                return setUserData(null);
            }
            setUserData(userData as any);
        }
        userDataFetcher();
        
    }, [userDataRefreshTrigger]);
    return (
        <UserDataContext.Provider value={contextVal}>
            {children}
        </UserDataContext.Provider>
    );
};

export {
    UserDataContext,
    UserDataContextProvider
};