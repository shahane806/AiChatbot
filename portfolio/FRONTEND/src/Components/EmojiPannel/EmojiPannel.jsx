import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { get_emoji, show_emoji_pannel } from "../../State/action-creators";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
const EmojiPannel = () => {
  const dispatch = useDispatch();
  const emojiPannel = useSelector((state) => state?.show_emoji_pannel_reducer);
  const [emojiPannelStyle, setEmojiPannelStyle] = useState({ display: "none" });
  useEffect(() => {
    if (emojiPannel?.isOpen === true) {
      setEmojiPannelStyle({
        display: "none",
      });
    }
    if (emojiPannel?.isOpen === false) {
      setEmojiPannelStyle({
        display: "flex",
      });
    }
  }, [emojiPannel]);

  return (
    <div
      className="right"
      style={{ display: emojiPannelStyle?.display }}
      onMouseLeave={() => {
        show_emoji_pannel(dispatch);
      }}
    >
      <EmojiPicker
        className="emojiPicker"
        onEmojiClick={(e) => {
          get_emoji(e, dispatch);
        }}
      />
    </div>
  );
};

export default EmojiPannel;
