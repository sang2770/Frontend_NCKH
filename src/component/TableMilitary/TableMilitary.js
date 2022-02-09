import React, { useRef } from "react";
import style from "./TableMilitary.module.css";

function TableMilitary({ headers, Content }) {
  const TableElement = useRef(null);
  return (
    <div className={style.Table_wrapper}>
      <table className={style.TableTemplate} ref={TableElement}>
        <thead>
          <tr className={style.Table_Row}>
            <th className={style.Table_Header}>STT</th>
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

export default TableMilitary;
