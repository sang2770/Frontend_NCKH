import React from "react";
import style from "./Search.module.css";

function Search({ subtitle, Read, Change, title }) {
  return (
    <div className={style.Search_input}>
        <label>
          {title}:
        </label>
        <input 
          placeholder="Nhập vào mã sinh viên" 
          readOnly={Read}
          id={subtitle}
          type="text"
          name={subtitle}
          onChange={Change}
          required
        >
        </input>
    </div>
  );
}

export default Search;
