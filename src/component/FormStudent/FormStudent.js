import React, { useRef, useContext, useState } from "react";
import TextBox from "../TextBox/TextBox";
import ComboBox from "../ComboBox/ComboBox";
import style from "./FormStudent.module.css";
import Button from "../Button/Button";
import { DataContext } from "../../DataContext/DataContext";
import Input from "../InputSQD/Input";

function FormStudent({ Read, data, contentBtn, Submit }) {
  const Form = useRef();
  const [OpenSKQ, setOpenSKQ] = useState(false);
  // const ChangeDateFormat = (date) => {
  //   const mydate = new Date(date);
  //   const str =
  //     mydate.getFullYear() +
  //     "/" +
  //     mydate.getMonth() +
  //     1 +
  //     "/" +
  //     mydate.getDate();
  //   return str;
  // };
  const SubmitForm = (e) => {
    e.preventDefault();
    if (data.TinhTrangSinhVien != "Đang học") {
      alert("Sinh viên này đã không còn quản lý");
      return;
    }
    Form.current = new FormData(e.target);
    if (Form.current.get("TinhTrangSinhVien") !== "Đang học") {
      setOpenSKQ(true);
    } else {
      Submit(Form.current, ResetForm);
    }
  };
  const ResetForm = () => {
    Form.current.reset();
  };
  const { Lop } = useContext(DataContext);
  return (
    <form className={style.FormStudent_Container} onSubmit={SubmitForm}>
      {OpenSKQ && (
        <Input
          submit={() => {
            Submit(Form.current, ResetForm);
          }}
          FormValue={Form.current}
          setOpenSKQ={setOpenSKQ}
          content="Bạn vừa thay đổi trạng thái sinh viên vui lòng nhập mã số quyết định"
        />
      )}
      <div className={style.InputGroup}>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Mã sinh viên"
            subtitle="MaSinhVien"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox data={data} Read={Read} title="Họ và tên" subtitle="HoTen" />
        </div>
        <div className={style.Infor_Group}>
          <TextBox data={data} Read={Read} title="Email" subtitle="Email" />
        </div>
        <div className={style.Infor_Group}>
          {Read ? (
            <TextBox
              data={data}
              Read={Read}
              title="Giới tính"
              subtitle="GioiTinh"
            />
          ) : (
            <ComboBox
              data={data}
              title="Giới tính"
              id="GioiTinh"
              items={["Nữ", "Nam"]}
            />
          )}
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            date={true}
            title="Ngày sinh"
            subtitle="NgaySinh"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Nơi sinh"
            subtitle="NoiSinh"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox data={data} Read={Read} title="Dân tộc" subtitle="DanToc" />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Số điện thoại"
            subtitle="SDT"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Địa chỉ báo tin"
            subtitle="DiaChiBaoTin"
          />
        </div>
        <div className={style.Infor_Group}>
          {Read ? (
            <TextBox
              data={data}
              Read={Read}
              title="Hệ đào tạo"
              subtitle="HeDaoTao"
            />
          ) : (
            <ComboBox
              data={data}
              title="Hệ đào tạo"
              id="HeDaoTao"
              items={["Chính quy", "Sau đại học"]}
            />
          )}
        </div>
        <div className={style.Infor_Group}>
          {Read || (data && data.TinhTrangSinhVien !== "Đang học") ? (
            <TextBox
              data={data}
              Read={true}
              title="Tình trạng sinh viên"
              subtitle="TinhTrangSinhVien"
            />
          ) : (
            <ComboBox
              data={data}
              title="Tình trạng sinh viên"
              id="TinhTrangSinhVien"
              items={["Đang học", "Đã tốt nghiệp", "Thôi học"]}
            />
          )}
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Nơi sinh"
            subtitle="NoiSinh"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu tỉnh"
            subtitle="HoKhauTinh"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu huyện"
            subtitle="HoKhauHuyen"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu xã phường"
            subtitle="HoKhauXaPhuong"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Tôn giáo"
            subtitle="TonGiao"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Quốc tịch"
            subtitle="QuocTich"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Số CMTND"
            subtitle="SoCMTND"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            date={true}
            title="Ngày Cấp CMTND"
            subtitle="NgayCapCMTND"
          />
        </div>
        <div className={style.Infor_Group}>
          <TextBox
            data={data}
            Read={Read}
            title="Nơi cấp CMTND"
            subtitle="NoiCapCMTND"
          />
        </div>
        <div className={style.Infor_Group}>
          {Read ? (
            <TextBox
              data={data}
              Read={Read}
              title="Tên lớp"
              subtitle="TenLop"
            />
          ) : (
            <ComboBox data={data} title="Tên lớp" id="TenLop" items={Lop} />
          )}
        </div>
      </div>
      {!Read && <Button content={contentBtn} styles={{ marginTop: "10px" }} />}
    </form>
  );
}

export default FormStudent;
