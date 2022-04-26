import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as id } from "uuid";

export const SocketContext = createContext({});

const initialState = io("http://10.1.2.16:4000", {
    extraHeaders: {
        authorization: window.localStorage.getItem("token") || "",
    },
});

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(initialState);

    useEffect(() => {
        if (socket) {
            socket.on("connect", (socket) => {
                console.log("conntect");
            });
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
