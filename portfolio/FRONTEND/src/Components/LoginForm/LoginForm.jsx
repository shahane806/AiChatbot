import React, { useEffect, useState } from "react";
import "./style.css";
import { login, show_login_form } from "../../State/action-creators";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo_600px_200px.png";
import { FcGoogle } from "react-icons/fc";
import { GoogleSignInWithPopUp } from "../../Firebase/auth";
import { forgetPassword, loginWithEmailIdAndPassword } from "../../API/api";
import ForgetPasswordModal from "../ForgetPasswordModal/ForgetPasswordModal";
import ErrorModal from "../ErrorModal/ErrorModal";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("access-token")
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError , setIsError] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-info"))
  );
  const handleLoginFormSubmit = async () => {
    try {
      await loginWithEmailIdAndPassword(email, password).then((value) => {
        setAuthToken(value?.data?.authToken);
        setUser(value?.data?.user);
        localStorage.setItem("access-token", value?.data?.authToken);
        localStorage.setItem("user-info", JSON.stringify(value?.data?.user));
      });
      setShowErrorModal(true)
      setIsError(false)
      setErrorMessage("Login successfully...")
    } catch (error) {
      if(error?.response?.status === 404){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status === 401){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status === 409){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
     
    }
  };
  const handleError = () => {
    setShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
 
  const handleUpdatePassword = async (email, currentPassword, newPassword) => {
    try {
      await forgetPassword(email,currentPassword,newPassword).then(res=>{
        return res
      })
      setModalOpen(false);
      setShowErrorModal(true)
      setIsError(false)
      setErrorMessage("Password Changed Successfully...")
    } catch (error) {
      if(error?.response?.status == 404){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status == 401){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
     
      setModalOpen(false);
    }
  };

  useEffect(() => {
    !showErrorModal && login({ authToken, user }, dispatch);
  }, [authToken,showErrorModal]);
  return (
    <div className="login_form_main">
      {/* <img src={logo} alt="logo" /> */}
      <h1>AI Chatbot</h1>
      <br />
      <h1>Welcome Back</h1>
      <form onSubmit={handleLoginFormSubmit} className="login_form">
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
        />
        <input
          type="button"
          name="submit"
          className="submit_btn"
          id="submit"
          value="Continue"
          onClick={handleLoginFormSubmit}
        />
        <br />
        <span>
          Don't have an account?{" "}
          <span
            className="show_signup_form"
            onClick={() => {
              show_login_form(dispatch);
            }}
          >
            Sign up
          </span>
        </span>
        <br />
        <span>
          <span className="show_signup_form" onClick={handleOpenModal}>
            Forget Password
          </span>
          <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} message={errorMessage} isError={isError} />
          <ForgetPasswordModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleUpdatePassword}
          />
        </span>
        <br />

        <div>
          <hr />
          <span>OR</span>
          <hr />
        </div>
      </form>
      <form className="login_form">
        <span
          className="google_login_btn"
          onClick={() => {
            GoogleSignInWithPopUp(dispatch);
          }}
        >
          <FcGoogle size={"20px"} />
          <span>Continue with Google</span>
        </span>
      </form>
      <br />
      <br />
      <div>
        <span className="login_form_footer">Terms of Use</span>
        <span> &nbsp; | &nbsp; </span>
        <span className="login_form_footer"> Privacy Policy</span>
      </div>
    </div>
  );
};

export default LoginForm;
