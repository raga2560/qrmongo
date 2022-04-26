import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthorizationContext } from "../contexts/Authorization";

export default function Protected() {
    const { authorization } = useContext(AuthorizationContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorization.auth) {
            navigate("/login", { replace: true });
        }
    }, [authorization, navigate]);

    return (
        <div>
            <Outlet />
        </div>
    );
}
