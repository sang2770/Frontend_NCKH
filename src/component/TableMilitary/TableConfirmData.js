import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import style from "./TableMilitary.module.css";
import TableConfirmDetail from "../TableConfirmDetail/TableConfirmDetail";
import TableConfirmDetailData from "../TableConfirmDetail/TableConfirmDetailData";
import useAxios from "../../Helper/API";
import clsx from "clsx";

const TableConfirmData = ({ data, changeData, setChangeData }) => {
  const [DropDown, setDropDown] = useState(-1);

  const ChangeDropDown = (id) => {
    setDropDown(id);
  };

  const ChangeDropDownHide = () => {
    setDropDown(-1);
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


  // Export
  const [MSV, setMSV] = useState();

  const changeMSV = (msv) => {
    setMSV(msv);
  };

  const Export = async () => {
    MSV &&
      Client.get(
        "/confirm-military-management/confirm-military-off?MaSinhVien=" + MSV,
        {
          responseType: "blob",
        }
      )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", Name + "_" + MSV + ".docx");
          document.body.appendChild(link);
          link.click();
          alert("Đã xuất file");
          setChangeData(!changeData);
        })
        .catch((err) => {
          setErr(true);
        });
  };
  return (
    <tbody>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <tr className={style.Table_Row}>
            <td className={clsx(style.Table_Column, style.stt)}>
              <h3 className={style.Td_First}>
                <p
                  className={style.IconDropDown}
                  onClick={() => {
                    ChangeDropDown(index);
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
                  changeMSV(item.MaSinhVien);
                  name(item.MaSinhVien);
                  Export();
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
                  DropDown === index && style.Active_Form
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
