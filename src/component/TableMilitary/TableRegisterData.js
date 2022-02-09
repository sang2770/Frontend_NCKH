import React, {useState} from "react";
import style from "./TableMilitary.module.css";
import useAxios from "../../Helper/API";
import FormUpdateRegister from "../FormUpdateRegisterMilitary/FormUpdateRegister";
import clsx from "clsx";

const titleForm = ["Họ và tên", "Mã sinh viên", "Ngày sinh", "Ngày đăng ký", "Số đăng ký", "Nơi đăng ký", "Địa chỉ thường trú", "Ngày nộp"];
const subtitles = ["HoTen", "MaSinhVien", "NgaySinh", "NgayDangKy", "SoDangKy", "NoiDangKy", "DiaChiThuongTru", "NgayNop"];

const TableRegisterData = ({ data }) => {

  const Client = useAxios();
  
  const [Err, setErr] = useState(null);

  const [MSV, setMSV] = useState();

  const changeMSV = (msv) => {
    setMSV(msv);
  }

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
        {data && data.map((item, index) => (
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
                <span>{item.NgayDangKy}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.NoiDangKy}</span>
              </td>
              <td className={style.Table_Column}>
                <span>{item.NgayNop}</span>
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
                  <div className={style.InfoDetail_title}>Thông tin giấy chứng nhận nghĩa vụ quân sự</div>
                  <FormUpdateRegister 
                    MSV = {item.MaSinhVien}
                    titles={titleForm} 
                    subtitles = {subtitles}
                    data = {item}
                    onClickBack = {ChangeDropDownHide}
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
