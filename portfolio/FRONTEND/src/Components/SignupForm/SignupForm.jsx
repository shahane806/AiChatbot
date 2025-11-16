import React, { useEffect, useState } from "react";
import "./style.css";
import { firebase_signin_user, show_login_form, signUp } from "../../State/action-creators";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo_600px_200px.png";
import { FcGoogle } from "react-icons/fc";
import { GoogleSignInWithPopUp } from "../../Firebase/auth";
import { signUpWithEmailIdAndPassword } from "../../API/api";
import ErrorModal from "../ErrorModal/ErrorModal";
const SignupForm = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken , setAuthToken] = useState(localStorage.getItem("access-token"));
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user-info")));
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isError , setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const handleError = () => {
    setShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const handleSignupForm = async() => {
    try {
      await signUpWithEmailIdAndPassword(username,email,password).then((res)=>{
        setAuthToken(res?.data?.authToken)
        localStorage.setItem("access-token",res?.data?.authToken)
       localStorage.setItem("user-info",JSON.stringify(res?.data?.user))
        setUser(res?.data?.user);
     })
     setShowErrorModal(true)
      setIsError(false)
      setErrorMessage("Signup Successfully")
    } catch (error) {
      
      if(error?.response?.status === 400){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
      else if(error?.response?.status === 409){
        setShowErrorModal(true)
        setErrorMessage(error?.response?.data)
      }
    }
  };
  useEffect(()=>{
    !showErrorModal && signUp({authToken,user},dispatch)
},[authToken,showErrorModal])
  return (
    <div className="login_form_main">
      {/* <img src={logo} alt="logo" /> */}
      <h1>AI Chatbot</h1>

      <br />
      <h1>Register New Account</h1>
      <form onSubmit={handleSignupForm} className="login_form">
        <input
          type="text"
          placeholder="userId"
          name="userId"
          id="userId"
          value={username}
          onChange={(e) => {
            setUserName(e?.target?.value);
          }}
          autoFocus={true}
        />
        <input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e?.target?.value);
          }}
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
          onClick={handleSignupForm}
        />
        <br />
        <span>
          Already have an account?{" "}
          <span
            className="show_signup_form"
            onClick={() => {
              show_login_form(dispatch);
            }}
          >
            Login
          </span>
          <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} message={errorMessage} isError={isError} />
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

export default SignupForm;
