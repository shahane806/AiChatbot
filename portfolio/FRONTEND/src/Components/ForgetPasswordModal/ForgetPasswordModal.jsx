import React, { useEffect, useState } from "react";
import "./Style.css"; // Make sure to create and link the CSS file

const ForgetPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(email, currentPassword, newPassword);

  };
  useEffect(()=>{
    setEmail("")
    setCurrentPassword("")
    setNewPassword("")
  },[onSubmit])
  if(!isOpen){
    return null;
  }else{
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Forgot Password</h2>
          <form className="forget-password-form">
            <input
              className="forget-password-input"
              type="email"
              placeholder="abc@gmail.com"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <input
              className="forget-password-input"
              type="password"
              placeholder="current password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
  
            <input
              className="forget-password-input"
              type="password"
              placeholder="new password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
  
            <button onClick={handleSubmit} className="forget-password-update-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    );
  }
  
};

export default ForgetPasswordModal;
