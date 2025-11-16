import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from "../Component/Navbar/Navbar";
import { useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import Dashboard from "../Component/Dashboard/Dashboard";
import Chatbots from "../Component/Chatbots/Chatbots";
import Settings from "../Component/Settings/Settings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminAuthToken, setAdminAuthToken] = useState(
    localStorage.getItem("admin-access-token")
  );
  const adminSideMenu = useSelector((state) => {
    return state?.admin_side_menu_reducer;
  });
  useEffect(() => {
    if (
      adminAuthToken == undefined ||
      adminAuthToken == "" ||
      adminAuthToken == null
    ) {
      navigate("/Admin/Auth");
    }
  }, [adminAuthToken]);
  const [adminSideMenuWidth, setAdminMenuWidth] = useState("15%");
  const [AdminDashboardWidth, setAdminDashboardWidth] = useState("85%");
  const [adminSideMenuOptionsWidth,setAdminSideMenuOptionsWidth] = useState("78%")
  const [
    dashboardSideMenuListOptionsDisplay,
    setdashboardSideMenuListOptionsDisplay,
  ] = useState("flex");
  useEffect(() => {
    if (adminSideMenu?.isOpen) {
      setAdminMenuWidth("5%");
      setAdminDashboardWidth("95%");
      setdashboardSideMenuListOptionsDisplay("none");
      setAdminSideMenuOptionsWidth("78%");
    } else {
      setAdminMenuWidth("15%");
      setAdminDashboardWidth("85%");
      setdashboardSideMenuListOptionsDisplay("flex");
      setAdminSideMenuOptionsWidth("90%")
    }
    console.log(adminSideMenuWidth);
  }, [adminSideMenu]);
  const handleAdminLogout =()=>{
    localStorage.clear()
    navigate("/Admin/auth");
  }
  const [DashboardOpen,setDashboardOpen] = useState(true)
  const [ChatbotsOpen,setChatbotsOpen] = useState(false)
  const [SettingsOpen,setSettingsOpen]= useState(false)

  const handleDashboardOpen =()=>{
    setDashboardOpen(true)
    setChatbotsOpen(false)
    setSettingsOpen(false)
  }
  const handleChatBotsOpen = ()=>{
    setDashboardOpen(false)
    setChatbotsOpen(true)
    setSettingsOpen(false)
  }
  const handleSettingsOpen = ()=>{
    setDashboardOpen(false)
    setChatbotsOpen(false)
    setSettingsOpen(true)
  }
  return (
    <div className="admin-dashboard ">
      <div
        className="admin-dashboard-component1-sidemenu"
        style={{ minWidth: adminSideMenuWidth }}
      >
        <div className="admin-dashboard-sidemenu-heading">
          <p>MENU</p>
        </div>
        <div className="admin-dashboard-sidemenu-options">
          <li style={{width:adminSideMenuOptionsWidth}} onClick={handleDashboardOpen}>
            <MdOutlineSpaceDashboard size={20} />
            <p style={{ display: dashboardSideMenuListOptionsDisplay }}>
              Dashboard
            </p>
          </li>
          <li style={{width:adminSideMenuOptionsWidth}} onClick={handleChatBotsOpen}>
            <TbMessageChatbot size={20} />
            <p style={{ display: dashboardSideMenuListOptionsDisplay }}>
              Chatbots
            </p>
          </li>
          <li style={{width:adminSideMenuOptionsWidth}} onClick={handleSettingsOpen}>
            <IoSettingsOutline size={20} />
            <p style={{ display: dashboardSideMenuListOptionsDisplay }}>
              Settings
            </p>
          </li>
          <li style={{width:adminSideMenuOptionsWidth}} >
            <IoLogOutOutline size={20} onClick={() => {
                handleAdminLogout();
              }}/>
            <p onClick={() => {
                handleAdminLogout();
              }} style={{ display: dashboardSideMenuListOptionsDisplay }}>
              Logout
            </p>
          </li>
        </div>
      </div>
      <div
        className="admin-dashboard-component2-dashboard "
        style={{ minWidth: AdminDashboardWidth }}
      >
        <div className="admin-dashboard-component2-dashboard-navbar">
          <Navbar />
        </div>
        <div className="admin-dashboard-component2-dashboard-components ">
          {
            DashboardOpen && <Dashboard/>
          }
          {
            ChatbotsOpen && <Chatbots/>
          }
          {
            SettingsOpen && <Settings/>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
