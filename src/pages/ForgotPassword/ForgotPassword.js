import React, { useRef, useState } from "react";
import Button from "../../component/Button/Button";
import useAxios from "../../Helper/API";
import style from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import validator from "validator";
import LoadingChild from "../../component/LoadingChild/LoadingChild";
function ForgotPassword() {
  const { Client, Loading } = useAxios();
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
    setMessage("");
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
  const Pass_R = useRef();
  const ResetPass = (e) => {
    e.preventDefault();
    if (Email.current.value.trim().length === 0) {
      setMessage("Mời nhập Mã");
      return;
    }
    if (
      !validator.isStrongPassword(Pass.current.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setMessage(
        "Mật khẩu mới phải có tối thiểu tám ký tự, ít nhất một chữ cái thường và hoa, một số và một ký tự đặc biệt"
      );
      setErr(true);
      return;
    }
    if (Pass.current.value !== Pass_R.current.value) {
      setMessage("Mật khẩu không trùng khớp!");
      setErr(true);
      return;
    }
    setMessage("");
    setErr(false);
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
          setErr(true);
        }
      })
      .catch((err) => {
        setMessage("Có lỗi");
        setErr(true);
      });
    setErr(false);
  };
  const ShowPass = (e) => {
    if (e.target.checked) {
      Pass.current.setAttribute("type", "text");
      Pass_R.current.setAttribute("type", "text");
    } else {
      Pass.current.setAttribute("type", "password");
      Pass_R.current.setAttribute("type", "password");
    }
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
                <div className={style.Form_Item}>
                  <label htmlFor="Token">Token: </label>
                  <input
                    type="text"
                    name="Token"
                    id="Token"
                    required
                    ref={Email}
                  />
                </div>
                <div className={style.Form_Item}>
                  <label htmlFor="MatKhau">Mật khẩu: </label>
                  <input
                    type="password"
                    name="MatKhau"
                    id="MatKhau"
                    required
                    ref={Pass}
                  />
                </div>
                <div className={style.Form_Item}>
                  <label htmlFor="MatKhau">Nhập lại mật khẩu: </label>
                  <input
                    type="password"
                    name="MatKhau"
                    id="MatKhau"
                    required
                    ref={Pass_R}
                  />
                </div>
              </div>
              <div className={style.ShowPass}>
                <input
                  type="checkbox"
                  name="ShowPass"
                  id="ShowPass"
                  onChange={ShowPass}
                />
                <label htmlFor="ShowPass">Hiện mật khẩu</label>
              </div>
              <Button content="Gửi" onClick={ResetPass} />
            </form>
          </React.Fragment>
        )}
        <div className={style.Option}>
          <div
            className={style.Redirect_Login}
            onClick={() => {
              history("/Login");
            }}
          >
            Login
          </div>
          {Success && (
            <div
              className={style.Back}
              onClick={() => {
                setSuccess(false);
                setMessage("");
                setErr(false);
              }}
            >
              Quay lại
            </div>
          )}
        </div>
        {Loading && <LoadingChild />}
        <div className={clsx(style.Message, Err && style.Err)}>{Message}</div>
      </div>
    </div>
  );
}

export default ForgotPassword;
