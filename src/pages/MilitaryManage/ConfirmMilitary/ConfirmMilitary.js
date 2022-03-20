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

  // Search
  const [FilterKhoa, setFilterKhoa] = useState("");
  const [FilterKhoas, setFilterKhoas] = useState("");
  const [FilterLop, setFilterLop] = useState("");
  const FilterMSV = useRef("");
  const [ConfirmMilitary, setConfirmMilitary] = useState([]);

  const changeKhoa = (event) => {
    setFilterKhoa(event.target.value);
  };
  const changeKhoas = (event) => {
    setFilterKhoas(event.target.value);
  };
  const changeLop = (event) => {
    setFilterLop(event.target.value);
  };

  const onSearch = () => {
    if (
      FilterKhoa === "" &&
      FilterKhoas === "" &&
      FilterLop === "" &&
      FilterMSV.current.value === ""
    ) {
      alert(
        "Bạn cần chọn khoa, khóa, lớp, trạng thái xử lý hoặc mã sinh viên để thực hiện tìm kiếm"
      );
    } else {
      Client.get(
        "/register-military-management/filter-info-student-registerMili?MaSinhVien=" +
          FilterMSV.current.value +
          "&TenLop=" +
          FilterLop +
          "&Khoas=" +
          FilterKhoas +
          "&TenKhoa=" +
          FilterKhoa
      )
        .then((res) => {
          if (res.data.status === "Success") {
            setConfirmMilitary(res.data.data);
          } else {
            setErr(res.data.Err_Message);
          }
        })
        .catch((err) => {
          setErr("Not Found!");
        });
    }
  };

  // console.log(ConfirmMilitary);
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

  // Export
  const Export = async () => {
    Client.get(
      "/confirm-military-management/confirm-military-off?MaSinhVien=" +
        FilterMSV.current.value +
        "&TenLop=" +
        FilterLop +
        "&Khoas=" +
        FilterKhoas +
        "&TenKhoa=" +
        FilterKhoa,
      {
        responseType: "blob",
      }
    )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "GiayXacNhanNVQS.docx");
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
        setChangeData(!changeData);
      })
      .catch((err) => {
        setErr(true);
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
                    id={FilterKhoa}
                    title="Khoa"
                    items={Khoa}
                    Change={changeKhoa}
                  />
                </div>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id={FilterKhoas}
                    title="Khóa"
                    items={Khoas}
                    Change={changeKhoas}
                  />
                </div>
                <div className={style.cmbSearch_Item}>
                  <ComboBox
                    id={FilterLop}
                    title="Lớp"
                    items={Lop}
                    Change={changeLop}
                  />
                </div>
                <ComponentSearch onClickSearch={onSearch} Ref={FilterMSV} />
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
