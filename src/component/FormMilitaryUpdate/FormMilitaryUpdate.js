import React, { useRef } from "react";
import style from "./FormMilitaryUpdate.module.css";
import ElementForm from "../ElementMiliFrom/ElementForm";
import Button from "../ButtonMiliNoti/Button";
import useAxios from "../../Helper/API";

function FormMilitaryUpdate({ titles, subtitles, data, MSV }) {
  const { Client } = useAxios();
  //update
  // Update register
  const FilterSoDK = useRef("");
  const FilterNgayDK = useRef("");
  const FilterNoiDK = useRef("");
  const FilterDiaChi = useRef("");
  const FilterNgayNop = useRef("");
  // update MoveLocal
  const FilterSoGT = useRef("");
  const FilterNgayCap = useRef("");
  const FilterNoiOHT = useRef("");
  const FilterNoiChuyenDen = useRef("");
  const FilterBanChiHuy = useRef("");

  const updateRegister = () => {
    if (
      window.confirm("Bạn có muốn cập nhật giấy chứng nhận này không?") === true
    ) {
      Client.put(
        "/move-military-local-management/update-move-military-local/" +
          MSV +
          "?SoDangKy=" +
          FilterSoDK.current.value +
          "&NoiDangKy=" +
          FilterNoiDK.current.value +
          "&NgayDangKy=" +
          FilterNgayDK.current.value +
          "&DiaChiThuongTru=" +
          FilterDiaChi.current.value +
          "&NgayNop=" +
          FilterNgayNop.current.value +
          "&SoGioiThieu=" +
          FilterSoGT.current.value +
          "&NgayCap=" +
          FilterNgayCap.current.value +
          "&NoiOHienTai=" +
          FilterNoiOHT.current.value +
          "&NoiChuyenDen=" +
          FilterNoiChuyenDen.current.value +
          "&BanChiHuy=" +
          FilterBanChiHuy.current.value
      )
        .then((response) => {
          if (response.data.status === "Success updated") {
            alert("Bạn đã cập nhật thành công!!!");
          } else {
            alert("Not Found!");
          }
        })
        .catch((err) => {
          alert("Có lỗi!!!");
          console.log(err);
        });
    }
  };

  const Form = useRef();
  const SubmitForm = (e) => {
    e.preventDefault();
    Form.current = e.target;
    const form = new FormData(e.target);
    updateRegister(form, ResetFormUp);
  };
  const ResetFormUp = () => {
    Form.current.reset();
  };

  return (
    <form className={style.Form_main} onSubmit={SubmitForm}>
      <h1 className={style.form_title}>
        Giấy xác nhận đăng ký nghĩa vụ quân sự
      </h1>
      <div className={style.Form_Container}>
        <div className={style.FormItem}>
          <div className={style.Element_form}>
            <label htmlFor={subtitles[0]}>{titles[0]}:</label>
            <input
              id={subtitles[0]}
              type="text"
              name={subtitles[0]}
              defaultValue={data === undefined ? "" : data[subtitles[0]]}
              readOnly
            />
          </div>
        </div>
        <div className={style.FormItem}>
          <div className={style.Element_form}>
            <label htmlFor={subtitles[1]}>{titles[1]}:</label>
            <input
              id={subtitles[1]}
              type="text"
              name={subtitles[1]}
              defaultValue={data === undefined ? "" : data[subtitles[1]]}
              readOnly
            />
          </div>
        </div>
        <div className={style.FormItem}>
          <div className={style.Element_form}>
            <label htmlFor={subtitles[2]}>{titles[2]}:</label>
            <input
              id={subtitles[2]}
              type="text"
              name={subtitles[2]}
              defaultValue={data === undefined ? "" : data[subtitles[2]]}
              readOnly
            />
          </div>
        </div>
        <div className={style.FormItem}>
          <ElementForm
            data={data}
            title={titles[3]}
            subtitle={subtitles[3]}
            Ref={FilterNgayDK}
          />
        </div>
        <div className={style.FormItem}>
          <ElementForm
            data={data}
            title={titles[4]}
            subtitle={subtitles[4]}
            Ref={FilterSoDK}
          />
        </div>
        <div className={style.FormItem}>
          <ElementForm
            data={data}
            title={titles[5]}
            subtitle={subtitles[5]}
            Ref={FilterNoiDK}
          />
        </div>
        <div className={style.FormItem}>
          <ElementForm
            data={data}
            title={titles[6]}
            subtitle={subtitles[6]}
            Ref={FilterDiaChi}
          />
        </div>
        <div className={style.FormItem}>
          <ElementForm
            data={data}
            title={titles[7]}
            subtitle={subtitles[7]}
            Ref={FilterNgayNop}
          />
        </div>
      </div>
      <hr />
      <h1 className={style.form_title}>
        Giấy giới thiệu di chuyển nghĩa vụ quân sự
      </h1>
      <div className={style.Form_ContainerMove}>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[8]}
            subtitle={subtitles[8]}
            Ref={FilterSoGT}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[9]}
            subtitle={subtitles[9]}
            Ref={FilterBanChiHuy}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[10]}
            subtitle={subtitles[10]}
            Ref={FilterNgayCap}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[11]}
            subtitle={subtitles[11]}
            Ref={FilterNoiOHT}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[12]}
            subtitle={subtitles[12]}
            Ref={FilterNoiChuyenDen}
          />
        </div>
      </div>
      <div className={style.Button_register}>
        <Button content="Cập nhật" />
      </div>
    </form>
  );
}

export default FormMilitaryUpdate;
