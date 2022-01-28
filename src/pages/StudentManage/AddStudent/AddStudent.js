import React, { useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./AddStudent.module.css";
import clsx from "clsx";
import FormStudent from "../../../component/FormStudent/FormStudent";
import Button from "../../../component/Button/Button";
import useAxios from "../../../Helper/API";
function AddStudent() {
  const [Tab, setTab] = useState(1);
  const ChangeTab = (id) => {
    setTab(id);
  };
  const [ErrAdd, setErrAdd] = useState();
  const Client = useAxios();
  const Submit = async (form, ResetForm) => {
    console.log(form);
    try {
      const result = await Client.post("/student-management/user", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      if (result.data.status !== "Failed") {
        alert("Bạn đã thêm thành công!");
        setErrAdd(null);
        ResetForm();
      } else {
        alert("Có lỗi");
        setErrAdd([result.data.Err_Message]);
        console.log(result.data.Err_Message);
      }
    } catch (error) {
      alert("Có lỗi! Vui lòng kiểm tra lại!");
      console.log(error);
      setErrAdd(Object.values(error.data.Err_Message));
    }
  };

  const [ErrImport, setErrImport] = useState([]);
  const ImportFile = async (e) => {
    e.preventDefault();
    const MyData = new FormData(e.target);
    try {
      const Result = await Client.post("/student-management/users", MyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (Result.data.status === "Success") {
        alert("Bạn đã import thành công");
        setErrImport([]);
      } else {
        setErrImport(Result.data.infor);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.AddStudent_container}>
      <HeaderTitle Title="Thêm mới sinh viên" Icon={<BsPersonPlusFill />} />
      <ul className={style.AddStudent_Tab}>
        <li
          className={clsx(style.Tab_item, Tab === 1 && style.Active_Tab)}
          onClick={() => {
            ChangeTab(1);
          }}
        >
          Thêm một sinh viên
        </li>
        <li
          className={clsx(style.Tab_item, Tab === 2 && style.Active_Tab)}
          onClick={() => {
            ChangeTab(2);
          }}
        >
          Import File
        </li>
      </ul>
      <div className={style.Tab_Content}>
        {Tab === 1 ? (
          <React.Fragment>
            <FormStudent contentBtn="Thêm" Submit={Submit} />
            {ErrAdd && (
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
                      {ErrAdd.map((item, index) => (
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
            <form className={style.FormImport} onSubmit={ImportFile}>
              <input type="file" name="file" required />
              <Button content="Import" styles={{ marginTop: "10px" }} />
            </form>
            {ErrImport.length > 0 && (
              <div className={style.Err_container}>
                <h2 className={style.ErrTitle}>Có Lỗi!!!</h2>
                <div className={style.ResultImport}>
                  <table className={style.TableErr} border={1}>
                    <thead>
                      <tr>
                        <th>Hàng</th>
                        <th>Nội dung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ErrImport.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.row}</td>
                            <td>{item.err[0]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default AddStudent;
