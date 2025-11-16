import React, { useEffect, useState } from "react";
import "./style.css";
import { TfiClip } from "react-icons/tfi";
import { CiFaceSmile } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  send_message,
  sendAttachment,
  set_prompt,
  show_emoji_pannel,
} from "../../State/action-creators";
import { LuCopyright } from "react-icons/lu";
import SuggestionPannel from "../SuggestionPannel/SuggestionPannel";
import InputPrompt from "../InputPrompt/InputPrompt";
import FooterMic from "../FooterMic/FooterMic";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../API/api";
import { GetSocket } from "../SocketIo/socket";
const Footer = () => {
  const dispatch = useDispatch();
  const { register } = useForm();
  const user = useSelector((state) => {
    return state?.firebase_user_reducer;
  });
  const user2 = useSelector((state) => {
    return state?.auth_reducer;
  });
  const socket = GetSocket();
  const handleSubmit = async (e) => {
    let _id = user?.user?.uid || user2?.user?._id;
    let authToken =
      user?.user?.stsTokenManager?.accessToken || user2?.authToken;
    console.log(user, user2);
    const file = e.target.files[0];
    console.log("Selected file:", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", _id);
    formData.append("lastModified",file.lastModified)
    formData.append("authToken", authToken);
    console.log("Selected file:", file);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value.name}`);
    }
    socket.emit("NEW_MESSAGE", {
      userId: {
        _id: _id,
      },
      chat:
        process.env.REACT_APP_REST_API_BASE_URL +
        "/uploads/" +
        _id +
        "/" +
        file.lastModified+"-"+file.name,
        chatBotName:"DigitRecog"
    });
    uploadFile(formData).then((res) => {
      return send_message(
        [res?.data?.attachment?.attachment, new Date()],
        dispatch
      );
    });
  };
  const emoji = useSelector((state) => {
    return state?.get_emoji_reducer;
  });
  let prompt = useSelector((state) => {
    return state?.prompt_reducer;
  });
  const [size, setSize] = useState("15px");


  useEffect(() => {
    if (emoji?.emoji != undefined) {
      set_prompt(prompt.concat(" " + emoji?.emoji + " "), dispatch);
    }
  }, [emoji]);

  return (
    <div className="footer-main">
      <SuggestionPannel />
      <p>
        <LuCopyright /> Copyright , All rights reserved by AI Chatbot &nbsp;
        {new Date().getFullYear()}
      </p>
      <div className="prompt_bar">
        <div
          className="btn-clips-mobile"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <span>
            <form onSubmit={handleSubmit} style={{ display: "none" }}>
              <input
                type="file"
                name="file"
                id="fileUpload"
                onChange={handleSubmit}
                style={{ display: "none" }}
              />
            </form>
            <button
              onClick={() => {
                document.getElementById("fileUpload").click();
              }}
            >
              <TfiClip size={size} />
            </button>
          </span>
        </div>
        <InputPrompt />
        <div
          className="btn-clips"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <span>
            <button
              onMouseEnter={() => {
                show_emoji_pannel(dispatch);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  show_emoji_pannel(dispatch);
                }, 200);
              }}
            >
              <CiFaceSmile size={size} />
            </button>
          </span>
          <span>
            <form onSubmit={handleSubmit} style={{ display: "none" }}>
              <input
                type="file"
                name="file"
                id="fileUpload"
                onChange={handleSubmit}
                style={{ display: "none" }}
              />
            </form>
            <button
              onClick={() => {
                document.getElementById("fileUpload").click();
              }}
            >
              <TfiClip size={size} />
            </button>
          </span>
          <FooterMic />
        </div>
      </div>
    </div>
  );
};

export default Footer;
