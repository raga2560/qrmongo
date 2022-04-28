const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/scan", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "scan.html"));
});

const io = new Server(server, {
    cors: {
        origin: "*",
        allowedHeaders: ["authorization"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    socket.on("/auth/from-login", (data) => {
        const { email, password } = data;
        if (password === "123") {
            const token = jwt.sign({ user: email }, "supersecuresecret");
            socket.emit("/auth/approved", { token });
        }
    });
    socket.on("/auth/qr-request", (data) => {
        // join a room in order to be able to recieve message when auth approve
        socket.join(data.id);
    });
    socket.on("/auth/qr-scan", (data) => {
        // the user that scan must the one who already login
        // he already has indentity from this auth token
        // so we can re-issue and new auth token for others
        const authorization = socket.request.headers.authorization;

        const decoded = jwt.verify(authorization, "supersecuresecret");

        const token = jwt.sign({ user: decoded.user }, "supersecuresecret");
        io.to(data.id).emit("/auth/approved", { token });
    });
});

server.listen(4000, "0.0.0.0", () => {
    console.log("listening on *:4000");
});
