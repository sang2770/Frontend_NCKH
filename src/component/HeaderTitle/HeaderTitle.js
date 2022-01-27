import React from "react";
import style from "./HeaderTile.module.css";
import { IoIosArrowForward } from "react-icons/io";
function HeaderTitle({ Title, Icon }) {
  return (
    <div className={style.Title_Container}>
      <div className={style.Title_Icon}>
        <IoIosArrowForward />
      </div>
      <div className={style.Title_content}>{Title}</div>
      <div className={style.Title_Icon_content}>{Icon}</div>
    </div>
  );
}

export default HeaderTitle;
