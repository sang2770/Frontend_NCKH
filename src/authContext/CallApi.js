import axios from "axios";

import { LoginStart, LoginSuccess, LoginFailure } from "./AuthAction";
const login = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const result = await axios.post("auth/admin/login", user);
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
export default login;
