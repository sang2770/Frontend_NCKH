import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const Initial_State = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  err: false,
};
// console.log(Initial_State);
export const AuthContext = createContext(Initial_State);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Initial_State);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        err: state.err,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
