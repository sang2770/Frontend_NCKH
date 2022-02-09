import React, { useRef, useState } from "react";
import Button from "../../component/Button/Button";
import useAxios from "../../Helper/API";
import style from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
function ForgotPassword() {
  const { Client } = useAxios();
  const history = useNavigate();

  const Email = useRef();
  const [Message, setMessage] = useState("");
  const [Success, setSuccess] = useState(false);
  const [Err, setErr] = useState(false);
  const SendMail = (e) => {
    e.preventDefault();
    if (Email.current.value.trim().length === 0) {
      setErr(true);
      setMessage("Mời nhập Email");
      return;
    }
    setErr(false);
    Client.post("auth/admin/forget-password", {
      email: Email.current.value,
    })
      .then((res) => {
        if (res.data.status === "Success") {
          setMessage(res.data.Message);
          setSuccess(true);
          setErr(false);
        } else {
          setMessage(res.data.Err_Message);
          setSuccess(false);
          setErr(true);
        }
      })
      .catch((err) => {
        setMessage("Có lỗi");
        setSuccess(false);
        setErr(true);
      });
  };
  const Pass = useRef();
  const ResetPass = (e) => {
    e.preventDefault();
    if (Email.current.value.trim().length === 0) {
      setMessage("Mời nhập Mã");
      return;
    }
    Client.post("auth/admin/reset-password", {
      token: Email.current.value,
      MatKhau: Pass.current.value,
    })
      .then((res) => {
        if (res.data.status === "Success") {
          setMessage(res.data.Message);
          setSuccess(true);
        } else {
          setMessage(res.data.Err_Message);
          setSuccess(false);
        }
      })
      .catch((err) => {
        setMessage("Có lỗi");
        setSuccess(false);
      });
  };
  return (
    <div className={style.Forgot_Container}>
      <div className={style.Forgot_Main}>
        <div className={style.Main_Title}>Quên mật khẩu</div>

        {!Success && (
          <React.Fragment>
            <div className={style.Main_Content}>
              Bạn vui lòng nhập Email là tên đăng nhập tài khoản
            </div>
            <form className={style.Form}>
              <div className={style.Form_Input}>
                <label htmlFor="Email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="Email"
                  required
                  ref={Email}
                />
              </div>
              <Button content="Gửi" onClick={SendMail} />
            </form>
          </React.Fragment>
        )}
        {Success && (
          <React.Fragment>
            <div className={style.Main_Content}>
              Bạn vui lòng nhập Mã đã gửi vào gmail và mật khẩu mới
            </div>
            <form className={style.Form}>
              <div className={style.Form_Input}>
                <label htmlFor="Token">Token: </label>
                <input
                  type="text"
                  name="Token"
                  id="Token"
                  required
                  ref={Email}
                />
                <label htmlFor="MatKhau" style={{ marginLeft: "10px" }}>
                  Mật khẩu:{" "}
                </label>
                <input
                  type="text"
                  name="MatKhau"
                  id="MatKhau"
                  required
                  ref={Pass}
                />
              </div>
              <Button content="Gửi" onClick={ResetPass} />
            </form>
          </React.Fragment>
        )}
        <div
          className={style.Redirect_Login}
          onClick={() => {
            history("/Login");
          }}
        >
          Login
        </div>
        <div className={clsx(style.Message, Err && style.Err)}>{Message}</div>
      </div>
    </div>
  );
}

export default ForgotPassword;
