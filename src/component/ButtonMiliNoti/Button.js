import React from "react";
import style from "./Button.module.css";

function Button({ content, styles, onClick }) {
  return (
    <button className={style.button_main} style={styles} onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;