import React from "react";
import FormMilitaryUpdate from "../FormMilitaryUpdate/FormMilitaryUpdate";
import style from "./FormUpdateRegister.module.css";
import { BiExit } from "react-icons/bi";

function FormUpdateRegister({ data, titles, subtitles, exit, loaddata, setLoaddata }) {
  return (
    <div className={style.FormUpdate}>
      <div className={style.InfoUpdate}>
        <div className={style.FormUpdate_Container}>
          <div className={style.Btn_Exit} onClick={exit}>
            <BiExit />
          </div>
          <FormMilitaryUpdate
            loaddata = {loaddata}
            setLoaddata = {setLoaddata}
            titles={titles}
            subtitles={subtitles}
            data={data}
            MSV={data.MaSinhVien}
          />
        </div>
      </div>
    </div>
  );
}

export default FormUpdateRegister;
