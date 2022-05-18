import React, { useEffect, useState } from "react";
import style from "./Table.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FormStudent from "../FormStudent/FormStudent";
import clsx from "clsx";
import useAxios from "../../Helper/API";
import FormExportConfirm from "../FormExportMove/FormExportConfirm";
// Check--Kiểm tra xem có phải là bảng yêu cầu k
const TableContent = ({
  data,
  ReadForm,
  contentBtn,
  Submit,
  TabelConfirm,
  Confirm,
  setConfirm,
  Confirmed,
  MSV,
}) => {
  const { Client } = useAxios();
  const [DropDown, setDropDown] = useState(-1);
  const [itemActive, setitemActive] = useState();
  const ChangeDropDown = (id) => {
    if (id === DropDown) {
      setDropDown(-1);
    } else {
      setDropDown(id);
      // Client.get("/student-management/user/" + id)
      //   .then((response) => {
      //     if (response.data.status === "Success") {
      //       setitemActive(response.data.data);
      //     }
      //   })
      //   .catch((err) => {});
    }
  };
  useEffect(() => {
    // console.log(data);
  }, [data]);

  // Request Student

  const ConfirmSingle = (id, MaYeuCau) => {
    // console.log(MaYeuCau);
    Client.post("/request-management/confirm/" + id, {
      MaYeuCau: MaYeuCau,
    })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "Success") {
          setConfirm(!Confirm);
        }
      })
      .catch((err) => {
        alert("Có lỗi");
        // console.log(err);
      });
  };
  
  const [DropDownShow, setDropDownShow] = useState(-3);
  const ChangeDropDownShow = (id) => {
    setDropDownShow(id);
  };

  return (
    <tbody>
      {DropDownShow > -3 && (
        <FormExportConfirm
          nameSV={MSV.current.HoTen}
          msv={MSV.current.MaSinhVien}
          mYC = {MSV.current.MaYeuCau}
          changeData={Confirm}
          setChangeData={setConfirm}
          exit={() => {
            ChangeDropDownShow(-3);
          }}
        />
      )}
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
            <tr className={style.Table_Row}>
              <td className={style.Table_Column}>
                <div className={style.Dropdown}>
                  {!TabelConfirm && (
                    <p
                      className={style.IconDropDown}
                      onDoubleClick={() => {
                        setDropDown(-1);
                      }}
                      onClick={() => ChangeDropDown(item.MaSinhVien)}
                    >
                      <IoIosArrowDown />
                    </p>
                  )}
                  <span>{index + 1}</span>
                </div>
              </td>
              <td className={clsx(style.Table_Column, style.text_center)}>
                <span>{item.MaSinhVien}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.HoTen}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{TabelConfirm ? item.LanXinCap : item.TenLop}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{TabelConfirm ? item.NgayYeuCau : item.TenKhoa}</span>
              </td>
              {TabelConfirm && (
                <td className={style.Table_Column}>
                  <span>{item.TrangThaiXuLy}</span>
                </td>
              )}
              {!Confirmed && TabelConfirm && (
                <td
                  className={clsx(style.Confirm, style.Table_Column)}
                  onClick={() => {
                    ConfirmSingle(item.MaSinhVien, item.MaYeuCau);
                  }}
                >
                  Xác nhận
                </td>
              )}
              {Confirmed && (
                <td
                  className={clsx(style.Confirm, style.Table_Column)}
                  onClick={() => {
                    MSV.current.MaSinhVien = item.MaSinhVien;
                    MSV.current.MaYeuCau = item.MaYeuCau;
                    MSV.current.HoTen = item.HoTen;
                    ChangeDropDownShow(index);
                  }}
                >
                  Cấp Giấy
                </td>
              )}
            </tr>
            <tr className={style.Table_Row}>
              <td></td>
              <td colSpan={5}>
                <div
                  className={clsx(
                    style.FormData,
                    DropDown === item.MaSinhVien && style.Active_Form
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
