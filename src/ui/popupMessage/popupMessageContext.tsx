'use client';
import { createContext, ReactNode, useState } from "react";

import { PopupMessageContextData, MessageData } from "@/lib/definitions";

const PopupMessageContext = createContext({} as PopupMessageContextData);

const PopupMessageProvider = ({ children }: { children: ReactNode }) => {
    const [messageData, setMessageData] = useState({
        isShown: false,
        text: 'Testing an extremly large message.',
        type: 'success',
        duration: 0
    } as MessageData);
    const contextVal = {
        messageData,
        setMessageData
    };
    return (
        <PopupMessageContext.Provider value={contextVal}>
            {children}
        </PopupMessageContext.Provider>
    );
}

export { PopupMessageContext, PopupMessageProvider };