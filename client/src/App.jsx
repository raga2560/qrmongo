import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Scan from "./pages/Scan";

import AuthorizationProvider from "./contexts/Authorization";
import SocketProvider from "./contexts/Socket";

function App() {
    return (
        <BrowserRouter>
            <SocketProvider>
                <AuthorizationProvider>
                    <Routes>
                        <Route path="/" element={<Protected />}>
                            <Route index element={<Home />} />
                            <Route path="/scan" element={<Scan />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthorizationProvider>
            </SocketProvider>
        </BrowserRouter>
    );
}

export default App;
