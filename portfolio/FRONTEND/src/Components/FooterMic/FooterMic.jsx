import React, { useState } from "react";
import "./style.css";
import { FiMic } from "react-icons/fi";
import { IoMicOffOutline } from "react-icons/io5";

const FooterMic = () => {
  const [micIsState, setMicState] = useState("off");
  const [size, setSize] = useState("15px");
  const handleMicState = () => {
    if (micIsState == "off") {
      setMicState("on");
    }
    if (micIsState == "on") {
      setMicState("off");
    }
  };
  return (
    <span>
      <button onClick={handleMicState}>
        {micIsState == "on" && <FiMic size={size} />}
        {micIsState == "off" && <IoMicOffOutline size={size} />}
      </button>
    </span>
  );
};

export default FooterMic;
