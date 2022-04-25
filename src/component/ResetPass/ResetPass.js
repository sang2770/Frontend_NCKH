import React, { useContext, useRef, useState } from "react";
import style from "./ResetPass.module.css";
import useAxios from "../../Helper/API";
import validator from "validator";
import { AuthContext } from "../../authContext/AuthContext";
import { BiExit } from "react-icons/bi";
import { Logout } from "../../authContext/AuthAction";
import LoadingChild from "../LoadingChild/LoadingChild";
function ResetPass({ setOpenReset }) {
  const { user, dispatch } = useContext(AuthContext);
  const Pass = useRef();
  const Pass_N = useRef();
  const Pass_R = useRef();
  const ShowPass = (e) => {
    if (e.target.checked) {
      Pass.current.setAttribute("type", "text");
      Pass_R.current.setAttribute("type", "text");
      Pass_N.current.setAttribute("type", "text");
    } else {
      Pass.current.setAttribute("type", "password");
      Pass_R.current.setAttribute("type", "password");
      Pass_N.current.setAttribute("type", "password");
    }
  };
  const [Err, setErr] = useState();
  const { Client, Loading } = useAxios();
  const Reset = (e) => {
    e.preventDefault();
    const Form = new FormData(e.target);
    if (Form.get("New") !== Form.get("New_Repeat")) {
      console.log("Err");
      setErr("Mật khẩu không khớp");
      return;
    }
    if (
      !validator.isStrongPassword(Form.get("New"), {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErr(
        "Mật khẩu mới phải có tối thiểu tám ký tự, ít nhất một chữ cái thường và hoa, một số và một ký tự đặc biệt"
      );
      return;
    }

    setErr("");
    Form.append("MaTK", user.MaTK);
    Client.post("auth/admin/ChangePassword", Form)
      .then((res) => {
        if (res.data.status === "Success") {
          alert("Bạn vừa thay đổi mật khẩu! Vui lòng đăng nhập lại");
          dispatch(Logout());
        } else {
          // console.log(res.data.Err_Message);
          setErr(res.data.Err_Message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr("Có lỗi");
      });
  };
  return (
    <div className={style.ResetContainer}>
      <div className={style.Content}>
        <div
          className={style.exitIcon}
          onClick={() => {
            setOpenReset(false);
          }}
        >
          <BiExit />
        </div>
        <div className={style.CreateAccount_Content}>
          <div className={style.Content_Title}>Mời nhập thông tin</div>
          <form className={style.Input_Group} onSubmit={Reset}>
            <div className={style.Input_Item}>
              <label htmlFor="TenDangNhap">Tên đăng nhập:</label>
              <input
                type="text"
                required
                name="TenDangNhap"
                id="TenDangNhap"
                defaultValue={user.TenDangNhap}
              />
            </div>
            <div className={style.Input_Item}>
              <label htmlFor="MatKhau">Mật khẩu:</label>
              <input
                type="password"
                required
                name="Old"
                id="MatKhau"
                ref={Pass}
              />
            </div>
            <div className={style.Input_Item}>
              <label htmlFor="MatKhau_New">Nhập mật khẩu mới:</label>
              <input
                type="password"
                required
                name="New"
                id="MatKhau_New"
                ref={Pass_N}
              />
            </div>
            <div className={style.Input_Item}>
              <label htmlFor="MatKhau_Repeat">Nhập lại mật khẩu:</label>
              <input
                type="password"
                required
                name="New_Repeat"
                id="MatKhau_Repeat"
                ref={Pass_R}
              />
            </div>
            {Loading && <LoadingChild />}
            <div className={style.Input_Err}>{Err}</div>
            <div className={style.Input_Item}>
              <input
                type="checkbox"
                id="checkSave"
                name="SaveLogin"
                onChange={ShowPass}
              />
              <label className="Label LabelSave" htmlFor="checkSave">
                Hiện mật khẩu
              </label>
            </div>
            <button className={style.Btn_Create}>Xác nhận</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
