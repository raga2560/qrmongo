import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthorizationContext = createContext({});

const initialState = window.localStorage.getItem("token");
function handleAuth({ data }) {
    try {
        let user = jwt_decode(data);
        if (!user) {
            return { auth: false, user: null };
        }
        return { auth: true, user };
    } catch (error) {
        return { auth: false, user: null };
    }
}

export default function AuthorizationProvider({ children }) {
    const [authorization, setAuthorization] = useState(
        handleAuth({ data: initialState })
    );

    function signIn({ token }) {
        window.localStorage.setItem("token", token);
        setAuthorization(handleAuth({ data: initialState }));
    }

    useEffect(() => {
        if (initialState) {
            setAuthorization(handleAuth({ data: initialState }));
        }
    }, []);

    return (
        <AuthorizationContext.Provider
            value={{ authorization, setAuthorization, signIn }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
}
