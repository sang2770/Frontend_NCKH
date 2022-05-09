import React, { useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./AddStudent.module.css";
import clsx from "clsx";
import FormStudent from "../../../component/FormStudent/FormStudent";
import Button from "../../../component/Button/Button";
import useAxios from "../../../Helper/API";
import FileTemplate from "../../../component/FileTemplate/FileTemplate";
import { FormatInput } from "../../../Helper/Date";
import LoadingEffect from "../../../component/Loading/Loading";
function AddStudent() {
  const [Tab, setTab] = useState(1);
  const [ErrAdd, setErrAdd] = useState();
  const { Client, Loading } = useAxios();
  const Submit = async (form, ResetForm) => {
    form.set("NgaySinh", FormatInput(form.get("NgaySinh")));
    form.set("NgayCapCMTND", FormatInput(form.get("NgayCapCMTND")));
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
        // console.log(result.data.Err_Message);
      }
    } catch (error) {
      alert("Có lỗi! Vui lòng kiểm tra lại!");
      console.log(error);
      setErrAdd(Object.values(error.data.Err_Message));
    }
  };

  const [ErrImport, setErrImport] = useState();
  const ImportFile = async (e) => {
    ImportTemplate(e, "/student-management/users");
  };
  // console.log(ErrImport);
  const [openFileTemplate, setOpenFileTemplate] = useState(false);

  const ImportTemplate = async (e, path) => {
    e.preventDefault();
    const MyData = new FormData(e.target);
    try {
      const Result = await Client.post(path, MyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(Result.data);
      if (Result.data.status === "Success") {
        alert("Bạn đã import thành công");
        setErrImport();
      } else {
        alert(Result.data.Err_Message);
        setErrImport(Result.data.infor);
      }
    } catch (error) {
      alert("Có lỗi");
    }
    e.target.reset();
  };
  const ChangeTab = (id) => {
    setErrAdd(null);
    setErrImport(null);
    setTab(id);
  };
  return (
    <div className={style.AddStudent_container}>
      {Loading && <LoadingEffect />}
      {openFileTemplate && (
        <FileTemplate
          Open={() => {
            setOpenFileTemplate(!openFileTemplate);
          }}
        />
      )}
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
                        <tr key={index}>
                          <td>{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={style.FileTemplate}>
              <h3>Chọn File mẫu</h3>
              <Button
                content="Chọn File"
                styles={{ marginLeft: "10px", backgroundColor: "#2980b9" }}
                onClick={() => {
                  setOpenFileTemplate(!openFileTemplate);
                }}
              />
            </div>
            <form className={style.FormImport} onSubmit={ImportFile}>
              <input type="file" name="file" required />
              <Button content="Import" styles={{ marginTop: "10px" }} />
            </form>
            {ErrImport && (
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
                      {Object.keys(ErrImport).map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item}</td>
                            <td>{ErrImport[item]}</td>
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
