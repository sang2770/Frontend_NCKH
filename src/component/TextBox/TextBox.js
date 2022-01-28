import React from "react";
import style from "./TextBox.module.css";
function TextBox({ title, subtitle, Read, Change, data, date, Ref }) {
  return (
    <div className="TextBox_Group">
      <label htmlFor={subtitle} className={style.LabelFilter}>
        {title}:
      </label>
      <input
        ref={Ref}
        readOnly={Read}
        id={subtitle}
        type="text"
        className={style.TextBox}
        placeholder={date ? "YY-MM-DD" : title}
        name={subtitle}
        onChange={Change}
        defaultValue={data === undefined ? "" : data[subtitle]}
        required
      />
    </div>
  );
}

export default TextBox;
