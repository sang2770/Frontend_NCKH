import React from "react";
import TextBox from "../TextBox/TextBox";
import ComboBox from "../ComboBox/ComboBox";
import style from "./FormStudent.module.css";
function FormStudent({ Read, data }) {
  return (
    <form className={style.FormStudent_Container}>
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
          title="Ngày sinh"
          subtitle="NgaySinh"
        />
      </div>
      <div className={style.Infor_Group}>
        <TextBox data={data} Read={Read} title="Nơi sinh" subtitle="NoiSinh" />
      </div>
      <div className={style.Infor_Group}>
        <TextBox data={data} Read={Read} title="Dân tộc" subtitle="DanToc" />
      </div>
      <div className={style.Infor_Group}>
        <TextBox data={data} Read={Read} title="Số điện thoại" subtitle="SDT" />
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
        {Read ? (
          <TextBox
            data={data}
            Read={Read}
            title="Tình trạng sinh viên"
            subtitle="TinhTrangSinhVien"
          />
        ) : (
          <ComboBox
            data={data}
            title="Tình trạng sinh viên"
            id="TinhTrangSinhVien"
            items={["Đang học", "Đã tốt nghiệp"]}
          />
        )}
      </div>
      <div className={style.Infor_Group}>
        <TextBox data={data} Read={Read} title="Nơi sinh" subtitle="NoiSinh" />
      </div>
      <div className={style.Infor_Group}>
        {Read ? (
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu tỉnh"
            subtitle="HoKhauTinh"
          />
        ) : (
          <ComboBox
            data={data}
            title="Hộ khẩu tỉnh"
            id="HoKhauTinh"
            items={["Chính quy"]}
          />
        )}
      </div>
      <div className={style.Infor_Group}>
        {Read ? (
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu huyện"
            subtitle="HoKhauHuyen"
          />
        ) : (
          <ComboBox
            data={data}
            title="Hộ khẩu huyện"
            id="HoKhauHuyen"
            items={["Chính quy"]}
          />
        )}
      </div>
      <div className={style.Infor_Group}>
        {Read ? (
          <TextBox
            data={data}
            Read={Read}
            title="Hộ khẩu xã phường"
            subtitle="HoKhauXaPhuong"
          />
        ) : (
          <ComboBox
            data={data}
            title="Hộ khẩu xã phường"
            id="HoKhauXa"
            items={["Chính quy"]}
          />
        )}
      </div>
      <div className={style.Infor_Group}>
        <TextBox data={data} Read={Read} title="Tôn giáo" subtitle="TonGiao" />
      </div>
      <div className={style.Infor_Group}>
        <TextBox
          data={data}
          Read={Read}
          title="Quốc tịch"
          subtitle="QuocTich"
        />
      </div>
    </form>
  );
}

export default FormStudent;
