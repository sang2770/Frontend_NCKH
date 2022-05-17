import React, { useEffect } from "react";
import style from "./TextBox.module.css";
import clsx from "clsx";
import { FormatDate } from "../../Helper/Date";
function TextBox({ search, title, subtitle, Read, Change, data, date, Ref }) {
  return (
    <div className={style.TextBox_Group}>
      <label htmlFor={subtitle} className={style.LabelFilter}>
        {title}:
      </label>
      <input
        key={
          !search &&
          (data
            ? data[subtitle]
            : "OKAYG_" + (10000 + Math.random() * (1000000 - 10000)))
        }
        ref={Ref}
        readOnly={Read}
        id={subtitle}
        type="text"
        className={clsx(style.TextBox)}
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
