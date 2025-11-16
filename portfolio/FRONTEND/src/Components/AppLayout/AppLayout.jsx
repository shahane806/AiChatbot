import React, { useEffect, useState } from "react";
import EmojiPannel from "../EmojiPannel/EmojiPannel";
import SideMenu from "../SideMenu/SideMenu";
import { useSelector } from "react-redux";
import { uploadMultiFiles, viewAllChatbots } from "../../API/api";
import AllApps from "../AllApps/AllApps";
import TSI from "../ChatBotUI/TSI";
import DigitRecog from "../ChatBotUI/DigitRecog";
const AppLayout = () => {
  const chat = useSelector((state) => {
    return state?.chat_reducer;
  });
  const user = useSelector((state) => {
    return state?.firebase_user_reducer;
  });
  const user2 = useSelector((state) => {
    return state?.auth_reducer;
  });
  const [_id, setId] = useState(user?.user?.uid || user2?.user?._id);
  const chatImgStyle = {
    cursor: "pointer",
    width: "100%",
    height: "150px",
    borderRadius: "10px",
    border: "1px solid #397fdd",
  };
  const [authToken, setAuthToken] = useState(
    user?.user?.stsTokenManager?.accessToken || user2?.authToken
  );
  const [count, setCount] = useState(0);

  const [loadingChat, setLoadingChat] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingChat(false);
    }, 1500);
    if (!loadingChat) {
      setLoadingChat(true);
    }
  }, [chat]);
  console.log(authToken);
  useEffect(() => {
    try {
      document.getElementById("rightChat").scrollTop =
        document.getElementById("rightChat").scrollHeight;
    } catch (e) {
      // console.log(e)
    }
  }, [chat]);
  let allChatbotsState = useSelector((state) => {
    return state?.chatbot_reducer;
  });
  let selectedChatbot = useSelector((state) => {
    return state?.select_chatbot_reducer;
  });
  const [allChatbots, setAllChatbots] = useState(allChatbotsState);
  const [selectedCB , setSelectedCB] = useState(undefined);

  


  const viewChatbots = async () => {
    await viewAllChatbots(
      _id,
      authToken,
    ).then((res) => {
      setAllChatbots(res?.data);
      setCount(res?.data?.length);
      localStorage.setItem("chatbotCount", res?.data?.length);
    });
  };
  useEffect(() => {
    viewChatbots();
    console.log(allChatbotsState);
  }, [allChatbotsState]);

  useEffect(()=>{
  selectedChatbot.then((res)=>{
    setSelectedCB(res)
  })
  },[selectedChatbot])
  return (
    <div className="App">
      <SideMenu />
      <div className="left_pannel" id="leftPannel">
        <h3>ALL APPS</h3>
        <AllApps allChatbots={allChatbots} />
      </div>
      <div
        className="right"
        onDragEnter={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("dragEnter");
          // console.log("drag enter")
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("dragEnter");
          // console.log("drag leave")
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("dragEnter");
          //  console.log("drop")

          const multiFiles = new FormData();

          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            // console.log(e.dataTransfer.files.item(i))
            multiFiles.append("multiFiles", e.dataTransfer.files.item(i));
          }
          multiFiles.append("_id", _id);
          multiFiles.append("authToken", authToken);
          uploadMultiFiles(multiFiles);
          /////////////////////////////////////////////////////multiple file drag and drop functionality
        }}
      >
        <EmojiPannel />

        {selectedCB?.name == "TSI" && (
          <TSI
            chat={chat}
            loadingChat={loadingChat}
            chatImgStyle={chatImgStyle}
            _id={_id}
          />
        )}
        {selectedCB?.name == "DigitRecog" && (
          <DigitRecog
            chat={chat}
            loadingChat={loadingChat}
            chatImgStyle={chatImgStyle}
            _id={_id}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
