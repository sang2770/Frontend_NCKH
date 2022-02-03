import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderTitle from "../../component/HeaderTitle/HeaderTitle";
import style from "./Request.module.css";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import useAxios from "../../Helper/API";
import queryString from "query-string";
import { DataContext } from "../../DataContext/DataContext";
import TextBox from "../../component/TextBox/TextBox";
import ComboBox from "../../component/ComboBox/ComboBox";
import Table from "../../component/Table/Table";
import TableContent from "../../component/Table/TableContent";
import Button from "../../component/Button/Button";
import Pagination from "../../component/Pagination/Pagination";

const tableHeaders = [
  "STT",
  "Mã sinh viên",
  "Họ và tên",
  "Lần xin cấp",
  "Ngày yêu cầu",
  "Trạng thái",
  "Chọn",
];

function RequestStudent() {
  const Client = useAxios();
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
  const { Lop, Khoa } = useContext(DataContext);
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
  return (
    <div className={style.Request_Student_Container}>
      <HeaderTitle Title="Yêu cầu của sinh viên" Icon={<AiOutlineMessage />} />
      <div className={style.ListConfirmed}>
        <div className={style.ListHeader}>
          <HiOutlineClipboardList />
          <p className={style.ListHeader_content}>Danh sách chờ xác nhận</p>
        </div>
        <div className={style.Filter}>
          <div className={style.Filter_Item}>
            <TextBox
              title="Mã sinh viên"
              subtitle="MaSinhVien"
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <TextBox title="Họ và tên" subtitle="HoTen" Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox id="Lop" title="Lớp" items={Lop} Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khoa"
              id="Khoa"
              items={Khoa}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.DataList}>
          <Table headers={tableHeaders} Content={<TableContent />} />
        </div>

        <div className={style.GroupOption}>
          <div className={style.CheckboxGroup}>
            <label
              htmlFor="SelectAll-Confermed"
              style={{ marginRight: "10px" }}
            >
              Chọn tất cả
            </label>
            <input type="checkbox" name="SelectAll" id="SelectAll-Confermed" />
          </div>
          <Button content="Xuất giấy" />
        </div>
        <Pagination
          title="Số sinh viên"
          paginations={paginations}
          filter={filter}
          setfilter={setfilter}
          ChangeLimit={ChangeLimit}
        />
      </div>
      <div className={style.ListConfirmed}>
        <div className={style.ListHeader}>
          <HiOutlineClipboardList />
          <p className={style.ListHeader_content}>Danh sách chờ cấp</p>
        </div>
        <div className={style.Filter}>
          <div className={style.Filter_Item}>
            <TextBox
              title="Mã sinh viên"
              subtitle="MaSinhVien"
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <TextBox title="Họ và tên" subtitle="HoTen" Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox id="Lop" title="Lớp" items={Lop} Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khoa"
              id="Khoa"
              items={Khoa}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.DataList}>
          <Table
            headers={tableHeaders}
            Content={<TableContent Check={true} />}
          />
        </div>
        <div className={style.GroupOption}>
          <div className={style.CheckboxGroup}>
            <label
              htmlFor="SelectAll-Confermed"
              style={{ marginRight: "10px" }}
            >
              Chọn tất cả
            </label>
            <input type="checkbox" name="SelectAll" id="SelectAll-Confermed" />
          </div>
        </div>
        <Pagination
          title="Số sinh viên"
          paginations={paginations}
          filter={filter}
          setfilter={setfilter}
          ChangeLimit={ChangeLimit}
        />
      </div>
    </div>
  );
}

export default RequestStudent;
