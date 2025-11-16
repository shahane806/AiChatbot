import React from "react";
import "./style.css";
import { FcShop } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { BsChatDots } from "react-icons/bs";
import { useState } from "react";
import { GoogleSignout } from "../../Firebase/auth";
import { CgProfile } from "react-icons/cg";
const SideMenu = () => {
  const dispatch = useDispatch();
  const hamburgerState = useSelector((state) => state?.side_menu_reducer);
  const user = useSelector((state)=>{return state?.firebase_user_reducer?.user});
  const user2 = useSelector((state) => {
    return state?.auth_reducer?.user;
  });
  const [size, setSize] = useState("30px");
  return (
    <>
      {!hamburgerState?.isOpen && (
        <div className="side_menu" style={{ display: "none" }}>
          <div className="side_menu_items">
            <div className="side_menu_items_li">
            <li>
            <p>
              {user?.photoURL != "" && (
                <img
                  src={user?.photoURL}
                  style={{
                    maxWidth: "50px",
                    minWidth: "40px",
                    borderRadius: "10px",
                  }}
                />
              )}
              {user2?.username && <CgProfile size={"30px"} />}
              <span>
                {user2 != null &&
                user2?.username}
                {user != null &&
                user?.displayName}
              </span>
            </p>
          </li>
              <hr />
              <li>
                <p>
                  <FcShop size={size} /> <span>|</span> <span>Market</span>
                </p>
              </li>
              <hr />
              <li>
                <p>
                  <IoMdHome size={size} />
                  <span>|</span> <span>Home</span>
                </p>
              </li>
              <hr />
              <li>
                <p>
                  <FcAbout size={size} /> <span>|</span>
                  <span>About</span>
                </p>
              </li>
              <hr />
           
              <li>
              <p>
              <span className="logout_button" onClick={()=>{GoogleSignout(dispatch)}}>Logout</span>
            </p>
              </li>
              <hr />
              <li>
                <p>
                  <BsChatDots size={size} /> <span>|</span>
                  <span>Recent Conversation</span>
                </p>
              </li>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
