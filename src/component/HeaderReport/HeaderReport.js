import React from "react";
import style from "./HeaderReport.module.css";

function HeaderReport({ title, icon }) {
  return (
    <div className={style.HeaderReport_Container}>
      <div className={style.HeaderReport_Icon}>{icon}</div>
      <div className={style.HeaderReport_Title}>{title}</div>
    </div>
  );
}

export default HeaderReport;
