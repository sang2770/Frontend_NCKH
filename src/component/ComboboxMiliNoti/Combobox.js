import React from "react";
import style from "./Combobox.module.css";

function ComboBox({ id, items, title, data, Change }) {
    return (
    <div className={style.Search_combobox}>
      <label htmlFor={id}>
        {title}:
      </label>
      <select
        name={id}
        id={id}
        onChange={Change}
        defaultValue={data ? data[id] : ""}
      >
        <option value="">----{title}----</option>
        {items.map((item, index) => (
            <option value={item} key={index}>
            {item}
            </option>
        ))}
      </select>
    </div>
  );
}

export default ComboBox;
