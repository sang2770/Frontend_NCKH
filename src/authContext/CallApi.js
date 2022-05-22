import axios from "axios";

import { LoginStart, LoginSuccess, LoginFailure, Logout } from "./AuthAction";
const Client = axios.create({
  baseURL: process.env.REACT_APP_HOST_NAME + "/api",
});
export const login = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const result = await Client.post("auth/admin/login", user);
    // console.log(result.data);
    if (result.data.status === "Failed") {
      dispatch(LoginFailure(result.data.Err_Message));
    } else {
      dispatch(LoginSuccess(result.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(LoginFailure(error.message));
  }
};
export const logout = async (dispatch) => {
  console.log("Logout");
  dispatch(Logout());
};
