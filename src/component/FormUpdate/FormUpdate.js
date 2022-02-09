import React, { useState } from "react";
import style from "./FormUpdate.module.css";
import FormStudent from "../FormStudent/FormStudent";
import { BiExit } from "react-icons/bi";
import clsx from "clsx";
import useAxios from "../../Helper/API";
function FormUpdate({ Open, setData, DataStudent, FindHistory, History }) {
  const [Tab, setTab] = useState(1);
  const ChangeTab = (id) => {
    setTab(id);
  };
  const { Client } = useAxios();
  const SumitUpdate = (form, ResetForm) => {
    form.delete("MaSinhVien");
    form.append("_method", "PATCH");
    // console.log(form.get("TonGiao"));
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
        alert("Bạn chưa cập nhật thành công!");
        console.log(err);
      });
  };
  // console.log(History);
  const GetDate = (date) => {
    date = new Date(date);
    return (
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "-" +
      date.getDate() +
      "/" +
      date.getMonth() +
      1 +
      "/" +
      date.getFullYear()
    );
  };
  const getContent = (Content) => {
    let NoiDung;
    NoiDung += <p> Người sửa: {Content.TenDangNhap} </p>;
    NoiDung += (
      <p>
        Nội dung:
        {Object.keys(Content.NoiDung).map(
          (item) => Content.NoiDung[item] + ","
        )}
      </p>
    );
    return NoiDung;
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
              FindHistory();
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
            <React.Fragment>
              <div>Lịch sử</div>
              <table border={1} className={style.TableHistory}>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Người sửa</th>
                    <th>Nội dung</th>
                  </tr>
                </thead>
                <tbody>
                  {History.map((item, index) => {
                    const day = new Date(item.ThoiGian);
                    return (
                      <tr>
                        <td>{GetDate(item.ThoiGian)}</td>
                        <td>{item.TenDangNhap}</td>
                        <td>
                          {Object.keys(item.NoiDung).map((key) => (
                            <p>
                              {key} : {item.NoiDung[key]}
                            </p>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormUpdate;
