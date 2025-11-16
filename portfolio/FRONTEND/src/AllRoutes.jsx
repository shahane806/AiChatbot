import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebase_signin_user } from "./State/action-creators";
import Auth from "./Pages/Auth/Auth";
import AppLayout from "./Components/AppLayout/AppLayout";
import {  SocketProvider } from "./Components/SocketIo/socket";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AdminAuth from "./Pages/Admin/Auth/AdminAuth";
import AdminDashboard from "./ADMIN/Dashboard/AdminDashboard";
import About from "./Pages/About/About";
import {  AdminSocketProvider } from "./ADMIN/Component/Socket.io/Socket";
import ErrorBoundary from "./ErrorBoundary";

const AllRoutes = () => {
  const token = useSelector((state) => {
    return state?.firebase_user_reducer;
  });
  const token2 = useSelector((state) => {
    return state?.auth_reducer?.authToken;
  });
 
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    if (token?.length != 0) {
      setAuthToken(token);
      console.log(token);
    }
    if (token2?.length != 0) {
      setAuthToken(token2);
      console.log(token2);
    }
  }, [token, token2]);

  useEffect(() => {
    firebase_signin_user(
      JSON.parse(localStorage.getItem("firebase-user-info")),
      dispatch
    );
  }, [authToken]);
  useEffect(() => {
    localStorage.getItem("firebase-access-token")
      ? setAuthToken(localStorage.getItem("firebase-access-token"))
      : setAuthToken(localStorage.getItem("access-token"));
  });
  
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <span>404</span>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {authToken != null && (
                  <SocketProvider
                    Children={
                      <>
                        <Navbar />
                        <AppLayout />
                        <Footer />
                      </>
                    }
                  />
                )}
                {authToken == null && (
                  <>
                    <Auth />
                    
                  </>
                )}
              </>
            }
          />
          <Route
            path="/auth"
            element={
              <>
                <Auth />
              </>
            }
          />
          {/* <Route
            path="/market"
            element={
              <>
                <Market />
              </>
            }
          /> */}
          <Route
            path="/about"
            element={
              <>
                <About />
              </>
            }
          />
          <Route
            path="/Admin/Auth"
            element={
              <>
                <AdminAuth />
              </>
            }
          />
          <Route
            path="/Admin/Dashboard"
            element={
              <>
                <AdminSocketProvider
                  Children={
                    <>
                      <ErrorBoundary>

                      <AdminDashboard />
                      </ErrorBoundary>
                    </>
                  }
                />
              </>
            }
          />
         
          
        </Routes>
      </Router>
    </div>
  );
};

export default AllRoutes;
