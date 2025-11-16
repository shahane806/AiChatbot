const express = require("express");
const fs = require("fs");
const Router = express.Router();
const {
  login,
  signup,
  forgetPassword,
  adminLogin,
} = require("../Controllers/auth");
const {
  uploadSingleFileController,
  uploadMultipleFilesController,
} = require("../Controllers/uploadFileController");
const multer = require("multer");
const AuthCheck = require("../Middlewere/AuthCheck");
const getFileController = require("../Controllers/getFileController");
const {
  getUserSignupCount,
  getAdminSignupCount,
} = require("../Controllers/getSignupCount");
const {
  chatbotCRUD_Controller,
} = require("../Controllers/chatbotCRUD_Controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./uploads/" + req?.headers?._id, { recursive: true }, () => {
      return cb(null, "./uploads/" + req?.headers?._id);
    });
  },
  filename: function (req, file, cb) {
    console.log(req?.headers);
    const lastmodified = req?.headers?.lastmodified;
    return cb(null, `${lastmodified}-${file.originalname}`);
  },
});
Router.get("/",(req,res)=>{res.send("THIS IS BACKEND OF THE AI LATE")})
const upload = multer({ storage });
Router.post(
  "/upload",
  AuthCheck,
  upload.single("file"),
  uploadSingleFileController
);
Router.post(
  "/upload/multiFiles",
  AuthCheck,
  upload.array("multiFiles", 10),
  uploadMultipleFilesController
);
Router.post("/auth/login", login);
Router.post("/Admin/Auth", adminLogin);
Router.post("/auth/signup", signup);
Router.post("/auth/forgetPassword", forgetPassword);
Router.get("/uploads/:uid/:filename", getFileController);
Router.get("/getUserSignupCount", AuthCheck, getUserSignupCount);
Router.get("/getAdminSignupCount", AuthCheck, getAdminSignupCount);
Router.get(
  "/Admin/Dashboard/Chatbot/viewAllChatbots",
  AuthCheck,
  chatbotCRUD_Controller
);
Router.post(
  "/Admin/Dashboard/Chatbot/addNewChatbot",
  AuthCheck,
  chatbotCRUD_Controller
);
Router.patch(
  "/Admin/Dashboard/Chatbot/updateChatbot/:id",
  AuthCheck,
  chatbotCRUD_Controller
);
Router.delete(
  "/Admin/Dashboard/Chatbot/deleteChatbot/:id",
  AuthCheck,
  chatbotCRUD_Controller
);

module.exports = Router;
