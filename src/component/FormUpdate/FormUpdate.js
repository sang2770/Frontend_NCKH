import React, { useState } from "react";
import style from "./FormUpdate.module.css";
import FormStudent from "../FormStudent/FormStudent";
import { BiExit } from "react-icons/bi";
import clsx from "clsx";
import useAxios from "../../Helper/API";
import LoadingEffect from "../Loading/Loading";
function FormUpdate({ Open, setData, DataStudent, FindHistory, History }) {
  const [Tab, setTab] = useState(1);
  const ChangeTab = (id) => {
    setTab(id);
  };
  const [ErrUpdate, setErrUpdate] = useState();
  const [ErrTitle, setErrTitle] = useState();
  const { Client, Loading } = useAxios();
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
        // console.log(res);
        if (res.data.status === "Success") {
          alert("Bạn đã cập nhật thành công!");
          setErrUpdate(null);
          setErrTitle(null);
          setData(res.data.data);
        } else {
          // console.log(res.data);
          setErrTitle(res.data.Err_Message);
          alert("Bạn chưa cập nhật thành công!");
        }
      })
      .catch((err) => {
        // console.log(err);
        setErrUpdate(err.data.info);
        setErrTitle(err.data.Err_Message);
        alert("Bạn chưa cập nhật thành công!");
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
  return (
    <div className={style.FormUpdate}>
      {Loading && <LoadingEffect />}
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
            <React.Fragment>
              <FormStudent
                contentBtn="Cập nhật"
                data={DataStudent}
                Submit={SumitUpdate}
              />
              {ErrTitle && <div className={style.ErrTitleMess}>{ErrTitle}</div>}
              {ErrUpdate && (
                <div className={style.Err_container}>
                  <h2 className={style.ErrTitle}>Có Lỗi!!!</h2>
                  <div className={style.ResultImport}>
                    <table className={style.TableErr} border={1}>
                      <thead>
                        <tr>
                          <th>Nội dung</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ErrUpdate.map((item, index) => (
                          <tr key={index}>{item}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </React.Fragment>
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
