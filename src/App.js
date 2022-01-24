import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Main from "./component/Main/Main";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={user ? <Main /> : <Navigate to="/Login" />}
          />
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
