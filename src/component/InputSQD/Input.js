import React from "react";
import Button from "../Button/Button";
import styles from "./Input.module.css";
import { BiExit } from "react-icons/bi";

function Input({ content, submit, setOpenSKQ, FormValue }) {
  const SubmitForm = (e) => {
    e.preventDefault();
    const FormQD = new FormData(e.target);
    if (
      FormQD.get("SoQuyetDinh").trim().length === 0 ||
      FormQD.get("NgayQuyetDinh").trim().length === 0
    ) {
      alert("Bạn phải nhập dữ liệu");
      return;
    } else {
      FormValue.append("SoQuyetDinh", FormQD.get("SoQuyetDinh"));
      FormValue.append("NgayQuyetDinh", FormQD.get("NgayQuyetDinh"));
      submit();
      setOpenSKQ(false);
    }
  };
  return (
    <div className={styles.Input_Container}>
      <div className={styles.Input_Content}>
        <div
          className={styles.Btn_Exit}
          onClick={() => {
            setOpenSKQ(false);
          }}
        >
          <BiExit />
        </div>
        <div className={styles.Input_Content_Title}>{content}</div>
        <form onSubmit={SubmitForm}>
          <div className={styles.Group_input}>
            <label htmlFor="SQD">Số quyết định</label>
            <input
              id="SQD"
              type="text"
              name="SoQuyetDinh"
              placeholder="Số quyết định"
              required
            />
          </div>
          <div className={styles.Group_input}>
            <label htmlFor="NQD">Ngày quyết định</label>
            <input
              id="NQD"
              type="text"
              name="NgayQuyetDinh"
              placeholder="YY-MM-DD"
              required
            />
          </div>
          <Button content="Cập nhật" />
        </form>
      </div>
    </div>
  );
}

export default Input;
