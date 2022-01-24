const AuthReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        err: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: {
          Token_access: action.payload.Token_access,
          MaTK: action.payload.user.MaTK,
          TenDangNhap: action.payload.user.TenDangNhap,
          Token_type: action.payload.Token_type,
        },
        isFetching: false,
        err: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        err: action.payload,
      };
    case "LOGOUT":
      console.log("Logout");
      return {
        user: null,
        isFetching: false,
        err: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
