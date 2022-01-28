import React, { useState } from "react";
import style from "./Table.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FormStudent from "../FormStudent/FormStudent";
import clsx from "clsx";
const TableContent = ({ data, ReadForm, contentBtn, contentReset, Submit }) => {
  const [DropDown, setDropDown] = useState(-1);
  const ChangeDropDown = (id) => {
    setDropDown(id);
  };
  return (
    <tbody>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <tr className={style.Table_Row}>
            <td className={style.Table_Column}>
              <p
                className={style.IconDropDown}
                onDoubleClick={() => {
                  setDropDown(-1);
                }}
                onClick={() => ChangeDropDown(index)}
              >
                <IoIosArrowDown />
              </p>
              <span>{index + 1}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.MaSinhVien}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.HoTen}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.TenLop}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.TenKhoa}</span>
            </td>
          </tr>
          <tr className={style.Table_Row}>
            <td></td>
            <td colSpan={5}>
              <div
                className={clsx(
                  style.FormData,
                  DropDown === index && style.Active_Form
                )}
              >
                <div className={style.InfoDetail_title}>Thông tin thêm</div>
                <FormStudent
                  Read={ReadForm}
                  data={item}
                  contentBtn={contentBtn}
                  Submit={Submit}
                />
              </div>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableContent;
