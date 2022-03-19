import React, { useRef } from "react";
import style from "./FormMilitary.module.css";
import ElementForm from "../ElementMiliFrom/ElementForm";
import Button from "../ButtonMiliNoti/Button";

function FormMilitary({
  titles,
  subtitles,
  Submit,
  onClickSave,
  onClickBack,
  data,
}) {
  const Form = useRef();
  const SubmitForm = (e) => {
    e.preventDefault();
    Form.current = e.target;
    const form = new FormData(e.target);
    Submit(form, ResetForm);
  };
  const ResetForm = () => {
    Form.current.reset();
  };

  return (
    <form className={style.Form_main} onSubmit={SubmitForm}>
      <h1 className={style.form_title}>
        Giấy Xác Nhận Đăng Ký Nghĩa Vụ Quân Sự
      </h1>
      <div className={style.Form_Container}>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[0]} subtitle={subtitles[0]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[1]} subtitle={subtitles[1]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[2]} subtitle={subtitles[2]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[3]} subtitle={subtitles[3]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[4]} subtitle={subtitles[4]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[5]} subtitle={subtitles[5]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[6]} subtitle={subtitles[6]} />
        </div>
        <div className={style.FormItem}>
          <ElementForm data={data} title={titles[7]} subtitle={subtitles[7]} />
        </div>
      </div>
      <hr />
      <h1 className={style.form_title}>
        Giấy Giới Thiệu Di Chuyển Nghĩa Vụ Quân Sự
      </h1>
      <div className={style.Form_ContainerMove}>
        <div className={style.FormItemMove}>
          <ElementForm data={data} title={titles[8]} subtitle={subtitles[8]} />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm data={data} title={titles[9]} subtitle={subtitles[9]} />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[10]}
            subtitle={subtitles[10]}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[11]}
            subtitle={subtitles[11]}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[12]}
            subtitle={subtitles[12]}
          />
        </div>
        <div className={style.FormItemMove}>
          <ElementForm
            data={data}
            title={titles[13]}
            subtitle={subtitles[13]}
          />
        </div>
      </div>
      <div className={style.Button_register}>
        {data ? (
          <Button content="Cập nhật" />
        ) : (
          <React.Fragment>
            <Button content="Lưu" onClick={onClickSave} />
            <Button content="Trở lại" onClick={onClickBack} />
          </React.Fragment>
        )}
      </div>
    </form>
  );
}

export default FormMilitary;
