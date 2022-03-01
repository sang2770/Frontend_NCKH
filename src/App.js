import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Main from "./component/Main/Main";
import Loading from "./component/Loading/Loading";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import useAxios from "./Helper/API";
import { Logout } from "./authContext/AuthAction";
import { logout } from "./authContext/CallApi";
function App() {
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const { Client } = useAxios();
  const CheckSession = () => {
    Client.get("/auth/admin/me")
      .then((response) => {
        // console.log(response);
        if (response.data.status !== "Success") {
          logout(dispatch);
        }
      })
      .catch((err) => {
        alert("Vui lòng đăng nhập!");
        logout(dispatch);
      });
  };
  useEffect(() => {
    user && CheckSession();
  }, []);

  return (
    <div className="App">
      {isFetching && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={user ? <Main /> : <Navigate to="/Login" />}
          />
          <Route path="/Forgot-password" element={<ForgotPassword />} />
          <Route
            path="/Login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
