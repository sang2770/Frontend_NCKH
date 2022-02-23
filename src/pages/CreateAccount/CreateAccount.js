import React, { useRef, useState } from "react";
import style from "./CreateAccount.module.css";
import HeaderTitle from "../../component/HeaderTitle/HeaderTitle";
import { HiUserAdd } from "react-icons/hi";
import useAxios from "../../Helper/API";
import validator from "validator";
function CreateAccount() {
  const Pass = useRef();
  const Pass_R = useRef();

  const ShowPass = (e) => {
    if (e.target.checked) {
      Pass.current.setAttribute("type", "text");
      Pass_R.current.setAttribute("type", "text");
    } else {
      Pass.current.setAttribute("type", "password");
      Pass_R.current.setAttribute("type", "password");
    }
  };
  const [Err, setErr] = useState();
  const { Client } = useAxios();
  const Create = (e) => {
    e.preventDefault();
    const Form = new FormData(e.target);
    if (!validator.isEmail(Form.get("TenDangNhap"))) {
      setErr("Email không đúng định dạng");
      return;
    }
    if (
      !validator.isStrongPassword(Form.get("MatKhau"), {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErr(
        "Mật khẩu phải có tối thiểu tám ký tự, ít nhất một chữ cái thường và hoa, một số và một ký tự đặc biệt"
      );
      return;
    }
    if (Form.get("MatKhau") !== Form.get("MatKhau_repeat")) {
      // console.log("Err");
      setErr("Mật khẩu không khớp");
      return;
    }
    setErr("");
    Client.post("auth/admin/signup", Form)
      .then((res) => {
        if (res.data.status === "Success") {
          alert("Bạn đã thao tác thành công");
          e.target.reset();
        } else {
          // console.log(res.data.Err_Message);
          setErr(res.data.Err_Message);
        }
      })
      .catch((err) => {
        // console.log(err);
        setErr("Có lỗi");
      });
  };
  return (
    <div className={style.CreateAccount_Container}>
      <HeaderTitle Title="Tạo tài khoản Admin" Icon={<HiUserAdd />} />
      <div className={style.CreateAccount_Content}>
        <div className={style.Content_Title}>
          Xin mời nhập thông tin cần tạo
        </div>
        <form className={style.Input_Group} onSubmit={Create}>
          <div className={style.Input_Item}>
            <label htmlFor="TenDangNhap">Tên đăng nhập:</label>
            <input type="text" required name="TenDangNhap" id="TenDangNhap" />
          </div>
          <div className={style.Input_Item}>
            <label htmlFor="MatKhau">Mật khẩu:</label>
            <input
              type="password"
              required
              name="MatKhau"
              id="MatKhau"
              ref={Pass}
            />
          </div>
          <div className={style.Input_Item}>
            <label htmlFor="MatKhau_repeat">Nhập lại mật khẩu:</label>
            <input
              type="password"
              required
              name="MatKhau_repeat"
              id="MatKhau_repeat"
              ref={Pass_R}
            />
          </div>
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
          <button className={style.Btn_Create}>Tạo mới</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
