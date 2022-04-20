import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import style from "./Table.module.css";
function Table({ headers, Content, ScaleHeight }) {
  const TableElement = useRef(null);
  return (
    <div
      className={clsx(style.Table_wrapper, ScaleHeight && style.ScaleHeight)}
    >
      <table className={style.TableTemplate} ref={TableElement}>
        <thead>
          <tr className={style.Table_Row}>
            <th className={clsx(style.Table_Header, style.STT)}>STT</th>
            {headers.map((item) => (
              <th key={item} className={style.Table_Header}>
                <span>{item}</span>
              </th>
            ))}
          </tr>
        </thead>
        {Content}
      </table>
    </div>
  );
}

export default Table;
