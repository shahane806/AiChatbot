import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "../../Assets/logo_600px_200px.png";
import logo2 from "../../Assets/logo_150px_50px_2.png";
import { Divide as Hamburger } from "hamburger-react";
import { FcShop } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, side_menu, signOut } from "../../State/action-creators";
import { GoogleSignout } from "../../Firebase/auth";
import { CgProfile } from "react-icons/cg";
import { GetSocket } from "../SocketIo/socket";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [size, setSize] = useState("30px");
  const [photoURL,setPhotoUrl] = useState("");
  const user = useSelector((state) => {
    return state?.firebase_user_reducer?.user;
  });

  console.log(user);
  const dispatch = useDispatch();
  const user2 = useSelector((state) => {
    return state?.auth_reducer?.user;
  });
  const handleHamburger = () => {
    side_menu(dispatch);
  };
  let socket = GetSocket();
  useEffect(()=>{
    setPhotoUrl(user?.photoURL)
    console.log(user?.photoURL)
  },[user])
  return (
    <>
      <div className="navbar_main">
        <div className="navbar_main_logo">
          {/* <img className="navbar_main_logo_img1" src={logo} alt="logo" />
          <img
            className="navbar_main_logo_img2"
            style={{ display: "none" }}
            src={logo2}
            alt="logo"
          /> */}
          <h3 style={{ fontSize: "40px" }}>AI Chatbot</h3>
        </div>

        <div className="navbar_main_li">
          {/* <li>
            <p>
              <FcShop size={size} /> <Link  className="nav-links" to="/market"><span>Market</span></Link>
            </p>
          </li> */}
          {/* <li>
            <p>
              <Link className="nav-links" to="/">
                <IoMdHome size={size} /> <span>Home</span>
              </Link>
            </p>
          </li> */}
          {/* <li>
            <p>
              <Link className="nav-links" to="/about">
                <FcAbout size={size} /> <span>About</span>
              </Link>
            </p>
          </li> */}
          <li>
            <p>
              
              {photoURL != "" && !user2? (
                <>
                <img
                  src={photoURL}
                  referrerPolicy="no-referrer"
                  style={{
                    maxWidth: "50px",
                    minWidth: "40px",
                    borderRadius: "10px",
                  }}
                />
                </>
              ): !user2 && <CgProfile size={"30px"} />}
              {user2?.username && <CgProfile size={"30px"} />}
              <span>
                {user2 != null && user2?.username}
                {user != null && user?.displayName}
              </span>
            </p>
          </li>
          <li>
            {user == null ? (
              <p>
                <span
                  className="logout_button"
                  onClick={() => {
                    signOut(dispatch);
                    localStorage.clear();
                    clearChat(dispatch);
                    socket.emit("Disconnection");
                  }}
                >
                  Logout
                </span>
              </p>
            ) : (
              <p>
                <span
                  className="logout_button"
                  onClick={() => {
                    GoogleSignout(dispatch);
                    localStorage.clear();
                    clearChat(dispatch);
                    socket.emit("Disconnection");
                  }}
                >
                  Logout
                </span>
              </p>
            )}
          </li>
        </div>
        <div className="navbar_main_hamburger" style={{ display: "none" }}>
          <Hamburger onToggle={handleHamburger} color="#4FD1C5" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
