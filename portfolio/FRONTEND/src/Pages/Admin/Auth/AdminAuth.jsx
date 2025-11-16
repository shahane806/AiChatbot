import React, { useEffect, useState } from "react";
import "./Style.css";
import { useSelector } from "react-redux";
import AdminLoginForm from "./AdminLoginForm";

const AdminAuth = () => {
  const show_login_form = useSelector((state) => {
    return state?.show_login_form_reducer;
  });

  const [ShowLoginForm, setShowLoginForm] = useState(show_login_form);
  useEffect(()=>{setShowLoginForm(show_login_form)},[show_login_form])
  return (
    <div className="auth">
      {ShowLoginForm && <AdminLoginForm/>}
    </div>
  );
};

export default AdminAuth;
