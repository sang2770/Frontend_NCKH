import React from "react";
import style from "./TextBox.module.css";
import { FormatDate } from "../../Helper/Date";
function TextBox({ title, subtitle, Read, Change, data, date, Ref }) {
  return (
    <div className={style.TextBox_Group}>
      <label htmlFor={subtitle} className={style.LabelFilter}>
        {title}:
      </label>
      <input
        ref={Ref}
        readOnly={Read}
        id={subtitle}
        type="text"
        className={style.TextBox}
        placeholder={date ? "dd-mm-yy" : title}
        name={subtitle}
        onChange={Change}
        defaultValue={
          data === undefined
            ? ""
            : date
            ? FormatDate(data[subtitle])
            : data[subtitle]
        }
        required
      />
    </div>
  );
}

export default TextBox;
