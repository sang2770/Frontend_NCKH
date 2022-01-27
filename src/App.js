import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Main from "./component/Main/Main";
import Loading from "./component/Loading/Loading";
function App() {
  const { user, isFetching } = useContext(AuthContext);
  return (
    <div className="App">
      {isFetching && <Loading />}
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
