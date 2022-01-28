import React, { useState } from "react";
import style from "./FormUpdate.module.css";
import FormStudent from "../FormStudent/FormStudent";
import { BiExit } from "react-icons/bi";
import clsx from "clsx";
import useAxios from "../../Helper/API";
function FormUpdate({ Open, setData, DataStudent }) {
  const [Tab, setTab] = useState(1);
  const ChangeTab = (id) => {
    setTab(id);
  };
  const Client = useAxios();
  const SumitUpdate = (form, ResetForm) => {
    form.append("_method", "PATCH");
    console.log(form.get("TonGiao"));
    Client.post("/student-management/user/" + DataStudent.MaSinhVien, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          alert("Bạn đã cập nhật thành công!");
          setData(res.data.data);
        } else {
          alert("Bạn chưa cập nhật thành công!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.FormUpdate}>
      <div className={style.InfoUpdate}>
        <div className={style.Btn_Exit} onClick={Open}>
          <BiExit />
        </div>
        <h2 className={style.InfoTitle}>Thông tin cập nhật</h2>
        <ul className={style.TabUpdate}>
          <li
            className={clsx(style.TabItem, Tab === 1 && style.Active)}
            onClick={() => {
              ChangeTab(1);
            }}
          >
            Cập nhật
          </li>
          <li
            className={clsx(style.TabItem, Tab === 2 && style.Active)}
            onClick={() => {
              ChangeTab(2);
            }}
          >
            Lịch sử cập nhật
          </li>
        </ul>
        <div className={style.Content}>
          {Tab === 1 ? (
            <FormStudent
              contentBtn="Cập nhật"
              data={DataStudent}
              Submit={SumitUpdate}
            />
          ) : (
            <div>Lịch sử</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormUpdate;
