import React from "react";
import style from "./LoadingChils.module.css";
function LoadingChild() {
  return (
    <div className={style.LoadingChild_Container}>
      <div class={style.dashed_loading}></div>
    </div>
  );
}

export default LoadingChild;
