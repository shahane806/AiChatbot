import React, { useEffect, useState } from "react";
import "./style.css";
import LoginForm from "../../Components/LoginForm/LoginForm";
import SignupForm from "../../Components/SignupForm/SignupForm";
import { useSelector } from "react-redux";
const Auth = () => {
  const show_login_form = useSelector((state) => {
    return state?.show_login_form_reducer;
  });

  const [ShowLoginForm, setShowLoginForm] = useState(show_login_form);
  useEffect(()=>{setShowLoginForm(show_login_form)},[show_login_form])
  return (
    <div className="auth">
      {ShowLoginForm && <LoginForm />}
      {!ShowLoginForm && <SignupForm />}
    </div>
  );
};

export default Auth;
