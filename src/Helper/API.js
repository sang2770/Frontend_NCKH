import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { logout } from "../authContext/CallApi";

const baseURL = "http://127.0.0.1:8000/api";
const useAxios = () => {
  const { dispatch } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const Client = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: user ? user.Token_type + " " + user.Token_access : "",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  Client.interceptors.response.use(
    (response) => {
      if (response) return response;
    },
    async function (error) {
      let errorResponse = error.response;
      if (errorResponse.status === 401) {
        console.log(401);
        logout(dispatch);
      }
      return Promise.reject(errorResponse);
    }
  );

  return Client;
};
export default useAxios;
