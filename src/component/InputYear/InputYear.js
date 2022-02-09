import React, { useRef } from "react";
import useAxios from "../../Helper/API";
import Button from "../Button/Button";
import style from "./Input.module.css";
import queryString from "query-string";
import { BiExit } from "react-icons/bi";

function InputYear({ filter, setOpenExport }) {
  const Year = useRef();
  const { Client } = useAxios();
  const ExportPape = () => {
    const stringify = queryString.stringify(filter);
    // console.log(stringify);
    Client.get(
      "confirm-military-management/confirm-military?" +
        stringify +
        "&NamHoc=" +
        Year.current.value,
      {
        responseType: "blob",
      }
    )
      .then((response) => {
        // console.log(response.data);
        if (!response.data.status) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "GXN.docx"); //or any other extension
          document.body.appendChild(link);
          link.click();
          alert("Xuất thành công");
        } else {
          alert("Có lỗi vui lòng thử lại");
        }
      })
      .catch((err) => {
        // console.log(err);
        alert("Có lỗi vui lòng thử lại");
      });
    setOpenExport(false);
  };
  return (
    <div className={style.InputYear_Container}>
      <div className={style.Container}>
        <div
          className={style.BtnExit}
          onClick={() => {
            setOpenExport(false);
          }}
        >
          <BiExit />
        </div>
        <div className={style.InputYear_Title}>Vui lòng nhập năm học</div>
        <div className={style.Input}>
          <input type="text" name="Year" ref={Year} required />
          <Button content="Xuất File" onClick={ExportPape} />
        </div>
      </div>
    </div>
  );
}

export default InputYear;
