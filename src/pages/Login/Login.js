import React, { useContext, useRef } from "react";
import Logo from "../../media/Image/Logo.jpg";
import Banner from "../../media/Image/BannerLogin.jpg";
import "./Login.css";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/CallApi";
import clsx from "clsx";
function Login() {
  const { isFetching, dispatch, err } = useContext(AuthContext);
  const TenDangNhap = useRef();
  const Password = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log([TenDangNhap.current.value, Password.current.value]);
    login(
      {
        TenDangNhap: TenDangNhap.current.value,
        password: Password.current.value,
      },
      dispatch
    );
  };
  return (
    <React.Fragment>
      <div className="LoginContainer">
        <div className="LoginMain">
          <div className="LoginMain_title">
            <img src={Logo} alt="Logo" className="LoginMain_title_logo" />
            <h1 className="LoginMain_title_header">
              Hệ thống quản lý nghĩa vụ quân sự
            </h1>
          </div>
          <div className="LoginMain_content">
            <img
              src={Banner}
              alt="Banner"
              className="LoginMain_content_banner"
            />
            <form className="LoginMain_content_form">
              <label className="Label" htmlFor="NameLogin">
                Tên đăng nhập
              </label>
              <input
                ref={TenDangNhap}
                type="text"
                id="NameLogin"
                className="LoginMain_content_form_Name"
                name="TenDangNhap"
                required
              />
              <label className="Label" htmlFor="PasswordLogin">
                Mật khẩu
              </label>
              <input
                type="password"
                id="PasswordLogin"
                className="LoginMain_content_form_Name"
                name="password"
                ref={Password}
                required
              />
              <div className="SaveLogin">
                <input type="checkbox" id="checkSave" />
                <label className="Label LabelSave" htmlFor="checkSave">
                  Nhớ mật khẩu
                </label>
              </div>
              <h2 className={clsx("Login_Message", err && "errorMessage")}>
                {err}
              </h2>
              <button
                className="btn btn-Submit"
                onClick={handleLogin}
                disabled={isFetching}
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
