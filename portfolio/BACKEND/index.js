const express = require("express");
const cors = require("cors");
const env = require("dotenv");
env.config();

const Router = require("./Router/router");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8001;
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatModel = require("./Models/chatModel");
const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME;
const fileUpload = require("express-fileupload");
const SocketAuthCheck = require("./Middlewere/SocketAuthCheck");

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);
app.use(fileUpload());
app.use(
  express.urlencoded({
    extended: false,
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_BASE_URL,
      process.env.SERVER_BASE_URL,
      process.env.AI_BASE_URL,
    ],
    credentials: true,
  },
});
mongoose.connect(MONGODB_URL + DB_NAME).then(() => {
  console.log("MONGO");
});
// To store the list of connected users
let onlineUsers = {};
let username = "";

io.use(SocketAuthCheck);
io.on("connection", async (socket) => {
  socket.emit("CONNECTED", socket.id);
  let e = await io
    .in("ROOM")
    .fetchSockets()
    .then((e) => {
      return e;
    });
  io.emit("onlineUsersCount", e.length);
  console.log("user Connected " + socket.id);
  // When a new user connects, you can add their information
  // For example, you might receive their username upon connection
  socket.on("userOnline", async (un) => {
    onlineUsers[un] = socket.id;
    console.log(onlineUsers);
    socket.join(["ROOM"]);
    let e = await io
      .in("ROOM")
      .fetchSockets()
      .then((e) => {
        return e;
      });
    io.emit("onlineUsers", onlineUsers); // Send updated user list to all clients
    io.emit("onlineUsersCount", e.length);
    username = un;
  });
  io.on("onlineUsers", (e) => {
    console.log(e);
  });
  socket.addListener("Disconnection", async () => {
    socket.disconnect(true);
    delete onlineUsers[username];
    io.emit("onlineUsers", onlineUsers); // Send updated user list to all clients
    let e = await io
      .in("ROOM")
      .fetchSockets()
      .then((e) => {
        return e;
      });
    io.emit("onlineUsersCount", e.length);
    console.log(onlineUsers);
    console.log("user Disconnected " + socket.id);
  });

  socket.addListener("NEW_MESSAGE", (props) => {
    const _id = props?.userId?._id;
    const chat = props?.chat;
    const chatBotName = props?.chatBotName;
    console.log(props?.userId, props?.chat,props?.chatBotName);
    socket.to("ROOM").emit("AI_MESSAGE_RESPONSE", { _id, chat,chatBotName});
  });

  socket.addListener("MESSAGE_RESPONSE", ({ userId, chat, res  }) => {
    if(res?.prediction != null){
      res = res?.prediction;
    }

    res && socket.to("ROOM").emit("MESSAGE_RESPONSE_CLIENT", { res , userId });
    res?.prediction && socket.to("ROOM").emit("MESSAGE_RESPONSE_CLIENT", { res , userId });
    // console.log(userId,chat,res)
    new chatModel({
      userId: {
        _id: userId?._id,
      },
      chat: chat,
      response: res?.prediction,
    }).save();
  });
});

app.listen(8001, () => {
  console.log("App is listning on port " + 8001);
});
server.listen(PORT, () => {
  console.log("SOCKET_SERVER is listning on port " + PORT);
});
