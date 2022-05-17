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
import queryString from "query-string";
import { DataContext } from "../../../DataContext/DataContext";
import useAxios from "../../../Helper/API";
import LoadingEffect from "../../../component/Loading/Loading";
import { FormatDate, FormatInput } from "../../../Helper/Date";
const tableHeaders = ["Mã sinh viên", "Họ và tên", "Lớp", "Khoa"];
function ListStudent() {
  const { Client, Loading } = useAxios();
  const [StudentList, setStudentList] = useState([]);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
    TotalPage: 1,
  });
  const [filter, setfilter] = useState({
    limit: 10,
    page: 1,
  });
  const [Err, setErr] = useState(null);
  const { Lop, Khoa, Khoas } = useContext(DataContext);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("/student-management/users?" + params)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setStudentList(List.data);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  };
  useEffect(() => {
    CallAPI();
    const Load = setInterval(() => {
      CallAPI();
    }, 1000 * 60 * 5);
    return () => {
      clearTimeout(Load);
    };
  }, [filter]);
  const Time = useRef(null);
  const ChangeLimit = (e) => {
    const input = e.target;
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      setfilter({ ...filter, limit: input.value, page: 1 });
    }, 300);
  };

  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;

      setfilter({
        ...filter,
        [name]: name === "NgaySinh" ? FormatInput(input.value) : input.value,
        page: 1,
      });
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
        link.setAttribute("download", `DanhSachSinhVien.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        // alert("Đã xuất file");
      })
      .catch((err) => {
        setErr(true);
      });
  };
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
          <TextBox
            title="Số đăng ký"
            subtitle="SoDangKy"
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <TextBox
            title="Ngày sinh (dd-mm-yy)"
            subtitle="NgaySinh"
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <TextBox title="Họ và tên" subtitle="HoTen" Change={ChangeFilter} />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox id="Lop" title="Lớp" items={Lop} Change={ChangeFilter} />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox title="Khoa" id="Khoa" items={Khoa} Change={ChangeFilter} />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            title="Khóa"
            id="Khoas"
            items={Khoas}
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            title="Tình trạng sinh viên"
            id="TinhTrangSinhVien"
            items={["Đã tốt nghiệp", "Đang học", "Thôi học"]}
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            title="Giấy Đăng ký NVQS"
            id="DangKy"
            items={["Đã nộp", "Chưa nộp"]}
            Change={ChangeFilter}
          />
        </div>
        <div className={style.ListStudent_Filter_Item}>
          <ComboBox
            title="Giấy xác nhận từ địa phương"
            id="XacNhan"
            items={["Đã nộp", "Chưa nộp"]}
            Change={ChangeFilter}
          />
        </div>
      </div>
      <div className={style.DataList}>
        {Loading && <LoadingEffect />}

        <Table
          headers={tableHeaders}
          Content={<TableContent data={StudentList} ReadForm={true} />}
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
