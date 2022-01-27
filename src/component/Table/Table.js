import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import style from "./Table.module.css";
function Table({ headers, minCellWidth, Content }) {
  const TableElement = useRef(null);
  return (
    <div className={style.Table_wrapper}>
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
