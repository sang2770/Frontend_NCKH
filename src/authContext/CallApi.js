import axios from "axios";

import { LoginStart, LoginSuccess, LoginFailure, Logout } from "./AuthAction";
const Client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
export const login = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const result = await Client.post("auth/admin/login", user);
    console.log(result.data);
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
