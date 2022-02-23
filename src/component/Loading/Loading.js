import React from "react";
import style from "./Loading.module.css";
function Loading() {
  // console.log("Loading");
  return (
    <div className={style.Loading_Container}>
      <div className={style.double_loading}>
        <div className={style.c1}></div>
        <div className={style.c2}></div>
      </div>
    </div>
  );
}

export default Loading;
