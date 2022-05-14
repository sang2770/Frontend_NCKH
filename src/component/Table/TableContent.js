import React, { useEffect, useState } from "react";
import style from "./Table.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FormStudent from "../FormStudent/FormStudent";
import clsx from "clsx";
import useAxios from "../../Helper/API";
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
  ExportPape,
}) => {
  const [DropDown, setDropDown] = useState(-1);
  const ChangeDropDown = (id) => {
    if (id === DropDown) {
      setDropDown(-1);
    } else {
      setDropDown(id);
    }
  };
  useEffect(() => {
    setDropDown(-1);
  }, [data]);

  // Request Student
  const { Client } = useAxios();
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
  const Export = (id, Hoten, idYC) => {
    MSV.current.MaSinhVien = id;
    MSV.current.MaYeuCau = idYC;
    MSV.current.HoTen = Hoten;
    ExportPape();
  };
  return (
    <tbody>
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
                      onClick={() => ChangeDropDown(index)}
                    >
                      <IoIosArrowDown />
                    </p>
                  )}
                  <span>{index + 1}</span>
                </div>
              </td>
              <td className={style.Table_Column}>
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
                    // console.log(item.MaSinhVien);
                    Export(item.MaSinhVien, item.HoTen, item.MaYeuCau);
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
                    DropDown === index && style.Active_Form
                  )}
                >
                  <div className={style.InfoDetail_title}>Thông tin thêm</div>
                  {/* <div className="">{item.MaSinhVien}</div> */}
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
