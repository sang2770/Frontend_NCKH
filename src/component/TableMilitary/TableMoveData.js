import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import style from "./TableMilitary.module.css";
import FormExportMove from "../FormExportMove/FormExportMove";
import TableMoveDetail from "../TableMoveDetail/TableMoveDetail";
import TableMoveDetailData from "../TableMoveDetail/TableMoveDetailData";
import useAxios from "../../Helper/API";
import clsx from "clsx";
import { FormatDate, FormatInput } from "../../Helper/Date";

const TableMoveData = ({ data, changeData, setChangeData }) => {
  const { Client } = useAxios();

  const [Err, setErr] = useState(null);

  const [MSV, setMSV] = useState();

  const changeMSV = (msv) => {
    setMSV(msv);
  };

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

  const [ListNgaycap, setListNgaycap] = useState([]);

  const list = (itemMSV) => {
    Client.get("move-military-management/move-military-detail/" + itemMSV) //viet api
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

  //ten sv
  const [Name, setName] = useState();
  const name = (itemMSV) => {
      Client.get(
        "/confirm-military-management/confirm-military-info/" + itemMSV
      )
      .then((response) => {
      if (response.data.status === "Success") {
          setName(response.data.data);
      }
      })
      .catch((err) => {
      setErr(true);
      });
  };
  
  return (
    <tbody>
      {DropDown > -1 && (
        <FormExportMove
          nameSV={Name}
          msv={MSV}
          changeData={changeData}
          setChangeData={setChangeData}
          exit={() => {
            ChangeDropDown(-1);
          }}
        />
      )}
      {data &&
        data.map((item, index) => (
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
                <span>{item.TinhTrangSinhVien}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.SoQuyetDinh}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{FormatInput(item.NgayQuyetDinh)}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.total}</span>
              </td>
              <td className={style.Table_Column}>
                <label
                  className={style.label}
                  onClick={() => {
                    changeMSV(item.MaSinhVien);
                    name(item.MaSinhVien);
                    ChangeDropDown(index);
                  }}
                >
                  C???p gi???y
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
                    Th??ng tin c??c l???n c???p gi???y x??c nh???n di chuy???n
                  </div>
                  <TableMoveDetail
                    Content={<TableMoveDetailData data={ListNgaycap} />}
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

export default TableMoveData;
