import clsx from "clsx";
import React, { useRef } from "react";
import style from "../TableConfirmDetail/TableConfirmDetail.module.css";

function TableMoveDetail({ Content, onClickHide }) {
  const TableElement = useRef(null);
  return (
    <div className={style.Table_wrapper}>
      <table className={style.TableTemplate} ref={TableElement}>
        <thead>
          <tr className={style.Table_Row}>
            <th className={clsx(style.Table_Header)}>Lần cấp</th>
            <th className={clsx(style.Table_Header)}>Ngày cấp</th>
            <th className={clsx(style.Table_Header)}>Ngày hết hạn</th>
            <th className={clsx(style.Table_Header)}>Nơi chuyển về</th>
            <th className={clsx(style.Table_Header)}>Lý do chuyển</th>
          </tr>
        </thead>
        {Content}
      </table>
      <div className={style.btn}>
        <button 
          className={style.btn_hide}
          onClick = {onClickHide}
        >
          Ẩn
        </button>
      </div>
    </div>
  );
}

export default TableMoveDetail;
