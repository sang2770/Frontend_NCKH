import React, { useState, useRef, useContext } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { RiUserSettingsFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import TextBox from "../../../component/TextBox/TextBox";
import Button from "../../../component/Button/Button";
import style from "./UpdateStudent.module.css";
import useAxios from "../../../Helper/API";
import FormUpdate from "../../../component/FormUpdate/FormUpdate";
import LoadingEffect from "../../../component/Loading/Loading";
import clsx from "clsx";
import { BsFillPeopleFill } from "react-icons/bs";
import FileTemplate from "../../../component/FileTemplate/FileTemplate";
import { DataContext } from "../../../DataContext/DataContext";
import ComboBox from "../../../component/ComboBox/ComboBox";
import { FormatInput } from "../../../Helper/Date";
function UpdateStudent() {
  const [data, setData] = useState();
  const { Client, Loading } = useAxios();
  const Filter = useRef("");
  const [Err, setErr] = useState(false);
  const [ErrImport, setErrImport] = useState();
  const [openFileTemplate, setOpenFileTemplate] = useState(false);
  const [Open, setOpen] = useState(false);
  const [History, setHistory] = useState([]);
  const [Tab, setTab] = useState(1);

  const ChangeTab = (id) => {
    // setErrAdd(null);
    setTab(id);
    setErrImport(false);
  };
  const Search = () => {
    Client.get("/student-management/user/" + Filter.current.value)
      .then((res) => {
        console.log(Filter.current.value);

        if (res.data.status === "Success") {
          if (!res.data.data.TinhTrangSinhVien.includes("Đang học")) {
            res.data.data.TenLop = "";
          }
          console.log(Filter.current.value);

          setData(res.data.data);
          setErr(false);
        } else {
          setErr(res.data.Err_Message);
        }
      })
      .catch((err) => {
        // console.log(err);
        setErr(["Not Found!"]);
      });
  };
  const FindHistory = () => {
    console.log(Filter.current.value);
    Client.get("student-management/user-history/" + Filter.current.value)
      .then((res) => {
        // console.log(res);
        if (res.data.status === "Success") {
          setHistory(res.data.data);
        }
      })
      .catch((err) => {
        // alert("Có lỗi");
        console.log(err);
      });
  };
  const OpenForm = () => {
    setOpen(!Open);
  };
  const ImportTemplate = async (e, path) => {
    e.preventDefault();
    const MyData = new FormData(e.target);
    MyData.append("_method", "put");
    MyData.set("NgayQuyetDinh", FormatInput(MyData.get("NgayQuyetDinh")));
    try {
      const Result = await Client.post(path, MyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(Result.data);
      if (Result.data.status === "Success") {
        alert("Bạn đã cập nhật thành công");
        setErrImport();
        e.target.reset();
      } else {
        alert(Result.data.Err_Message);
        setErrImport(Result.data.infor);
      }
    } catch (error) {
      alert("Có lỗi");
    }
  };
  const ImportFile = async (e) => {
    ImportTemplate(e, "/student-management/users");
  };
  const { Khoa } = useContext(DataContext);
  return (
    <div className={style.UpdateStudent_container}>
      {openFileTemplate && (
        <FileTemplate
          Open={() => {
            setOpenFileTemplate(!openFileTemplate);
          }}
        />
      )}
      {Open && (
        <FormUpdate
          Open={OpenForm}
          setData={setData}
          DataStudent={data}
          FindHistory={FindHistory}
          History={History}
        />
      )}
      <HeaderTitle Title="Cập nhật sinh viên" Icon={<RiUserSettingsFill />} />
      <div className={style.Update_Filter}>
        <ul className={style.UpdateStudent_Tab}>
          <li
            className={clsx(style.Tab_item, Tab === 1 && style.Active_Tab)}
            onClick={() => {
              ChangeTab(1);
            }}
          >
            Cập nhật sinh viên
          </li>
          <li
            className={clsx(style.Tab_item, Tab === 2 && style.Active_Tab)}
            onClick={() => {
              ChangeTab(2);
            }}
          >
            Cập nhật trạng thái sinh viên
          </li>
        </ul>

        <div className={style.Content}>
          {Tab === 1 ? (
            <React.Fragment>
              <div className={style.Update_Filter_Tilte}>
                <div className={style.Title_IconSearch}>
                  <AiOutlineSearch />
                </div>
                <div className={style.Title_Content}>
                  Tìm kiếm sinh viên cần cập nhật
                </div>
              </div>
              <div className={style.Update_Filter}>
                <div className={style.Update_Filter_Item}>
                  <TextBox
                    search={true}
                    title="Mã sinh viên"
                    subtitle="MaSinhVien"
                    Ref={Filter}
                  />
                </div>
              </div>
              <Button
                content="Tìm kiếm"
                styles={{ marginLeft: "20px" }}
                onClick={Search}
              />
              <div className={style.ResultSearch}>
                <h2 className={style.ResultSearch_Tilte}> Kết quả tìm kiếm</h2>
                {Loading && <LoadingEffect />}
                {Err && (
                  <h3 className={style.NotFound}>Không tìm thấy kết quả</h3>
                )}
                {data && !Err && (
                  <div className={style.ResultInf}>
                    <table className={style.ResultTable}>
                      <thead>
                        <tr>
                          <th>Mã sinh viên</th>
                          <th>Họ và tên</th>
                          <th>Tên lớp</th>
                          <th>Tên Khoa</th>
                          <th>Tình trạng sinh viên</th>
                          <th>Lựa chọn</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{data.MaSinhVien}</td>
                          <td>{data.HoTen}</td>
                          <td>{data.TenLop}</td>
                          <td>{data.TenKhoa}</td>
                          <td>{data.TinhTrangSinhVien}</td>
                          <td className={style.OptionGroup}>
                            <div
                              className={style.OptionUpdate}
                              onClick={OpenForm}
                            >
                              Sửa
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={style.FileTemplate}>
                <div className={style.Update_Filter_Tilte}>
                  <div className={style.Title_IconSearch}>
                    <BsFillPeopleFill />
                  </div>
                  <div className={style.Title_Content}>
                    Bạn hãy chọn file để cập nhật trạng thái sinh viên
                  </div>
                </div>

                <Button
                  content="Chọn File"
                  styles={{ backgroundColor: "#2980b9" }}
                  onClick={() => {
                    setOpenFileTemplate(!openFileTemplate);
                  }}
                />
              </div>
              <hr />
              <form className={style.FormImport} onSubmit={ImportFile}>
                <div className={style.FormImport_Group}>
                  <div className={style.Infor_Group}>
                    <TextBox
                      search={true}
                      title="Số quyết định"
                      subtitle="SoQuyetDinh"
                    />
                  </div>
                  <div className={style.Infor_Group}>
                    <TextBox
                      search={true}
                      title="Ngày quyết định"
                      subtitle="NgayQuyetDinh"
                    />
                  </div>
                  <div className={style.Infor_Group}>
                    <ComboBox title="Khoa" id="Khoa" items={Khoa} />
                  </div>
                  <div className={style.Infor_Group}>
                    <ComboBox
                      title="Tình trạng sinh viên"
                      id="TinhTrangSinhVien"
                      items={[
                        "Đã tốt nghiệp",
                        "Thôi học",
                        "Bảo lưu",
                        "Đang học",
                      ]}
                    />
                  </div>
                </div>
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
    </div>
  );
}

export default UpdateStudent;
