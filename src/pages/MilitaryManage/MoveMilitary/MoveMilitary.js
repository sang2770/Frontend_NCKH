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
import TableMilitary from "../../../component/TableMilitary/TableMilitary";
import TableMoveData from "../../../component/TableMilitary/TableMoveData";
import LoadingEffect from "../../../component/Loading/Loading";
import FormExportMove from "../../../component/FormExportMove/FormExportMove";
import ComponentSearch from "../../../component/Search/Search";

const tableHeaders = [
  "Họ và tên",
  "MSV",
  "Ngày sinh",
  "Lớp",
  "Khoa",
  "Khóa",
  "Trạng thái",
  "Số QĐ",
  "Ngày quyết định",
  "Số lần cấp",
  "Xác nhận",
];

function MoveMilitary() {
  const { Client, Loading } = useAxios();

  const [Err, setErr] = useState(null);

  const TrangThai = ["Đã tốt nghiệp", "Thôi học", "Bảo lưu"];
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

  const [SoQuyetDinh, setSoQuyetDinh] = useState([]);

  useEffect(() => {
    Client.get("/move-military-management/list-decision-number")
      .then((response) => {
        const listSQD = response.data;
        if (listSQD.status === "Success") {
          setSoQuyetDinh(listSQD.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [MoveMilitary, setMoveMilitary] = useState([]);

  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get(
      "/register-military-management/filter-info-move?" + params
    )
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          console.log(List.data);
          setPaginations(List.pagination);
          setMoveMilitary(List.data);
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

  const params = queryString.stringify(filter); 
  const url = "/move-military-management/move-military?" + params;

  const [DropDown, setDropDown] = useState(-1);
  const ChangeDropDown = (id) => {
    setDropDown(id);
  };

  return (
    <React.Fragment>
      {DropDown > -1 && (
        <FormExportMove
          url = {url}
          changeData={changeData}
          setChangeData={setChangeData}
          exit={() => {
            ChangeDropDown(-1);
          }}
        />
      )}
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
              <div className={style.Search_Item}>
                <ComboBox
                  id="NgayQuyetDinh"
                  title="Năm"
                  items={DateFilter.Year}
                  Change={ChangeFilter}
                />
              </div>
              <div className={style.Search_Item}>
                <ComboBox
                  id="TenKhoa"
                  title="Khoa"
                  items={Khoa}
                  Change={ChangeFilter}
                />
              </div>
              <div className={style.Search_Item}>
                <ComboBox
                  id="Khoas"
                  title="Khóa"
                  items={Khoas}
                  Change={ChangeFilter}
                />
              </div>
              <div className={style.Search_Item}>
                <ComboBox
                  id="TenLop"
                  title="Lớp"
                  items={Lop}
                  Change={ChangeFilter}
                />
              </div>
            </div>
            <div className={style.Search_button2}>
              <div className={style.Search_Item}>
                <ComboBox
                  id="SoQuyetDinh"
                  title="Số quyết định"
                  items={SoQuyetDinh}
                  Change={ChangeFilter}
                />
              </div>
              <div className={style.Search_Item}>
                <ComboBox
                  id="TinhTrangSinhVien"
                  title="Trạng thái"
                  items={TrangThai}
                  Change={ChangeFilter}
                />
              </div>
              <div className={style.Search_ItemInput}>
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
              {Loading && <LoadingEffect />}
              <TableMilitary
                headers={tableHeaders}
                Content={
                  <TableMoveData
                    data={MoveMilitary}
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
            <Button content="Cấp giấy" onClick={() => {ChangeDropDown(0)}} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MoveMilitary;
