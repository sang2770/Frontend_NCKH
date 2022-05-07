import React from "react";
import Button from "../Button/Button";
import styles from "./Input.module.css";
import { BiExit } from "react-icons/bi";
import ComboBox from "../ComboBox/ComboBox";
import { FormatInput } from "../../Helper/Date";

function Input({ content, submit, setOpenSKQ, FormValue, status, Lop }) {
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
      submit(
        FormQD.get("SoQuyetDinh"),
        FormatInput(FormQD.get("NgayQuyetDinh")),
        FormQD.get("TenLop")
      );
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
              placeholder="dd-mm-yy"
              required
            />
          </div>
          {status ? <ComboBox title="Tên lớp" id="TenLop" items={Lop} /> : ""}
          <Button content="Cập nhật" styles={{ marginTop: "10px" }} />
        </form>
      </div>
    </div>
  );
}

export default Input;
