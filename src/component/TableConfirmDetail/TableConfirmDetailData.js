import React from "react";
import style from "./TableConfirmDetail.module.css";

const TableConfirmDetailData = ({ data }) => {

  return (
    <tbody>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <tr className={style.Table_Row}>
            <td className={style.Table_Column}>
              <span>{index + 1}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.NgayCap}</span>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableConfirmDetailData;
