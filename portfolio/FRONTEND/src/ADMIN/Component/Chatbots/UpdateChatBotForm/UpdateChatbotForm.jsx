import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { updateChatbot } from "../../../../API/api";
import { updateChatbotFromReducer } from "../../../../State/action-creators";
import { useDispatch } from "react-redux";

const UpdateChatbotForm = () => {
  const [_id, setId] = useState(undefined);
  const [chatbotIcon, setChatbotIcon] = useState(undefined);
  const [chatbotName, setChatbotName] = useState(undefined);
  const [chatbotBackendUrl, setChatbotBackendUrl] = useState(undefined);
  const [chatbotUIPath, setChatBotUIPath] = useState(undefined);
  const [showForm, setShowForm] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleUpdateBotFinal = async (e) => {
    e.preventDefault();
    if (chatbotIcon == undefined || chatbotIcon == "") {
      alert("Enter ChatbotIcon Path");
      setChatbotIcon(undefined);
    } else if (chatbotName == undefined || chatbotName == "") {
      alert("Enter Chatbot Name");
      setChatbotName(undefined);
    } else if (chatbotBackendUrl == undefined || chatbotBackendUrl == "") {
      alert("Enter ChatbotBackendUrl");
      setChatbotBackendUrl(undefined);
    } else if (chatbotUIPath == undefined || chatbotUIPath == "") {
      alert("Enter ChatbotUI Path");
      setChatBotUIPath(undefined);
    } else if (
      chatbotIcon != undefined ||
      chatbotIcon != "" ||
      chatbotName != undefined ||
      chatbotName != "" ||
      chatbotBackendUrl != undefined ||
      chatbotBackendUrl != "" ||
      chatbotUIPath != undefined ||
      chatbotUIPath != ""
    ) {
      await updateChatbot(
        JSON.parse(localStorage.getItem("admin-info"))?._id,
        localStorage.getItem("admin-access-token"),
        { _id, chatbotIcon, chatbotName, chatbotBackendUrl, chatbotUIPath }
      ).then((res) => {
        if (res?.status != 200) {
          alert(res?.data?.Message);
        } else {
          
          setShowForm(false);
          setShowForm2(false)
          setLoader(true);
          setTimeout(() => {
            setLoader(false);
            setShowForm(true)
            alert(res?.data?.Message);
            updateChatbotFromReducer(
              { _id, chatbotIcon, chatbotName, chatbotBackendUrl, chatbotUIPath },
              dispatch
            );
          }, 3000); 
          

          
        }
      });
     
     
    }
   
  };
  const handleUpdateBot = async (e) => {
    e.preventDefault();
    await updateChatbot(
      JSON.parse(localStorage.getItem("admin-info"))?._id,
      localStorage.getItem("admin-access-token"),
      { _id, chatbotIcon, chatbotName, chatbotBackendUrl, chatbotUIPath }
    ).then((res) => {
      if (res?.status == 200) {
        setShowForm(false);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          setShowForm2(true);
          alert(res?.data?.Message);
        }, 3000);
      } else {
        alert(res?.data?.Message);
      }
    });
  };

  return (
    <div className="Dashboard-Component-1 width_100percent ">
      <div className="Dashboard-Component-1 width_100percent ">
        {showForm && (
          <form>
            <input
              type="text"
              className="inputText"
              name="id"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="Enter Chatbot _id"
              required
            />
            <button
              onClick={(e) => {
                handleUpdateBot(e);
              }}
              className="uploadBtn"
            >
              Search
            </button>
          </form>
        )}
        {showForm2 && (
          <form>
            <h3 className="spanHeading fontSize_30px">Update Chatbot</h3>
            <input
              type="text"
              className="inputText"
              name="chatbot_icon"
              placeholder="Icon URL"
              value={chatbotIcon}
              onChange={(e) => {
                setChatbotIcon(e.target.value);
              }}
              required
            />
            <input
              type="text"
              className="inputText"
              name="chatbot_name"
              placeholder="Chatbot Name"
              value={chatbotName}
              onChange={(e) => {
                setChatbotName(e.target.value);
              }}
              required
            />
            <input
              type="text"
              className="inputText"
              name="chatbot_backend_url"
              placeholder="Chatbot Backend Url"
              value={chatbotBackendUrl}
              onChange={(e) => {
                setChatbotBackendUrl(e.target.value);
              }}
              required
            />
            <input
              type="text"
              className="inputText"
              name="chatbot_ui_path"
              placeholder="Chatbot UI Path"
              value={chatbotUIPath}
              onChange={(e) => {
                setChatBotUIPath(e.target.value);
              }}
              required
            />

            <button
              onClick={(e) => {
                handleUpdateBotFinal(e);
              }}
              className="uploadBtn"
            >
              Update
            </button>
          </form>
        )}
        {loader && (
          <>
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={100}
              animation="wave"
              style={{
                marginTop: "-5px",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateChatbotForm;
