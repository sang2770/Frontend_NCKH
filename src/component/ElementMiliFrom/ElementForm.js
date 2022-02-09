import React from "react";
import style from "./ElementForm.module.css";

function ElementForm({ title, subtitle, onChange, Ref, data }) {
  return (
    <div className={style.Element_form}>
      <label htmlFor={subtitle}>
        {title}:
      </label>
      <input
        ref={Ref}
        id={subtitle}
        type="text"
        name={subtitle}
        onChange={onChange}
        defaultValue={data === undefined ? "" : data[subtitle]}
        required
      />
    </div>
  );
}

export default ElementForm;
