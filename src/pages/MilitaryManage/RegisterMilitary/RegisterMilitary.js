import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import { BsSearch, BsPersonPlusFill } from "react-icons/bs";
import TableMilitary from "../../../component/TableMilitary/TableMilitary";
import TableRegisterData from "../../../component/TableMilitary/TableRegisterData";
import Pagination from "../../../component/Pagination/Pagination";
import useAxios from "../../../Helper/API";
import queryString from "query-string";
import { DataContext } from "../../../DataContext/DataContext";
import Style from "./RegisterMilitary.module.css";
import style from "../../StudentManage/ListStudent/ListStudent";
import Button from "../../../component/ButtonMiliNoti/Button";
import clsx from "clsx";
import FormMilitary from "../../../component/FormMilitary/FormMilitary";
import ErrorImport from "../../../component/ErrImport/ErrorImport";

const tableHeaders = ["Họ và tên", "MSV", "Ngày sinh", "Lớp", "Khoa", "Khóa", "Ngày đăng ký", "Nơi đăng ký", "Ngày nộp", "Chọn"];
const titleForm = ["Họ và tên", "Mã sinh viên", "Ngày sinh", "Ngày đăng ký", "Số đăng ký", "Nơi đăng ký", "Địa chỉ thường trú", "Ngày nộp"];
const subtitles = ["HoTen", "MaSinhVien", "NgaySinh", "NgayDangKy", "SoDangKy", "NoiDangKy", "DiaChiThuongTru", "NgayNop"];

