import React, { useState } from "react";
import style from "./TableMilitary.module.css";
import clsx from "clsx";
import { TiDeleteOutline } from "react-icons/ti";
import FormMilitaryUpdate from "../FormMilitaryUpdate/FormMilitaryUpdate";

const TableRegisterData = ({ data, titles, subtitles }) => {
  // show hide
  const [DropDown, setDropDown] = useState(-1);

  const ChangeDropDown = (id) => {
    setDropDown(id);
  };

  const ChangeDropDownHide = () => {
    setDropDown(-1);
  };

  return (
    <tbody className={style.tbodyMiti}>
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
            <tr className={style.Table_Row}>
              <td className={style.Table_Column}>
                <span>{index + 1}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.HoTen}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.MaSinhVien}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.NgaySinh}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.TenLop}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.TenKhoa}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.Khoas}</span>
              </td>
              <td className={style.Table_Column}>
                <label
                  className={style.label}
                  onClick={() => {
                    ChangeDropDown(index);
                  }}
                >
                  Sửa
                </label>
              </td>
            </tr>
            <tr className={style.Table_Row}>
              <td></td>
              <td colSpan={20}>
                <div
                  className={clsx(
                    style.FormData,
                    DropDown === index && style.Active_Form
                  )}
                >
                  <div className={style.InfoDetail}>
                    <label
                      className={style.InfoDetail_label}
                      onClick={ChangeDropDownHide}
                    >
                      <TiDeleteOutline />
                    </label>
                  </div>
                  <FormMilitaryUpdate
                    titles={titles}
                    subtitles={subtitles}
                    data={item}
                    MSV={item.MaSinhVien}
                  />
                  <hr></hr>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
    </tbody>
  );
};

export default TableRegisterData;
