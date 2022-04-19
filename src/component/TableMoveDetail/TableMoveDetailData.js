import React from "react";
import style from "../TableConfirmDetail/TableConfirmDetail.module.css";

const TableMoveDetailData = ({ data }) => {

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
            <td className={style.Table_Column}>
              <span>{item.NgayHH}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.NoiChuyenVe}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.LyDo}</span>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableMoveDetailData;
