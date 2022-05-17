import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import style from "./TableMilitary.module.css";
import TableConfirmDetail from "../TableConfirmDetail/TableConfirmDetail";
import TableConfirmDetailData from "../TableConfirmDetail/TableConfirmDetailData";
import useAxios from "../../Helper/API";
import clsx from "clsx";
import { FormatDate, FormatInput } from "../../Helper/Date";
import FormExportConfirm from "../FormExportMove/FormExportConfirm";

const TableConfirmData = ({ data, changeData, setChangeData }) => {

  const [DropDown, setDropDown] = useState(-1);
  const ChangeDropDown = (id) => {
    setDropDown(id);
  };

  ///hien thi danh sach cac lan cap giay
  const [DropDownShow, setDropDownShow] = useState(-3);

  const ChangeDropDownShow = (id) => {
    setDropDownShow(id);
  };

  const ChangeDropDownHide = () => {
    setDropDownShow(-3);
  };

  const { Client } = useAxios();

  const [Err, setErr] = useState(null);

  const [ListNgaycap, setListNgaycap] = useState([]);

  const list = (itemMSV) => {
    Client.get(
      "/move-military-local-management/show-time-move-military-local/" + itemMSV
    ) //viet api
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setListNgaycap(List.data);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  };

  const Info = useRef({
    MaSinhVien: null,
    HoTen: null,
  });

  return (
    <tbody>
      {DropDown > -1 && (
        <FormExportConfirm
          nameSV={Info.current.HoTen}
          msv={Info.current.MaSinhVien}
          changeData={changeData}
          setChangeData={setChangeData}
          exit={() => {
            ChangeDropDown(-1);
          }}
        />
      )}
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <tr className={style.Table_Row}>
            <td className={clsx(style.Table_Column, style.stt)}>
              <h3 className={style.Td_First}>
                <p
                  className={style.IconDropDown}
                  onClick={() => {
                    ChangeDropDownShow(index);
                    list(item.MaSinhVien);
                  }}
                >
                  <IoIosArrowDown />
                </p>
                <span>{index + 1}</span>
              </h3>
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
              <span>{item.total}</span>
            </td>
            <td className={style.Table_Column}>
              <label
                className={style.label}
                onClick={() => {
                  Info.current.MaSinhVien = item.MaSinhVien;
                  Info.current.HoTen = item.HoTen;
                  ChangeDropDown(index);
                }}
              >
                Cấp giấy
              </label>
            </td>
          </tr>
          <tr className={style.Table_Row}>
            <td></td>
            <td colSpan={20}>
              <div
                className={clsx(
                  style.FormData,
                  DropDownShow === index && style.Active_Form
                )}
              >
                <div className={style.InfoDetail_title}>
                  Thông tin các lần cấp giấy xác nhận
                </div>
                <TableConfirmDetail
                  Content={<TableConfirmDetailData data={ListNgaycap} />}
                  onClickHide={ChangeDropDownHide}
                />
              </div>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableConfirmData;
