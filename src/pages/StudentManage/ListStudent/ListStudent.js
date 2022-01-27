import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import TextBox from "../../../component/TextBox/TextBox";
import { BsFillPeopleFill } from "react-icons/bs";
import style from "./ListStudent.module.css";
import ComboBox from "../../../component/ComboBox/ComboBox";
import Button from "../../../component/Button/Button";
import Table from "../../../component/Table/Table";
import TableContent from "../../../component/Table/TableContent";
import Pagination from "../../../component/Pagination/Pagination";
import Client from "../../../Helper/API";
import queryString from "query-string";
import { AuthContext } from "../../../authContext/AuthContext";
import { logout } from "../../../authContext/CallApi";
const tableHeaders = ["Mã sinh viên", "Họ và tên", "Lớp", "Khoa"];
function ListStudent() {
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
    Lop: [],
  });
  const { dispatch } = useContext(AuthContext);
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
  useEffect(() => {
    const params = queryString.stringify(filter);
    Client.get("/student-management/users?" + params)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setListStudent(List.data);
        }
      })
      .catch((err) => {
        if (err.Auth) {
          logout(dispatch);
        }
        setErr(true);
      });
  }, [filter]);
  // console.log(DataFilter);

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

  const Export = async () => {
    const params = queryString.stringify(filter);
    Client.get("/student-management/users-export?" + params, {
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "DanhSachSinhVien.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
      })
      .catch((err) => {
        if (err.Auth) {
          logout(dispatch);
        }
        setErr(true);
      });
  };
  console.log(ListStudent);
  return (
    <div className={style.List_Header_container}>
      <HeaderTitle Title="Danh sách sinh viên" Icon={<BsFillPeopleFill />} />
      <div className={style.ListStudent_Filter}>
        <div className={style.ListStudent_Filter_Item}>
          <TextBox
            title="Mã sinh viên"
            subtitle="MaSinhVien"
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <TextBox title="Họ và tên" subtitle="HoTen" Change={ChangeFilter} />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            id="Lop"
            title="Lớp"
            items={DataFilter.current.Lop}
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            title="Khoa"
            id="Khoa"
            items={DataFilter.current.Khoa}
            Change={ChangeFilter}
          />
        </div>
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
        ChangeLimit={ChangeLimit}
      />
      <div className={style.XuatFile}>
        <Button content="Xuất File" onClick={Export} />
      </div>
    </div>
  );
}

export default ListStudent;
