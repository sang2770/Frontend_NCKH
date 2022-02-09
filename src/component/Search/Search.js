import React from "react";
import style from "./Search.module.css";
import { BsSearch } from  "react-icons/bs";

function Search({ onClickSearch, Ref }) {
  return (
    <div className={style.Search_input}>
        <input placeholder="Nhập vào mã sinh viên" ref={Ref}></input>
        <button
            className={style.icon_search}
            onClick={onClickSearch}
        ><BsSearch/>
        </button>
    </div>
  );
}

export default Search;
