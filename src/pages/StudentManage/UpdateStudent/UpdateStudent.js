import React, { useContext, useState, useEffect, useRef } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { RiUserSettingsFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import TextBox from "../../../component/TextBox/TextBox";
import Button from "../../../component/Button/Button";
import style from "./UpdateStudent.module.css";
import useAxios from "../../../Helper/API";
import FormUpdate from "../../../component/FormUpdate/FormUpdate";
import LoadingEffect from "../../../component/Loading/Loading";
function UpdateStudent() {
  const [data, setData] = useState();
  const { Client, Loading } = useAxios();
  const Filter = useRef("");
  const [Err, setErr] = useState([]);
  const [Open, setOpen] = useState(false);

  const [History, setHistory] = useState([]);

  const Search = () => {
    // console.log(Filter.current);
    Client.get("/student-management/user/" + Filter.current.value)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          // console.log("ok");
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
    Client.get("student-management/user-history/" + Filter.current.value)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          setHistory(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const OpenForm = () => {
    setOpen(!Open);
  };
  return (
    <div className={style.UpdateStudent_container}>
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
            <TextBox title="Mã sinh viên" subtitle="MaSinhVien" Ref={Filter} />
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
          {Err && <h3 className={style.NotFound}></h3>}
          {data && !Err && (
            <div className={style.ResultInf}>
              <table className={style.ResultTable}>
                <thead>
                  <tr>
                    <th>Mã sinh viên</th>
                    <th>Họ và tên</th>
                    <th>Tên lớp</th>
                    <th>Tên Khoa</th>
                    <th>Lựa chọn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.MaSinhVien}</td>
                    <td>{data.HoTen}</td>
                    <td>{data.TenLop}</td>
                    <td>{data.TenKhoa}</td>
                    <td className={style.OptionGroup}>
                      <div className={style.OptionUpdate} onClick={OpenForm}>
                        Sửa
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateStudent;