function RegisterMilitary() {
  const { Client } = useAxios();
  
  const [Err, setErr] = useState(null);

  const { Lop, Khoa, Khoas } = useContext(DataContext);

  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
    TotalPage: 1,
  });
  const [filter, setfilter] = useState({
    limit: 10,
    page: 1,
  });

  // Search 
  const [FilterKhoa, setFilterKhoa] = useState("");
  const [FilterKhoas, setFilterKhoas] = useState("");
  const [FilterLop, setFilterLop] = useState("");
  const FilterMSV = useRef("");
  const [RegisterMilitary, setRegisterMilitary] = useState([]);

  const changeKhoa = (event) => {
    setFilterKhoa(event.target.value)
  }
  const changeKhoas = (event) => {
    setFilterKhoas(event.target.value)
  }
  const changeLop = (event) => {
    setFilterLop(event.target.value)
  }

  const Search = () => {
    if(FilterKhoa === "" && FilterKhoas === "" && FilterLop === "" && FilterMSV.current.value === "" )
    {
      alert("Bạn cần chọn khoa, hoặc khóa, hoặc lớp, hoặc mã sinh viên để thực hiện tìm kiếm");
    }
    else{
      Client.get("/register-military-management/filter-info-register?MaSinhVien=" + 
        FilterMSV.current.value + "&TenLop=" + FilterLop + "&Khoas=" + FilterKhoas + "&TenKhoa=" + FilterKhoa)
        .then((res) => {
          if (res.data.status === "Success") {
            setRegisterMilitary(res.data.data);
          } else {
            setErr(res.data.Err_Message);
          }
        })
        .catch((err) => {
          setErr("Not Found!");
        });
      };
    }

    //console.log(RegisterMilitary);

  // 
  // useEffect(() => {
  //   const params = queryString.stringify(filter);
  //   console.log(params);
  //   Client.get("/register-military-management/filter-info-register?" + params)
  //     .then((response) => {
  //       const List = response.data;
  //       if (List.status === "Success") {
  //         setPaginations(List.pagination);
  //         setRegisterMilitary(List.data);
  //       }
  //     })
  //     .catch((err) => {
  //       setErr(true);
  //     });
  // }, [filter]);

  const Time = useRef(null);
  const ChangeLimit = (e) => {
    const input = e.target;
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      setfilter({ ...filter, limit: input.value });
    }, 300);
  };

  ////submit form
  const [ErrAdd, setErrAdd] = useState();
  const Submit = async (form, ResetForm) => {
    try {
      const result = await Client.post("/register-military-management/store-register-military?", form, {
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

// ImportFile 
  const [ErrImport, setErrImport] = useState([]);
  const [ErrImportMSV, setErrImportMSV] = useState([]);
  const ImportFile = async (e) => {
    e.preventDefault();
    const MyData = new FormData(e.target);
    try {
      const Result = await Client.post("/register-military-management/store-register-military-file", MyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (Result.data.status === "Success") {
        alert("Bạn đã import thành công");
        setErrImport([]);
        setErrImportMSV([]);
      } else {
        setErrImport(Result.data.err);
        setErrImportMSV(Result.data.errMSV);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Show Hide
  const [ImportAndNew, setImportAndNew] = React.useState(true);
  const [chooseImport, setChooseImport] = React.useState(false);
  const [Register, setRegister] = React.useState(false);

  const onClickImport = () => {
    setImportAndNew(false);
    setChooseImport(true);
  }

  const onClickNew = () => {
    setRegister(true);
    setImportAndNew(false);
  }

  const onClickNewBack = () => {
    setRegister(false);
    setImportAndNew(true);
  }

  const onClickBackImport = () => {
    setChooseImport(false);
    setImportAndNew(true);
  }

  return(
    <React.Fragment>
      <div className="Register_military_container">
        <div className={Style.Register_header}>
          <HeaderTitle Title="Giấy Nghĩa Vụ Quân Sự" Icon={<BsPersonPlusFill />} /> 
        </div>
        {/* phần thân  */}
        <div className={Style.Register_body}>
          {/* Import va tạo mới */}
          {ImportAndNew ? (
          <div className={Style.Register_button}  id="btn_importAndNew">
            <div className={Style.Button_register}>
              <Button 
                content="ImportFile" 
                onClick={onClickImport} 
              />
              <Button 
                content="Tạo mới" 
                onClick={onClickNew} 
              />
            </div>
          </div>
          ) : null }

          {/* Choose file and import */}
          { chooseImport ? (
            <div className={clsx(Style.Import_choose, Style.Register_button)}>
              <form onSubmit={ImportFile}>
                <input type="file" name="file" required></input>
                <Button 
                  content="ImportFile" 
                  onClick={function(){
                    document.getElementById("Error").style.display = "block";
                  }}
                />
                <Button 
                  content="Trở về" 
                  onClick={function(){
                    onClickBackImport()
                    document.getElementById("Error").style.display = "none";
                  }} 
                />
              </form>
            </div>
          ) : null }

            <div id="Error">
              {ErrImport.length > 0 && (
                <ErrorImport 
                  ErrorrImport = {ErrImport}
                  column1 = "Hàng"
                  column2 = "Nội dung"
                />
              )}
              {ErrImportMSV.length > 0 && (
                <ErrorImport 
                  ErrorrImport = {ErrImportMSV}
                  column1 = "Mã sinh viên"
                  column2 = "Nội dung"
                />
              )}
            </div>

          {/* giay chứng nhận đăng ký  */}
          {Register ? (
            <div className={Style.Register} id="Register">
              <div className={Style.Form_register}>
                <h1 className={Style.form_title}>
                  Giấy Chứng Nhận Đăng Ký Nghĩa Vụ Quân Sự
                </h1>
                <FormMilitary 
                  titles={titleForm}
                  subtitles={subtitles}
                  onClickSave = {function(){
                    document.getElementById("ErrAdd").style.display = "block";
                  }}
                  onClickBack ={function(){
                    onClickNewBack()
                    document.getElementById("ErrAdd").style.display = "none";
                  }}
                  Submit={Submit}
                />
              </div>
            </div>
          ) : null }

          <div id="ErrAdd">
          {ErrAdd && (
            <div className={Style.Err_container}>
              <h2 className={Style.ErrTitle}>Có Lỗi!!!</h2>
              <div className={Style.ResultImport}>
                <table className={Style.TableErr} border={1}>
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
          </div>
          {/* Tìm kiếm */}
          <div className={Style.Register_search}>
            <div className={Style.Search_register}>
              <div className={Style.cmbSearch}>
                <ComboBox id = {FilterKhoa} title="Khoa" items={Khoa} Change = {changeKhoa}/>
                <ComboBox id = {FilterKhoas} title="Khóa" items={Khoas} Change = {changeKhoas}/>
                <ComboBox id = {FilterLop} title="Lớp" items={Lop} Change = {changeLop}/>

                <div className={Style.Search_input}>
                  <input placeholder="Nhập vào mã sinh viên" ref={FilterMSV}></input>
                  <button
                    className={Style.icon_search}
                    onClick={Search}
                  ><BsSearch/>
                  </button>
                </div>

              </div>

              
            </div>
            <div className={Style.Result_search}>
              <h2>Kết Quả Tìm Kiếm</h2>
            </div>
            <div className={style.DataList}>
              <TableMilitary
                headers={tableHeaders}
                Content={<TableRegisterData data={RegisterMilitary} />}
              />
            </div>
            <Pagination
              title="Số sinh viên / Trang"
              paginations={paginations}
              filter={filter}
              setfilter={setfilter}
              ChangeLimit={ChangeLimit}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegisterMilitary;