import React, { useContext } from "react";
import { AuthorizationContext } from "../contexts/Authorization";
export default function Home() {
    const { authorization } = useContext(AuthorizationContext);

    return (
        <div className="w-full h-screen bg-base-100 flex place-content-center place-items-center">
            <div className="card w-96 h-96 bg-base-200">
                <pre>{JSON.stringify(authorization, null, 4)}</pre>
            </div>
        </div>
    );
}
