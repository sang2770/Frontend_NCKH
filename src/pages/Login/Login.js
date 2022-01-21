import React from "react";
import Logo from "../../media/Image/Logo.jpg";
import Banner from "../../media/Image/BannerLogin.jpg";
import "./Login.css";
function Login() {
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
                type="text"
                id="NameLogin"
                className="LoginMain_content_form_Name"
                required
              />
              <label className="Label" htmlFor="PasswordLogin">
                Mật khẩu
              </label>
              <input
                type="password"
                id="PasswordLogin"
                className="LoginMain_content_form_Name"
                required
              />
              <div className="SaveLogin">
                <input type="checkbox" id="checkSave" />
                <label className="Label LabelSave" htmlFor="checkSave">
                  Lưu đăng nhập
                </label>
              </div>
              <button className="btn btn-Submit">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
