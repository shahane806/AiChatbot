const express = require("express");
const env = require("dotenv");
env.config();
const cors = require("cors");
const http = require("http");
const app = express();
const socketIoClient = require("socket.io-client");
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
const socket = socketIoClient(process.env.SERVER_BASE_URL, {
  auth: {
    _id: process.env.AI_TOKEN,
  },
});

const AI_PORT = process.env.AI_PORT || 8003;
socket.on("connect", (socket) => {
  console.log("ai connected");
});
socket.emit("userOnline", "AI");

socket.on("disconnect", () => {
  console.log("ai disconnected");
});
socket.on("AI_MESSAGE_RESPONSE", async (props) => {
  try {
    const response = await fetch(
      `${process.env.DJANGO_SERVER_API}?query=${encodeURIComponent(
        props?.chat
      )}&name=${props?.chatBotName}`,
      {
        method: "GET",
      }
    );
    
  const contentType = response.headers.get("content-type");

let resData;
if (contentType.includes("application/json")) {
  resData = await response.json();
} else if (contentType.includes("text/html")) {
  resData = await response.text();
} else {
  resData = await response.text(); // fallback
}

socket.emit("MESSAGE_RESPONSE", {
  userId: {
    _id: props?._id,
  },
  chat: props?.chat,
  res: resData,
});

        // const data = await response.json();
    // Emit the response back to the socket with the received data
    // socket.emit("MESSAGE_RESPONSE", {
    //   userId: {
    //     _id: props?._id,
    //   },
    //   chat: props?.chat,
    //   res: data.prediction, // Assuming 'prediction' is the key in the Django JSON response
    // });
  } catch (error) {
    console.error("Error fetching from Django server:", error);

    // Emit an error response if the fetch fails
    socket.emit("MESSAGE_RESPONSE", {
      userId: {
        _id: props?._id,
      },
      chat: props?.chat,
      res: "Error occurred while fetching the response", // or any other error message
    });
  }
});
server.listen(AI_PORT, () => {
  console.log("AI IS RUNNING ON PORT 8003");
});
