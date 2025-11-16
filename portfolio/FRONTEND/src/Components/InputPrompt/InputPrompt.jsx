import React, { useEffect, useId, useState } from "react";
import "./style.css";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_prompt,
  send_message,
  set_prompt,
} from "../../State/action-creators";
import { GetSocket } from "../SocketIo/socket";
const InputPrompt = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("15px");
  const [AiOutlineSendVisibility, setAiOutlineSendVisibility] =
    useState("hidden");
  const prompt = useSelector((state) => {
    return state?.prompt_reducer;
  });
  const user = useSelector((state)=>{return state?.firebase_user_reducer});
  const user2 = useSelector((state)=>{return state?.auth_reducer});
  const socket = GetSocket();
  let selectedChatbot = useSelector((state) => {
    return state?.select_chatbot_reducer;
  });
  const [_id,setId] = useState(user?.user?.uid || user2?.user?._id);
  const [selectedCB , setSelectedCB] = useState(undefined)
  useEffect(() => {
    socket.on("MESSAGE_RESPONSE_CLIENT", ({res, userId}) => {
      userId?._id == _id && send_message([res, new Date()], dispatch)
    });
  }, []);
  useEffect(()=>{
    selectedChatbot.then((res)=>{
      setSelectedCB(res)
    })
    },[selectedChatbot])
  const handleInputEnter = (event) => {
    event?.preventDefault();
    if (event?.key === "Enter") {
      send_message([prompt, new Date(),_id], dispatch);
      socket.emit("NEW_MESSAGE", {
        userId : {
        
          _id :_id
        

        },
        chat : prompt,
        chatBotName:selectedCB?.name
      });
      clear_prompt(dispatch);
    }
  };
  const handleInputClick = () => {
    send_message([prompt, new Date(),_id], dispatch);
    socket.emit("NEW_MESSAGE", {
      userId : {
      
        _id :_id
      

      },
      chat : prompt,
      chatBotName:selectedCB?.name
    });
    clear_prompt(dispatch);
  };
  return (
    <div
      className="prompt_bar_input"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          set_prompt(e?.target?.value, dispatch);
        }}
        onFocus={() => {
          setAiOutlineSendVisibility("visible");
        }}
        onBlur={() => {
          !prompt && setAiOutlineSendVisibility("hidden");
          prompt && setAiOutlineSendVisibility("visible");
        }}
        name="prompt"
        id="prompt"
        placeholder="Message Prompt AI Chatbot"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleInputEnter(e);
          }
        }}
      />
      <span className="sendBtn">
        <button
          onClick={handleInputClick}
          style={{ visibility: AiOutlineSendVisibility }}
        >
          <AiOutlineSend size={size} />
        </button>
      </span>
    </div>
  );
};

export default InputPrompt;
