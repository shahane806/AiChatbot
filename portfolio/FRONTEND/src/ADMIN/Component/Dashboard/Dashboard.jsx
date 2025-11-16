import React, { useEffect, useState } from "react";
import "./style.css";
import TotalUsers from "./TotalUsers/TotalUsers";
import { getUserSignupCount, getAdminSignupCount, viewAllChatbots } from "../../../API/api";
import UserAccountsCount from "./UserAccountsCount/UserAccountsCount";
import AdminAccountCount from "./AdminAccountCount/AdminAccountCount";
import { AdminGetSocket } from "../Socket.io/Socket";
import OnlineUserCount from "./OnlineUsersCount/OnlineUsersCount";
import ChatbotCount from "./ChatbotCount/ChatbotCount";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const [userCount, setCount] = useState(0);
  const [chatbotCount,setChatbotCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0);
  let allChatbotsState = useSelector((state)=>{return state?.chatbot_reducer})
  const [allChatbots,setAllChatbots] = useState(allChatbotsState)
  const getUserCount = async (_id, authToken) => {
    const res = await getUserSignupCount(_id, authToken).then((res) => res);
    //  console.log(res)
    localStorage.setItem("UserSignupCount", res);
    setCount(parseInt(localStorage.getItem("UserSignupCount")));
  };
  const getAdminCount = async (_id, authToken) => {
    const res = await getAdminSignupCount(_id, authToken).then((res) => res);
    localStorage.setItem("AdminSignupCount", res);
    setAdminCount(parseInt(localStorage.getItem("AdminSignupCount")));
  };
  const socket = AdminGetSocket();
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  const [onlineUsersObject, setOnlineUsersObject] = useState({});
  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("admin-info"))?._id)
    // localStorage.getItem("admin-access-token")
    getUserCount(
      JSON.parse(localStorage.getItem("admin-info"))?._id,
      localStorage.getItem("admin-access-token")
    );
    getAdminCount(
      JSON.parse(localStorage.getItem("admin-info"))?._id,
      localStorage.getItem("admin-access-token")
    );
    setOnlineUserCount(localStorage.getItem("onlineUsersCount"))
    setOnlineUsersObject(JSON.parse(localStorage.getItem("onlineUsers")));
    
  },[onlineUserCount]);
  
  socket.on("onlineUsersCount", (e) => {
    localStorage.setItem("onlineUsersCount",e)
    setOnlineUserCount(e);
  });
  socket.on("onlineUsers", (e) => {
    localStorage.setItem("onlineUsers",JSON.stringify(e))
    setOnlineUsersObject(e);
  });

  const getChatbotCount = async()=>{
    await viewAllChatbots(JSON.parse(localStorage.getItem("admin-info"))?._id,localStorage.getItem("admin-access-token")).then(res=>{ setAllChatbots(res?.data); setChatbotCount(res?.data?.length); localStorage.setItem("chatbotCount",res?.data?.length) })
  }
  useEffect(()=>{
    getChatbotCount()
  },[])
  // console.log(Object.entries(onlineUsersObject).filter(e=>e[0]!="AI"))
  // console.log(Object.entries(onlineUsersObject))
  return (
    <div id="Dashboard-main">
      <div className="Dashboard-Heading">
        <h3>Dashboard</h3>
      </div>
      <div className="Dashboard-Components">
        <div className="Dashboard-Component-1">
          <div className="Dashboard-Component-OnlineUserCount">
            <OnlineUserCount
              count={onlineUserCount}
              TotalUsers={userCount + adminCount}
            />
           
          </div>
          <ChatbotCount
              count={chatbotCount}
            />
          <UserAccountsCount count={userCount} />
          <AdminAccountCount count={adminCount} />

          <TotalUsers count={userCount + adminCount} />
        </div>
      </div>
      <div className="Dashboard-Heading">
        <h3>Online Account Details</h3>
      </div>
      <div className="Dashboard-Components">
        <table className="Dashboard-Components-Online-Account-Details-Table">
          <thead>
          <th>Sr.No</th>
          <th>Email</th>
          <th>Socket Id</th>
          </thead>
          <tbody>

         {onlineUsersObject != null &&  Object.entries(onlineUsersObject)
            .filter((e) => e[0] != "AI")
            .map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e[0]}</td>
                  <td>{e[1]}</td>
                </tr>
              );
            })}
          </tbody>
  
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
