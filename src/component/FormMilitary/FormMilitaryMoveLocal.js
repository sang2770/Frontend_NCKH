import React, { useRef } from "react";
import style from "./FormMilitary.module.css";
import ElementForm from "../ElementMiliFrom/ElementForm";
import ElementForm2 from "../ElementMiliFrom/ElementForm2";
import Button from "../ButtonMiliNoti/Button";

function FormMilitaryMoveLocal({
  maintitles,
  titles,
  subtitles,
  Submit,
  onClickSave,
  onClickBack,
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
    <React.Fragment>
      <form className={style.Form_main} onSubmit={SubmitForm}>
        <h1 className={style.form_title}>
          {maintitles}
        </h1>
        <div className={style.Form_Container}>
          <div className={style.FormItem}>
            <ElementForm title={titles[0]} subtitle={subtitles[0]}/>
          </div>
          <div className={style.FormItem}>
            <ElementForm2 title={titles[1]} subtitle={subtitles[1]} />
          </div>
          <div className={style.FormItem}>
            <ElementForm title={titles[2]} subtitle={subtitles[2]} />
          </div>
          <div className={style.FormItem}>
            <ElementForm title={titles[3]} subtitle={subtitles[3]} />
          </div>
          <div className={style.FormItem}>
            <ElementForm title={titles[4]} subtitle={subtitles[4]} />
          </div>
          <div className={style.FormItem}>
            <ElementForm title={titles[5]} subtitle={subtitles[5]} />
          </div>
        </div>
        <div className={style.Button_register}>
          <Button content="Lưu" onClick={onClickSave} />
          <Button content="Trở lại" onClick={onClickBack} />
        </div>
      </form>
  </React.Fragment>
  );
}

export default FormMilitaryMoveLocal;
