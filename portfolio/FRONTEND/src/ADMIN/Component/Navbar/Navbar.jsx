import React, { useEffect, useState } from "react";
import "./style.css";
import { Divide as Hamburger } from "hamburger-react";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { adminSideMenu } from "../../../State/action-creators";
import {AdminGetSocket} from '../Socket.io/Socket'
const Navbar = () => {
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setAdminInfo(JSON.parse(localStorage.getItem("admin-info")));
    console.log(adminInfo);
  }, []);
  const handleAdminLogout =()=>{
    localStorage.clear()
    navigate("/Admin/auth");
  }
  const handleAdminSideMenu = () => {
    adminSideMenu(dispatch)
  };
  const socket = AdminGetSocket();
  return (
    <>
      <div className="navbar_main">
        <div className="navbar_main_logo">
        <span>
            <Hamburger size={25} onToggle={handleAdminSideMenu} />
          </span>
          <h3 style={{ fontSize: "40px" }}>AI Chatbot</h3>
        </div>

        <div className="navbar_main_li navbar_main_li_admin">
          <li>
            <p>
              <CgProfile size={"30px"} /> {adminInfo?.adminLoginEmail}
            </p>
          </li>
          <li>
            <span
              className="logout_button"
              onClick={() => {
                localStorage.clear();
                socket.emit("Disconnection");
                handleAdminLogout();
              }}
            >
              Logout
            </span>
          </li>
        </div>
      </div>
    </>
  );
};

export default Navbar;
