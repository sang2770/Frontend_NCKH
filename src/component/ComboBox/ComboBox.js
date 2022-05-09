import React from "react";
import style from "./ComboBox.module.css";
function ComboBox({ id, items, title, data, Change }) {
  return (
    <div className={style.GroupBox_Container}>
      <label className={style.LabelFilter} htmlFor={id}>
        {title}:
      </label>
      <select
        onChange={Change}
        name={id}
        className={style.ComboBox_Container}
        id={id}
        defaultValue={
          data ? data[id] : id === "TinhTrangSinhVien" ? "Đang học" : ""
        }
      >
        <option value={""}>----{title}----</option>
        {items
          ? items.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))
          : false}
      </select>
    </div>
  );
}

export default ComboBox;
