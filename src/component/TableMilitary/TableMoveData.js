import React, { useState } from "react";
import style from "./TableMilitary.module.css";
import useAxios from "../../Helper/API";

const TableMoveData = ({ data, changeData, setChangeData }) => {
  const { Client } = useAxios();

  const [Err, setErr] = useState(null);

  const [MSV, setMSV] = useState();

  const changeMSV = (msv) => {
    setMSV(msv);
  };
  // Export
  const Export = async () => {
    MSV &&
      Client.get("/move-military-management/move-military?MaSinhVien=" + MSV, {
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "GiayDiChuyenNVQS.docx");
          document.body.appendChild(link);
          link.click();
          alert("Đã xuất file");
          setChangeData(!changeData);
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "GiayDiChuyenNVQS.docx");
          document.body.appendChild(link);
          link.click();
          alert("Đã xuất file");
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
              <span>{item.TinhTrangSinhVien}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.NgayCap ? "Đã cấp giấy" : "Chưa cấp giấy"}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.SoQuyetDinh}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.NgayQuyetDinh}</span>
            </td>
            <td className={style.Table_Column}>
              <label
                className={style.label}
                onClick={() => {
                  changeMSV(item.MaSinhVien);
                  Export();
                }}
              >
                Cấp giấy
              </label>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableMoveData;
