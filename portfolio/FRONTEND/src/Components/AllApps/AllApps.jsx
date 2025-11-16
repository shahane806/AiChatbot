import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { clearChat, selectChatbot } from "../../State/action-creators";
import IconRender from "../IconRender/IconRender";
const AllApps = ({ allChatbots = [] }) => {
  const dispatch = useDispatch();
  const handleOpenApp = (icon, name, backendUrl, frontendUrl) => {
    selectChatbot(
      {
        icon: icon,
        name: name,
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      },
      dispatch
    );
    clearChat(dispatch);
    alert("Ai Chatbot Changed to : "+name);

  };

  const data = [
    allChatbots.map((e, i) => {
      return (
        <span
          onClick={() => {
            console.log(e)
            handleOpenApp(e?.icon, e?.name, e?.backendUrl, e?.frontendUrl);
          }}
        >
          <div style={{ marginTop: "10px" }}>
            <IconRender icon={e?.icon} name={e?.name}/>
          </div>
          <p>{e?.name}</p>
        </span>
      );
    }),
  ];
  return (
    <div className="item-card">
      {data.map((e) => {
        return e;
      })}
    </div>
  );
};

export default AllApps;
