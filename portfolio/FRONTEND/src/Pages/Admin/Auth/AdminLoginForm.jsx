import React, { useEffect, useState } from "react";
import "./Style.css";
import { login } from "../../../State/action-creators";
import { useDispatch } from "react-redux";
import logo from "../../../Assets/logo_600px_200px.png";
import {  adminLoginWithEmailIdAndPassword } from "../../../API/api";
import ErrorModal from "../../../Components/ErrorModal/ErrorModal";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAuthToken, setAdminAuthToken] = useState(
    localStorage.getItem("admin-access-token")
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError , setIsError] = useState(true);
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin-info"))
  );
  const navigate = useNavigate();
  const handleAdminLoginFormSubmit = async () => {
    try {
      await adminLoginWithEmailIdAndPassword(email, password).then((value) => {
        setAdminAuthToken(value?.data?.authToken);
        setAdmin(value?.data?.user);
        localStorage.setItem("admin-access-token", value?.data?.authToken);
        localStorage.setItem("admin-info", JSON.stringify(value?.data?.user));
      });
      setShowErrorModal(true)
      setIsError(false)
      setErrorMessage("Login successfully...")
    } catch (error) {
      if(error?.response?.status === 404){
        setShowErrorModal(true)
        setIsError(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status === 401){
        setShowErrorModal(true)
        setIsError(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status === 409){
        setShowErrorModal(true)
        setIsError(true)
        setErrorMessage(error?.response?.data)
      }
     
    }
  };
 
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
 
 
  
  
  useEffect(() => {
    !showErrorModal && login({ adminAuthToken, admin }, dispatch);
     showErrorModal == false && adminAuthToken && navigate("/Admin/Dashboard")
  }, [adminAuthToken,showErrorModal]);
  
 

  return (
    <div className="login_form_main">
      {/* <img src={logo} alt="logo" /> */}
      <h1>AI Chatbot</h1>
      <br />
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLoginFormSubmit} className="login_form">
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e?.target?.value);
          }}
          autoFocus={true}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e?.target?.value);
          }}
          required
        />
        <input
          type="button"
          name="submit"
          className="submit_btn"
          id="submit"
          value="Continue"
          onClick={handleAdminLoginFormSubmit}
        />
        <br />
       
        <span>
         
          <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} message={errorMessage} isError={isError} />
         
        </span>

         
      </form>
      <div>
        <span className="login_form_footer">Terms of Use</span>
        <span> &nbsp; | &nbsp; </span>
        <span className="login_form_footer"> Privacy Policy</span>
      </div>
    </div>
  );
};

export default LoginForm;
