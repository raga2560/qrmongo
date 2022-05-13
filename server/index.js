const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const path = require("path");
var bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ramesh:IndiatoLove@cluster0.begbs.mongodb.net/studentdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



//app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
//app.use(bodyParser.json()); // Send JSON responses


/*
 *
 *
 *

client.connect(err => {
  const collection = client.db("studentdb").collection("userrecord");
  // perform actions on the collection object
        //
        var dbo = client.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
//    client.close();
  });
*/

app.use(express.json({extended: false}));

app.use(express.static("public"));

app.post("/logoutstatus", (req, res) => {
    console.log("called " + JSON.stringify(req.body));
     res.status(200).json(0);;
});

app.post("/loginstatus", (req, res) => {
    console.log("called " + JSON.stringify(req.body));
     res.status(200).json(0);;
});

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
	 console.log("qr-request "+ JSON.stringify(data));
        socket.join(data.id);
    });

    socket.on("/auth/qr-scan", (data) => {
        // the user that scan must the one who already login
        // he already has indentity from this auth token
        // so we can re-issue and new auth token for others
 //       const authorization = socket.request.headers.authorization;
                 io.to(data.id).emit("/auth/approved",  data);
/*
//        const decoded = jwt.verify(authorization, "supersecuresecret");
        client.connect(err => {
        var  collection = client.db("studentdb").collection("userrecord");
	var query = {
                   email: data.email
		 }
        dbo.findOne(query, function(err, res) {

		if(res.status =='granted'){
	         console.log("qr-scan "+ JSON.stringify(data));
                 var token = jwt.sign({ user: data.id }, "supersecuresecret");
                 io.to(data.id).emit("/auth/approved",  data);
		}else {
               
                 io.to(data.id).emit("/auth/notapproved",  data);
		}
        });

    });
		*/
});
});

server.listen(4000, "0.0.0.0", () => {
    console.log("listening on *:4000");
});

