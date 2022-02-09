import React, {useState, useRef} from "react";
import style from "./TableMilitary.module.css";
import FormUpdateRegister from "../FormUpdateRegisterMilitary/FormUpdateRegister";
import clsx from "clsx";
import { TiDeleteOutline } from "react-icons/ti";

const titleForm = ["Họ và tên", "Mã sinh viên", "Số giới thiệu", "Ban chỉ huy", "Ngày cấp", "Ngày hết hạn", "Nơi ở hiện tại", "Nơi chuyển đến"];
const subtitles = ["HoTen", "MaSinhVien", "SoGioiThieu", "BanChiHuy", "NgayCap", "NgayHH", "NoiOHienTai", "NoiChuyenDen"];

const TableMoveLocalData = ({ data }) => {

  // show hide
  const [DropDown, setDropDown] = useState(-1);

  const ChangeDropDown = (id) => {
    setDropDown(id);
  };

  const ChangeDropDownHide = () => {
    setDropDown(-1);
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
              <span>{item.SoGioiThieu}</span>
            </td>
            <td className={style.Table_Column}>
              <span>{item.BanChiHuy}</span>
            </td>
            <td className={style.Table_Column}>
                <label 
                  className={style.label} 
                  onClick={() => {
                    ChangeDropDown(index)
                  }}
                >Sửa</label>
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
                  <label className={style.InfoDetail_label} onClick={ChangeDropDownHide}>
                    <TiDeleteOutline/>
                  </label>
                  <label className={style.InfoDetail_title}>
                    Thông tin giấy giới thiệu di chuyển từ địa phương
                  </label>
                </div>
                <FormUpdateRegister 
                  MaGiayDC_DK={item.MaGiayDC_DP}
                  titles={titleForm} 
                  subtitles = {subtitles}
                  data = {item}
                  onClickBack = {ChangeDropDownHide}
                  Tab = "false"
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

export default TableMoveLocalData;
