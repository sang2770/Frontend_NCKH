import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../component/ButtonMiliNoti/Button";
import style from "./ConfirmMilitary.module.css";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { IoIosPaper } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import Pagination from "../../../component/Pagination/Pagination";
import useAxios from "../../../Helper/API";
import queryString from "query-string";
import { DataContext } from "../../../DataContext/DataContext";
import TableMilitary from "../../../component/TableMilitary/TableMilitary";
import TableConfirmData from "../../../component/TableMilitary/TableConfirmData";
import LoadingEffect from "../../../component/Loading/Loading";
import Style from "../RegisterMilitary/RegisterMilitary.module.css";
import ComponentSearch from "../../../component/Search/Search";

const tableHeaders = [
  "Họ và tên",
  "MSV",
  "Ngày sinh",
  "Lớp",
  "Khoa",
  "Khóa",
  "Số lần cấp",
  "Xác nhận",
];

function ConfirmMilitary() {
  const { Client, Loading } = useAxios();

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

  const [DateFilter, setDate] = useState({
    Year: [],
  });

  useEffect(() => {
    const max = 5;
    const CurrentYear = new Date().getFullYear();
    const year = [];
    for (let i = 0; i < max; i++) {
      year.push(CurrentYear - i);
    }
    setDate({ ...DateFilter, Year: year });
  }, []);

  const [ConfirmMilitary, setConfirmMilitary] = useState([]);

  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get(
      "/register-military-management/filter-info-student-registerMili?" + params
    )
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setConfirmMilitary(List.data);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  };
  const [changeData, setChangeData] = useState(false);
  useEffect(() => {
    CallAPI();
    const Load = setInterval(() => {
      CallAPI();
    }, 1000 * 60 * 5);
    return () => {
      clearTimeout(Load);
    };
  }, [filter, changeData]);

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
      setfilter({ ...filter, [name]: input.value, page: 1 });
    }, 300);
  };
  // Export
  const Export = async () => {
    const params = queryString.stringify(filter);
    Client.get(
      "/confirm-military-management/confirm-military-off?" + params,
      {
        responseType: "blob",
      }
    )
    .then((response) => {
      const blob = new Blob([response.data]);
      //console.log(blob);
      //console.log(blob.size);
      if(blob.size > 100 ){
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "DanhSachGiayXacNhanNVQS.docx");
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
        setChangeData(!changeData);
      }else{
        alert("Vui lòng thêm thông tin chỉ huy trưởng trước khi cấp giấy!");
        setChangeData(!changeData);
      }
    })
    .catch((err) => {
      setErr(true);
      alert("Có lỗi!");
    });
  };

  return (
    <React.Fragment>
      <div className={style.load}>
        {Loading && <LoadingEffect />}
        <div className={style.Confirm_header}>
          <HeaderTitle
            Title="Giấy Xác Nhận Nghĩa Vụ Quân Sự"
            Icon={<IoIosPaper />}
          />
        </div>
        <div>
          {/* form tìm kiếm */}
          <div className={style.Form_main}>
            <div className={Style.Search_register}>
              <div className={style.cmbSearch}>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id="NgayCap"
                    title="Năm"
                    items={DateFilter.Year}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id="TenKhoa"
                    title="Khoa"
                    items={Khoa}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id="Khoas"
                    title="Khóa"
                    items={Khoas}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id="TenLop"
                    title="Lớp"
                    items={Lop}
                    Change={ChangeFilter}
                  />
                </div>
                <ComponentSearch
                  subtitle="MaSinhVien"
                  Change={ChangeFilter}
                  title="Mã sinh viên"
                />
              </div>
            </div>
            <div className={style.Result_search}>
              <h2>Kết Quả Tìm Kiếm</h2>
            </div>
            <div className={style.DataList}>
              <TableMilitary
                headers={tableHeaders}
                Content={
                  <TableConfirmData
                    data={ConfirmMilitary}
                    changeData={changeData}
                    setChangeData={setChangeData}
                  />
                }
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
          {/* button cập giấy */}
          <div className={style.btn}>
            <Button content="Cấp giấy" onClick={Export} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConfirmMilitary;
