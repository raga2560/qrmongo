import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { get } from "lodash";
import { SocketContext } from "../contexts/Socket";

export default function Scan() {
    const { socket } = useContext(SocketContext);

    const [data, setData] = useState("");
    const navigate = useNavigate();

    function handleJson(result) {
        let valid = false;
        try {
            let json = JSON.parse(result);
            console.log(json);
            valid = true;
        } catch (e) {}

        return valid && setData(JSON.parse(result?.text));
    }

    function handleRPC() {
        let id = get(data, "id", null);
        if (id) {
            socket.emit("/auth/qr-scan", { id });
        }
    }

    useEffect(() => {
        if (data !== "") {
            handleRPC();
        }
    }, [data]);

    return (
        <div className="w-full h-screen bg-base-100 flex place-content-center place-items-center">
            <div className="w-full h-full flex place-content-center place-items-center">
                <div className="scanbox w-[350px] h-[350px] overflow-hidden flex place-content-center place-items-center ">
                    <QrReader
                        constraints={{ facingMode: "environment" }}
                        ViewFinder={ViewFinder}
                        onResult={(result, error) => {
                            if (!!result) {
                                handleJson(result);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        className=" w-[500px] scale-[140%]"
                    />
                </div>
            </div>
        </div>
    );
}

const ViewFinder = () => (
    <>
        <svg
            width="50px"
            viewBox="0 0 100 100"
            style={{
                top: 0,
                left: 0,
                zIndex: 1,
                boxSizing: "border-box",
                border: "50px solid rgba(0, 0, 255, 0.5)",
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
        >
            <path
                fill="none"
                d="M13,0 L0,0 L0,13"
                stroke="rgba(0, 0, 255, 0.7)"
                strokeWidth="4"
            />
            <path
                fill="none"
                d="M0,87 L0,100 L13,100"
                stroke="rgba(0, 0, 255, 0.7)"
                strokeWidth="4"
            />
            <path
                fill="none"
                d="M87,100 L100,100 L100,87"
                stroke="rgba(0, 0, 255, 0.7)"
                strokeWidth="4"
            />
            <path
                fill="none"
                d="M100,13 L100,0 87,0"
                stroke="rgba(0, 0, 255, 0.7)"
                strokeWidth="4"
            />
        </svg>
    </>
);
