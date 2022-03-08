import React, { useRef } from "react";
import Button from "../Button/Button";
import styles from "./Input.module.css";
import { BiExit } from "react-icons/bi";

function Input({ content, submit, setOpenSKQ, FormValue }) {
  const SoQD = useRef("");
  const Submit = () => {
    if (SoQD.current.value.trim().length == 0) {
      alert("Bạn phải nhập dữ liệu");
    } else {
      FormValue.append("SoQuyetDinh", SoQD.current.value.trim());
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
        <input
          type="text"
          name="SoQuyetDinh"
          ref={SoQD}
          placeholder="Số quyết định"
        />
        <Button content="Cập nhật" onClick={Submit} />
      </div>
    </div>
  );
}

export default Input;
