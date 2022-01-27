import React from "react";
import style from "./TextBox.module.css";
function TextBox({ title, subtitle, Read, Change, data }) {
  return (
    <div className="TextBox_Group">
      <label htmlFor={subtitle} className={style.LabelFilter}>
        {title}:
      </label>
      <input
        readOnly={Read}
        id={subtitle}
        type="text"
        className={style.TextBox}
        placeholder={title}
        name={subtitle}
        onChange={Change}
        defaultValue={data === undefined ? "" : data[subtitle]}
      />
    </div>
  );
}

export default TextBox;
