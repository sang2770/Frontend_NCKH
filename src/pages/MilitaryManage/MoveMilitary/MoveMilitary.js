import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../component/ButtonMiliNoti/Button";
import style from "./MoveMilitary.module.css";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import { RiUserSettingsFill } from "react-icons/ri";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import Pagination from "../../../component/Pagination/Pagination";
import useAxios from "../../../Helper/API";
import queryString from "query-string";
import { DataContext } from "../../../DataContext/DataContext";
import Search from "../../../component/Search/Search";
import TableMilitary from "../../../component/TableMilitary/TableMilitary";
import TableMoveData from "../../../component/TableMilitary/TableMoveData";
import LoadingEffect from "../../../component/Loading/Loading";

const tableHeaders = [
  "Họ và tên",
  "MSV",
  "Ngày sinh",
  "Lớp",
  "Khoa",
  "Khóa",
  "Trạng thái",
  "Trạng thái cấp",
  "Số QĐ",
  "Ngày quyết định",
  "Xác nhận",
];

function MoveMilitary() {
  const { Client, Loading } = useAxios();

  const [Err, setErr] = useState(null);

  const TrangThai = ["Đã tốt nghiệp", "Đã thôi học"];
  const TinhTrang = ["Đã cấp giấy", "Chưa cấp giấy", "Tất cả"];
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
  const [FilterTrangThai, setFilterTrangThai] = useState("");
  const [FilterTinhTrang, setFilterTinhTrang] = useState("");
  const FilterMSV = useRef("");
  const [MoveMilitary, setMoveMilitary] = useState([]);

  const changeKhoa = (event) => {
    setFilterKhoa(event.target.value);
  };
  const changeKhoas = (event) => {
    setFilterKhoas(event.target.value);
  };
  const changeLop = (event) => {
    setFilterLop(event.target.value);
  };
  const changeTrangThai = (event) => {
    setFilterTrangThai(event.target.value);
  };
  const changeTinhTrang = (event) => {
    setFilterTinhTrang(event.target.value);
  };

  const onSearch = () => {
    if (
      FilterKhoa === "" &&
      FilterKhoas === "" &&
      FilterLop === "" &&
      FilterMSV.current.value === "" &&
      FilterTrangThai === "" &&
      FilterTinhTrang === ""
    ) {
      alert(
        "Bạn cần chọn khoa, khóa, lớp, trạng thái sinh viên hoặc mã sinh viên để thực hiện tìm kiếm"
      );
    } else {
      var reqNgayCap = "";
      if(FilterTinhTrang == "Đã cấp giấy"){
        reqNgayCap = "1";
      }
      else if(FilterTinhTrang == "Chưa cấp giấy"){
        reqNgayCap = "0";
      }
      else if(FilterTinhTrang == "Tất cả"){
        reqNgayCap = "2";
      }
      Client.get(
        "/register-military-management/filter-info-move?MaSinhVien=" +
          FilterMSV.current.value +
          "&TenLop=" +
          FilterLop +
          "&Khoas=" +
          FilterKhoas +
          "&TenKhoa=" +
          FilterKhoa +
          "&TinhTrangSinhVien=" +
          FilterTrangThai +
          "&NgayCap=" +
          reqNgayCap
      )
        .then((res) => {
          if (res.data.status === "Success") {
            setMoveMilitary(res.data.data);
            console.log(res.data.data);
          } else {
            setErr(res.data.Err_Message);
          }
        })
        .catch((err) => {
          setErr("Not Found!");
        });
    }
  };

  console.log(FilterTinhTrang);
  const CallAPI = () => {
    var reqNgayCap = "";
    if(FilterTinhTrang == "Đã cấp giấy"){
      reqNgayCap = "NgayCap=1&";
    }
    else if(FilterTinhTrang == "Chưa cấp giấy"){
      reqNgayCap = "NgayCap=0&";
    }
    else if(FilterTinhTrang == ""){
      reqNgayCap = "";
    }
    const params = queryString.stringify(filter);
    Client.get("/register-military-management/filter-info-move?" + reqNgayCap + params)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setMoveMilitary(List.data);
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
      setfilter({ ...filter, limit: input.value });
    }, 300);
  };

  // Export
  const Export = async () => {
    // const params = queryString.stringify(filter);
    Client.get(
      "/move-military-management/move-military?MaSinhVien=" +
        FilterMSV.current.value +
        "&TenLop=" +
        FilterLop +
        "&Khoas=" +
        FilterKhoas +
        "&TenKhoa=" +
        FilterKhoa +
        "&TinhTrangSinhVien=" +
        FilterTrangThai,
      {
        responseType: "blob",
      }
    )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "GiayDiChuyenNVQS.docx");
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
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
            Title="Giấy Giới Thiệu Di Chuyển Đăng Ký Nghĩa Vụ Quân Sự"
            Icon={<RiUserSettingsFill />}
          />
        </div>
        <div>
          {/* form tìm kiếm */}
        <div className={style.Form_main}>
            <div className={style.Search_button}>
              <ComboBox
                id={FilterKhoa}
                title="Khoa"
                items={Khoa}
                Change={changeKhoa}
              />
              <ComboBox
                id={FilterKhoas}
                title="Khóa"
                items={Khoas}
                Change={changeKhoas}
              />
              <ComboBox
                id={FilterLop}
                title="Lớp"
                items={Lop}
                Change={changeLop}
              />
              <ComboBox
                id={FilterTrangThai}
                title="Trạng thái"
                items={TrangThai}
                Change={changeTrangThai}
              />
              <ComboBox
                id={FilterTinhTrang}
                title="Tình trạng"
                items={TinhTrang}
                Change={changeTinhTrang}
              />
            </div>
            <Search onClickSearch={onSearch} Ref={FilterMSV} />
            <div className={style.Result_search}>
              <h2>Kết Quả Tìm Kiếm</h2>
            </div>
            <div className={style.DataList}>
              {Loading && <LoadingEffect />}
              <TableMilitary
                headers={tableHeaders}
                Content={<TableMoveData data={MoveMilitary} />}
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

export default MoveMilitary;
