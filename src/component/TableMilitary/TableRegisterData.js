import React, { useState } from "react";
import style from "./TableMilitary.module.css";
import FormUpdateRegister from "../FormUpdateRegister/FormUpdateRegister";
import { FormatDate, FormatInput } from "../../Helper/Date";

const TableRegisterData = ({ data, titles, subtitles, loaddata, setLoaddata }) => {
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
      {DropDown > -1 && (
        <FormUpdateRegister
          data={data[DropDown]}
          titles={titles}
          subtitles={subtitles}
          loaddata = {loaddata}
          setLoaddata = {setLoaddata}
          exit={() => {
            ChangeDropDown(-1);
          }}
        />
      )}
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
                <span>{FormatInput(item.NgaySinh)}</span>
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
          </React.Fragment>
        ))}
    </tbody>
  );
};

export default TableRegisterData;
