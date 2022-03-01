import React, { useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import Button from "../../component/Button/Button";
import HeaderTitle from "../../component/HeaderTitle/HeaderTitle";
import style from "./AddInfomation.module.css";
import clsx from "clsx";
import useAxios from "../../Helper/API";
import LoadingEffect from "../../component/Loading/Loading";
import FileTemplate from "../../component/FileTemplate/FileTemplate";
function AddInformation() {
  const { Client, Loading } = useAxios();
  const [openFileTemplate, setOpenFileTemplate] = useState(false);

  const [KhoaImport, setKhoaImport] = useState(true);
  const ChangeTab = (id) => {
    setErrAdd(null);
    setErrImport(null);
    setTab(id);
  };
  const [ErrImport, setErrImport] = useState();

  const [Tab, setTab] = useState(1);
  const [ErrAdd, setErrAdd] = useState();

  const ImportKhoa = (e) => {
    ImportTemplate(e, "/student-management/majors");
  };
  const ImportLop = (e) => {
    ImportTemplate(e, "/student-management/class");
  };
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
      // console.log(error);
      // setErrImport([error.message]);
    }
    e.target.reset();
  };
  return (
    <React.Fragment>
      <div className={style.Add_Container}>
        {Loading && <LoadingEffect />}
        {openFileTemplate && (
          <FileTemplate
            Open={() => {
              setOpenFileTemplate(!openFileTemplate);
            }}
          />
        )}
        <HeaderTitle
          Title="Bổ sung thông tin lớp và khoa"
          Icon={<HiOutlineViewGridAdd />}
        />
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
        <ul className={style.AddStudent_Tab}>
          <li
            className={clsx(style.Tab_item, KhoaImport && style.Active_Tab)}
            onClick={() => {
              setKhoaImport(true);
            }}
          >
            Thêm danh sách khoa
          </li>
          <li
            className={clsx(style.Tab_item, !KhoaImport && style.Active_Tab)}
            onClick={() => {
              setKhoaImport(false);
            }}
          >
            Thêm danh sách lớp
          </li>
        </ul>
        <div className={style.Import_Content_Class_Major}>
          {KhoaImport ? (
            <React.Fragment>
              <div className={style.Title_Import}>Chọn File để thêm Khoa</div>
              <form className={style.FormImport} onSubmit={ImportKhoa}>
                <input type="file" name="file" required />
                <Button content="Import" styles={{ marginTop: "10px" }} />
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={style.Title_Import}>Chọn File để thêm Lớp</div>

              <form className={style.FormImport} onSubmit={ImportLop}>
                <input type="file" name="file" required />
                <Button content="Import" styles={{ marginTop: "10px" }} />
              </form>
            </React.Fragment>
          )}
        </div>
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
      </div>
    </React.Fragment>
  );
}

export default AddInformation;
