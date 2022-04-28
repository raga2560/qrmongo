import React, { useState, useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { v4 as id } from "uuid";
import { SocketContext } from "../contexts/Socket";
import { AuthorizationContext } from "../contexts/Authorization";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { socket } = useContext(SocketContext);
    const { signIn } = useContext(AuthorizationContext);
    const [tab, setTab] = useState(1);
    const [QrID, setQrID] = useState({ id: "" });
    const [approved, setApproved] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("/auth/from-login", { ...form });
    }

    useEffect(() => {
        if (QrID.id === "") {
            setQrID({ id: id() });
        }
    }, []);

    useEffect(() => {
        if (QRCode.id !== "") {
            socket.emit("/auth/qr-request", QrID);
        }
    }, [socket, QrID]);

    useEffect(() => {
        socket.on("/auth/approved", (data) => {
            signIn(data);
            setTimeout(() => {
                window.location.replace("/");
            }, 100);
        });
    }, [socket]);

    return (
        <div className="w-full h-screen bg-base-100 flex place-content-center place-items-center">
            <div className="card w-96 h-96 bg-base-200">
                <div className="w-full flex tabs tabs-boxed px-8 py-4">
                    <label
                        htmlFor=""
                        className={
                            tab === 1
                                ? "tab flex-grow tab-active"
                                : "tab flex-grow"
                        }
                        onClick={() => setTab(1)}
                    >
                        Form
                    </label>
                    <label
                        htmlFor=""
                        className={
                            tab === 2
                                ? "tab flex-grow tab-active"
                                : "tab flex-grow"
                        }
                        onClick={() => setTab(2)}
                    >
                        QR Login
                    </label>
                </div>
                {tab === 1 && (
                    <div className="w-full card-body ">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6 place-items-center place-content-center"
                        >
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className=" input input-bordered input-primary w-full"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="input input-bordered input-primary w-full"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <input
                                type="submit"
                                value="SIGN IN"
                                className="input input-bordered input-primary w-full bg-primary text-primary-content"
                            />
                        </form>
                    </div>
                )}
                {tab === 2 && (
                    <div className="w-full card-body flex place-content-center place-items-center">
                        <QRCode value={JSON.stringify(QrID)} />
                        {approved && JSON.stringify(approved)}
                    </div>
                )}
            </div>
        </div>
    );
}
