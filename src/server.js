const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require("socket.io");
const app = express();
require('dotenv').config()
const router = require('./routes/index.routes')
const PORT = process.env.PORT
const linkMongoCluster = process.env.MONGO_URL_CLUSTER

app.use(cors())
app.use(express.json())

app.use('/v1',router)

console.log('====================================');
console.log(linkMongoCluster);
console.log('====================================');

mongoose.connect(
    linkMongoCluster,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log('====================================');
        console.log('Connected to db sucessfull');
        console.log('====================================');
        const server = app.listen(
            PORT,
            () => {
                console.log('====================================');
                console.log(`Server started on port: ${PORT}`);
                console.log('====================================');
            }
        )

        const io = socket(server, {
            cors: {
                origin: "*",
                credentials: true,
            },
        });

        global.onlineUsers = new Map();

        io.on("connection", (socket) => {
            global.chatSocket = socket;
            socket.on("add-user", (userId) => {
                onlineUsers.set(userId,socket.id)   
            })
            socket.on("send-msg", (data) => {
                console.log('====================================');
                console.log(data);
                console.log('====================================');
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-recieve", data.message);
                }
            });
        })


    })
    .catch ((error) => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    })

