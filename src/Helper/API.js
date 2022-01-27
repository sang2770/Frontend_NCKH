import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));

const Client = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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
      errorResponse.Auth = true;
    }
    return Promise.reject(errorResponse);
  }
);
export default Client;
