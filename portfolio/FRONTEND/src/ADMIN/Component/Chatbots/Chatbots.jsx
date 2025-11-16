import React, { useEffect, useState } from "react";
import "./style.css";
import TotalChatBots from "./TotalChatBots/TotalChatBots";
import AddNewChatBotForm from "./AddNewChatBotForm/AddNewChatBotForm";
import DeleteChatbotForm from "./DeleteChatbotForm/DeleteChatbotForm";
import UpdateChatbotForm from "./UpdateChatBotForm/UpdateChatbotForm";
import ViewAllChatbots from "./ViewAllChatbotsList/ViewAllChatbots";
import { useSelector } from "react-redux";
import { viewAllChatbots } from "../../../API/api";
const Chatbots = () => {
  let allChatbotsState = useSelector((state)=>{return state?.chatbot_reducer})
  const [count ,setCount] = useState(0)

  const getData = async()=>{
    await viewAllChatbots(JSON.parse(localStorage.getItem("admin-info"))?._id,localStorage.getItem("admin-access-token")).then((res)=>{setCount(res?.data?.length)})
  }
  useEffect(()=>{
    getData()
  },[allChatbotsState])
  useEffect(()=>{
    setCount(allChatbotsState?.length)
  },[allChatbotsState])
  const [addNewChatbotFormIsOpen, setAddNewChatBotFormIsOpen] = useState(false);
  const [deleteChatbotFormIsOpen, setDeleteChatBotFormIsOpen] = useState(false);
  const [updateChatbotFormIsOpen, setUpdateChatbotFormIsOpen] = useState(false);
  const [viewAllChatbotListIsOpen, setViewAllChatbotListIsOpen] = useState(true);

  const handleAddNewChatbot = () => {
    setAddNewChatBotFormIsOpen(!addNewChatbotFormIsOpen)
    setDeleteChatBotFormIsOpen(false)
    setUpdateChatbotFormIsOpen(false)
    setViewAllChatbotListIsOpen(false)
  };
  const handleDeleteChatbot = () => {
    
    setAddNewChatBotFormIsOpen(false)
  setDeleteChatBotFormIsOpen(!deleteChatbotFormIsOpen)
    setUpdateChatbotFormIsOpen(false)
    setViewAllChatbotListIsOpen(false)

  };
  const handleUpdateChatbot = () => {
    setAddNewChatBotFormIsOpen(false)
    setDeleteChatBotFormIsOpen(false)
    setUpdateChatbotFormIsOpen(!updateChatbotFormIsOpen)
    setViewAllChatbotListIsOpen(false)
  };
  const handleViewAllChatbot = () => {
    setAddNewChatBotFormIsOpen(false)
    setDeleteChatBotFormIsOpen(false)
    setUpdateChatbotFormIsOpen(false)
    setViewAllChatbotListIsOpen(!viewAllChatbotListIsOpen)
  };

  return (
    <div className="Chatbot-Component">
      <div className="Dashboard-Component-1 disflex flex-d-row  align-item-start justify-content-start ">
        <div className="Dashboard-Component-1 disflex flex-d-row  align-item-center justify-content-center ">
          <TotalChatBots count={count} />
        </div>
        <div className="Dashboard-Component-1 disflex flex-d-col  align-item-start justify-content-start  width_100percent">
          <div className="Dashboard-Component-1 disflex flex-d-row  align-item-start justify-content-start">
            <h3 className="spanHeading padding_10px fontSize_30px ">
              Chatbots
            </h3>
          </div>
          <div className="Dashboard-Component-1 disflex flex-d-row  align-item-center justify-content-center">
            <div
              className="marginLeft_10px padding_10px borderRadius_5px border_1px_solid_shd"
              onClick={() => {
                handleAddNewChatbot();
              }}
            >
              Add New Chatbot
            </div>
            <div
              className="marginLeft_10px padding_10px borderRadius_5px border_1px_solid_shd"
              onClick={() => {
                handleDeleteChatbot();
              }}
            >
              Delete Chatbot
            </div>
            <div
              className="marginLeft_10px padding_10px borderRadius_5px border_1px_solid_shd"
              onClick={() => {
                handleUpdateChatbot();
              }}
            >
              Update Chatbot
            </div>
            <div
              className="marginLeft_10px padding_10px borderRadius_5px border_1px_solid_shd"
              onClick={() => {
                handleViewAllChatbot();
              }}
            >
              View All Chatbots
            </div>
          </div>
        </div>
      </div>
      
      {
        addNewChatbotFormIsOpen && <div className="Dashboard-Component-1 disflex flex-d-row align-item-start justify-content-start  width_95percent marginAuto ">
        <div className="Dashboard-Component-1 disflex flex-d-col align-item-start justify-content-start marginAuto width_95percent">
        <h3 className="spanHeading fontSize_30px">
          Add New Chatbot
        </h3>
        <AddNewChatBotForm/>

        </div>
        </div>
      }
      {
        deleteChatbotFormIsOpen && <div className="Dashboard-Component-1 disflex flex-d-row align-item-start justify-content-start width_100percent">
        <div className="Dashboard-Component-1 disflex flex-d-col align-item-start justify-content-start">
        <h3 className="spanHeading fontSize_30px">
          Delete Chatbot
        </h3>
        <DeleteChatbotForm/>
        </div>
        </div>
      }
      {
        updateChatbotFormIsOpen && <div className="Dashboard-Component-1 disflex flex-d-row align-item-start justify-content-start width_100percent">
        <div className="Dashboard-Component-1 disflex flex-d-col align-item-start justify-content-start">
        <h3 className="spanHeading fontSize_30px">
         Update Chatbots
        </h3>
        <UpdateChatbotForm/>
        </div>
        </div>
      }
      {
        viewAllChatbotListIsOpen && <div className="Dashboard-Component-1 disflex flex-d-row align-item-start justify-content-start width_100percent">
        <div className="Dashboard-Component-1 disflex flex-d-col align-item-start justify-content-start  width_95percent">
        <h3 className="spanHeading fontSize_30px">
          View All Chatbots
        </h3>
        <ViewAllChatbots/>
        </div>
        </div>
      }
    </div>
  );
};

export default Chatbots;
