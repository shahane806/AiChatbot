import React, { useState } from "react";
import "./style.css";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch } from "react-redux";
import { addChatbot } from "../../../../State/action-creators";
import { addNewChatbot } from "../../../../API/api";
const AddNewChatBotForm = () => {
  const [_id,setId] = useState(undefined)
  const [chatbotIcon, setChatbotIcon] = useState(undefined);
  const [chatbotName, setChatbotName] = useState(undefined);
  const [chatbotBackendUrl, setChatbotBackendUrl] = useState(undefined);
  const [chatbotUIPath, setChatBotUIPath] = useState(undefined);
  const [UploadBtnClicked, setUploadBtnClicked] = useState(false);
  const dispatch = useDispatch();
  const handleUploadChatbot = async(e)=>{
      e.preventDefault();
      if(chatbotIcon == undefined || chatbotIcon ==""){
        alert("Enter ChatbotIcon Path");
        setChatbotIcon(undefined)
        setUploadBtnClicked(false)
      }
      else if(chatbotName == undefined || chatbotName ==""){
        alert("Enter Chatbot Name")
        setChatbotName(undefined)
        setUploadBtnClicked(false)
      }
      else if(chatbotBackendUrl == undefined || chatbotBackendUrl == ""){
        alert("Enter ChatbotBackendUrl")
        setChatbotBackendUrl(undefined)
        setUploadBtnClicked(false)
      }
      else if(chatbotUIPath == undefined || chatbotUIPath == ""){
        alert("Enter ChatbotUI Path")
        setChatBotUIPath(undefined)
        setUploadBtnClicked(false)
      }else if
      ((chatbotIcon != undefined || chatbotIcon !="")||
      (chatbotName != undefined || chatbotName !="")||
      (chatbotBackendUrl != undefined || chatbotBackendUrl != "")||
      (chatbotUIPath != undefined || chatbotUIPath != "")){
               
        setUploadBtnClicked(true)
        
        await addNewChatbot(JSON.parse(localStorage.getItem("admin-info"))?._id,localStorage.getItem("admin-access-token"),{chatbotIcon,chatbotName,chatbotBackendUrl,chatbotUIPath}).then((res)=>{
          if(res?.status == 201){
            alert("Chatbot Already Present")
          }else if(res?.status == 200){
            setId(res?.data?.newChatbot?._id)
            addChatbot({_id,chatbotIcon,chatbotName,chatbotBackendUrl,chatbotUIPath},dispatch);

            alert("Chatbot Upload Successfully")

          }
          else{
            alert("Something went wrong")
          }
        })
        setTimeout(() => {
        setUploadBtnClicked(false)
        setChatbotIcon(undefined)
        setChatbotName(undefined)
        setChatBotUIPath(undefined)
        setChatbotBackendUrl(undefined)
        }, 3000);
      }
     
       
      
  }
  return (
    <div className="form  Dashboard-Components-Online-Account-Details-Table">
      {!UploadBtnClicked && (
        <form>
        
          <h3 className="spanHeading fontSize_30px">Upload Chatbot</h3>
          <input
            type="text"
            className="inputText"
            name="chatbot_icon"
            placeholder="Icon URL"
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
            onChange={(e) => {
              setChatBotUIPath(e.target.value);
            }}
            required
          />
          

        <button
            onClick={(e)=>{handleUploadChatbot(e)}}
            className="uploadBtn"
          >Upload</button>
        </form>
      )}
      {
        UploadBtnClicked &&
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
      }
    </div>
  );
};

export default AddNewChatBotForm;
