import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import TextBox from "../../../component/TextBox/TextBox";
import { BsSearch } from "react-icons/bs";
import { BsPersonPlusFill } from "react-icons/bs";
import Table from "../../../component/Table/Table";
import TableContent from "../../../component/Table/TableContent";
import Pagination from "../../../component/Pagination/Pagination";
import Client from "../../../Helper/API";
import queryString from "query-string";
import { AuthContext } from "../../../authContext/AuthContext";
import { logout } from "../../../authContext/CallApi";
import "./RegisterMilitary.css";
import style from "../../StudentManage/ListStudent/ListStudent";


const tableHeaders = ["Họ và tên", "MSV", "Ngày sinh", "Lớp", "Khoa", "Khóa", "Ngày đăng ký", "Nơi đăng ký", "Ngày nộp"];

function RegisterMilitary() {

  const [ListStudent, setListStudent] = useState([]);
  const [paginations, setPaginations] = useState({
    limit: 1,
    page: 1,
    TotalPage: 1,
  });
  const [filter, setfilter] = useState({
    limit: 1,
    page: 1,
  });
  const [Err, setErr] = useState(null);

  const DataFilter = useRef({
    Khoa: [],
    Khoas: [],
    Lop: [],
  });
  const { dispatch } = useContext(AuthContext);

  //khoa
  useEffect(() => {
    Client.get("/student-management/majors")
      .then((response) => {
        const ListKhoa = response.data;
        if (ListKhoa.status === "Success") {
          DataFilter.current.Khoa = ListKhoa.data;
        }
      })
      .catch((err) => {
        if (err.Auth) {
          logout(dispatch);
        }
        setErr(true);
      });
  }, []);

//khóa
useEffect(() => {
    Client.get("/student-management/majors-key")
      .then((response) => {
        const ListKhoa = response.data;
        if (ListKhoa.status === "Success") {
          DataFilter.current.Khoa = ListKhoa.data;
        }
      })
      .catch((err) => {
        if (err.Auth) {
          logout(dispatch);
        }
        setErr(true);
      });
  }, []);

  //lớp
  useEffect(() => {
    Client.get("/student-management/class")
      .then((response) => {
        const ListClass = response.data;
        console.log(ListClass);
        if (ListClass.status === "Success") {
          DataFilter.current.Lop = ListClass.data;
          console.log(DataFilter.current.Lop);
        }
      })
      .catch((err) => {
        if (err.Auth) {
          logout(dispatch);
        }
        setErr(true);
      });
  }, []);

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

  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      console.log(input.name);

      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };
  // console.log(filter);

  return(
    <React.Fragment>
      <div className="Register_military_container">
        <div className="Register_header">
          <HeaderTitle Title="Giấy nghĩa vụ quân sự" Icon={<BsPersonPlusFill />} /> 
        </div>
        <div className="Register_body">
          <div className="Form_register">
              <form className="Register_form">
                <h1 className="form_title">
                  Giấy Chứng Nhận Đăng Ký Nghĩa Vụ Quân Sự
                </h1>
                <div className="Form_left">
                  <div className="Element_form">
                    <label className="Form_label" htmlFor="Name">
                      Họ Tên:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      id="Name"
                      className=""
                      name=""
                      required
                    />
                  </div>
                  <div className="Element_form">
                    <label className="Form_label" htmlFor="msv">
                      Mã sinh viên:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      id="msv"
                      className=""
                      name=""
                      required
                    />
                  </div>  
                  <div className="Element_form">
                    <label className="Form_label">
                      Số đăng ký:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>
                  <div className="Element_form">
                    <label className="Form_label">
                      Địa chỉ thường trú:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>  
                </div>
                <div className="Form_right">
                  <div className="Element_form">
                    <label className="Form_label">
                      Ngày sinh:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>  
                  <div className="Element_form">
                    <label className="Form_label">
                      Ngày đăng ký:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>
                  <div className="Element_form">
                    <label className="Form_label">
                      Nơi đăng ký:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>  
                  <div className="Element_form">
                    <label className="Form_label">
                      Ngày nộp:
                    </label>
                    <input
                      // ref={TenDangNhap}
                      type="text"
                      className=""
                      name=""
                      required
                    />
                  </div>  
                </div>
              </form>
          </div>
          
          <div className="Register_button">
            <div className="button_reg">
              <button className="button_main" onClick ="">
                Cập nhật
              </button>
              <button className="button_main">
                Lưu
              </button>
            </div>
          </div>

          <div className="Register_search">
            <div className="Search_register">
              <div className="Search_combobox">
                <label>Khoa: </label>
                <select>
                <option value="">----Khoa----</option>
                  {DataFilter.current.Khoa.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))
                  }
                </select>
              </div>
              <div className="Search_combobox">
                <label>Khóa: </label>
                <select>
                <option value="">----Khóa----</option>
                  {DataFilter.current.Khoas.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))
                  }
                </select>
              </div>
              <div className="Search_combobox">
                <label>Lớp: </label>
                <select>
                <option value="">----Lớp----</option>
                  {DataFilter.current.Lop.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))
                  }
                </select>
              </div>
              <div className="Search_input">
                <input placeholder="Nhập vào mã sinh viên"></input>
                <button className="icon_search"><BsSearch/></button>
              </div>
            </div>
            <div className="Result_search">
              <h2>Kết Quả Tìm Kiếm</h2>
            </div>
            <div className={style.DataList}>
              <Table
                headers={tableHeaders}
                minCellWidth={120}
                Content={<TableContent data={ListStudent} />}
              />
            </div>
            <Pagination
              title="Số sinh viên"
              paginations={paginations}
              filter={filter}
              setfilter={setfilter}
              // ChangeLimit={ChangeLimit}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegisterMilitary;