import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import { BsSearch, BsPersonPlusFill } from "react-icons/bs";
import { BiHealth } from "react-icons/bi";
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
import FormMilitaryMoveLocal from "../../../component/FormMilitary/FormMilitaryMoveLocal";
import ErrorImport from "../../../component/ErrImport/ErrorImport";
import LoadingEffect from "../../../component/Loading/Loading";
import ComponentSearch from "../../../component/Search/Search";


const tableHeaders = [
  "Họ và tên",
  "MSV",
  "Ngày sinh",
  "Lớp",
  "Khoa",
  "Khóa",
  "Chọn",
];

const titleForm = [
  "Họ và tên",
  "Mã sinh viên",
  "Ngày sinh",
  "Ngày đăng ký",
  "Số đăng ký",
  "Nơi đăng ký",
  "Địa chỉ thường trú",
  "Ngày nộp",
  "Số giới thiệu",
  "Ban chỉ huy",
  "Ngày cấp",
  "Nơi ở hiện tại",
  "Nơi chuyển đến",
];

const titleFormRegister = [
  "Họ và tên",
  "Mã sinh viên",
  "Ngày sinh",
  "Ngày đăng ký",
  "Số đăng ký",
  "Nơi đăng ký",
  "Địa chỉ thường trú",
  "Ngày nộp",
  "Số giới thiệu",
  "Ban chỉ huy",
  "Ngày cấp",
  "Nơi ở hiện tại",
  "Nơi chuyển đến",
];

const titleFormMoveLocal = [
  "Mã sinh viên",
  "Số giới thiệu",
  "Ban chỉ huy",
  "Ngày cấp",
  "Nơi ở hiện tại",
  "Nơi chuyển đến",
];

const subtitles = [
  "HoTen",
  "MaSinhVien",
  "NgaySinh",
  "NgayDangKy",
  "SoDangKy",
  "NoiDangKy",
  "DiaChiThuongTru",
  "NgayNop",
  "SoGioiThieu",
  "BanChiHuy",
  "NgayCap",
  "NoiOHienTai",
  "NoiChuyenDen",
];

const subtitlesRegister = [
  "HoTen",
  "MaSinhVien",
  "NgaySinh",
  "NgayDangKy",
  "SoDangKy",
  "NoiDangKy",
  "DiaChiThuongTru",
  "NgayNop",
];
const subtitlesMoveLocal = [
  "MaSinhVien",
  "SoGioiThieu",
  "BanChiHuy",
  "NgayCap",
  "NoiOHienTai",
  "NoiChuyenDen",
];

function RegisterMilitary() {
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

  const [radioRegister, setRadioRegister] = useState(false);
  const [radioMoveLocal, setRadioMoveLocal] = useState(false);

  const changeRadioRe = () => {
    setRadioRegister(true);
    setRadioMoveLocal(false);
  };
  const changeRadioMo = () => {
    setRadioRegister(false);
    setRadioMoveLocal(true);
  };
  const changeRadioAll = () => {
    setRadioRegister(false);
    setRadioMoveLocal(false);
  };
  const [RegisterMilitary, setRegisterMilitary] = useState([]);

  const [loaddata, setLoaddata] = useState(false);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("/register-military-management/filter-info-register?" + params)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setRegisterMilitary(List.data);
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
  }, [filter, loaddata]);

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

  ////submit form
  const [ErrAdd, setErrAdd] = useState();
  const Submit = async (form, ResetForm) => {
    try {
      const result = await Client.post(
        "/register-military-management/store-register-military?",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(result);
      if (result.data.status !== "Failed") {
        alert("Bạn đã thêm thành công!");
        setErrAdd(null);
        ResetForm();
        setLoaddata(!loaddata);
      } else {
        alert("Mã sinh viên không tồn tại!\nVui lòng kiểm tra lại!");
        setErrAdd([result.data.Err_Message]);
        // console.log(result.data.Err_Message);
      }
    } catch (error) {
      alert("Sinh viên này đã có thông tin giấy chứng nhận đăng ký!");
      console.log(error);
      // setErrAdd(Object.values(error.data.Err_Message));
    }
  };

  const SubmitMove = async (form, ResetForm) => {
    try {
      const result = await Client.post(
        "/move-military-local-management/store-move-military-local?",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(result);
      if (result.data.status !== "Failed") {
        alert("Bạn đã thêm thành công!");
        setErrAdd(null);
        ResetForm();
        setLoaddata(!loaddata);
      } else {
        alert("Mã sinh viên không tồn tại!\nVui lòng kiểm tra lại!");
        setErrAdd(["Mã sinh viên: " + result.data.Err_Message + " không tồn tại!"]);
        // console.log(result.data.Err_Message);
      }
    } catch (error) {
      alert("Sinh viên này đã có thông tin giấy giới thiệu di chuyển từ địa phương!");
      console.log(error);
      // setErrAdd(Object.values(error.data.Err_Message));
    }
  };

  // ImportFile
  const [ErrImport, setErrImport] = useState([]);
  const [ErrImportMSV, setErrImportMSV] = useState([]);
  const [ErrImportMaDK, setErrImportMaDK] = useState([]);

  const changeErrAll = () => {
    setErrImport([]);
    setErrImportMaDK([]);
    setErrImportMSV([]);
  }

  const ImportFile = async (e) => {
    e.preventDefault();
    const MyData = new FormData(e.target);
    if (radioRegister == true && radioMoveLocal == false) {
      // console.log(radioMoveLocal);
      // console.log(radioRegister);
      try {
        const Result = await Client.post(
          "/register-military-management/store-register-military-file",
          MyData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (Result.data.status === "Success") {
          alert("Bạn đã import thành công");
          setErrImport([]);
          setErrImportMSV([]);
        } else {
          setErrImport(Result.data.err);
          setErrImportMSV(Result.data.errMSV);
        }
      } catch (error) {
        // console.log(error);
      }
    } else if (radioMoveLocal == true && radioRegister == false) {
      try {
        const Result = await Client.post(
          "/move-military-local-management/store-move-military-local-file",
          MyData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (Result.data.status === "Success") {
          alert("Bạn đã import thành công");
          setErrImport([]);
          setErrImportMaDK([]);
        } else {
          setErrImport(Result.data.err);
          setErrImportMaDK(Result.data.errMaDK);
        }
      } catch (error) {
        // console.log(error);
      }
    }else{
      alert("Vui lòng chọn loại giấy cần import thông tin!");
      changeErrAll();
      changeRadioAll();
    }
  };

  // Show Hide
  const [ImportAndNew, setImportAndNew] = React.useState(true);
  const [chooseImport, setChooseImport] = React.useState(false);
  const [Register, setRegister] = React.useState(false);

  const onClickImport = () => {
    setImportAndNew(false);
    setChooseImport(true);
  };

  const onClickNew = () => {
    setRegister(true);
    setImportAndNew(false);
  };

  const onClickNewBack = () => {
    setRegister(false);
    setImportAndNew(true);
  };

  const onClickBackImport = () => {
    setChooseImport(false);
    setImportAndNew(true);
  };

  return (
    <React.Fragment>
      <div className="Register_military_container">
        <div className={Style.Register_header}>
          <HeaderTitle
            Title="Giấy Chứng Nhận Đăng Ký Nghĩa Vụ Quân Sự"
            Icon={<BsPersonPlusFill />}
          />
        </div>
        {/* phần thân  */}
        <div className={Style.Register_body}>
          {/* Import va tạo mới */}
          {ImportAndNew ? (
            <div className={Style.Register_button_main} id="btn_importAndNew">
              <div className={Style.Button_register}>
                <Button content="ImportFile" onClick={onClickImport} />
                <Button content="Tạo mới" onClick={onClickNew} />
              </div>
            </div>
          ) : null}

          {/* Choose file and import */}
          {chooseImport ? (
            <div className={clsx(Style.Import_choose, Style.Register_button)}>
              <div className={Style.HeaderFile}>
                <div className={Style.HeaderInp}>
                  <div className={Style.iconS}>
                    <BiHealth />
                  </div>
                  Chọn loại giấy để Import file:
                </div>
                <div className={Style.HeaderInp}>
                  <input
                    type="radio"
                    name="chooseImp"
                    onChange={changeRadioRe}
                  />{" "}
                  Giấy Chứng Nhận Đăng Ký Nghĩa vụ quân Sự
                </div>
                <div className={Style.HeaderInp}>
                  <input
                    type="radio"
                    name="chooseImp"
                    onChange={changeRadioMo}
                  />{" "}
                  Giấy Giới Thiệu Di Chuyển Nghĩa vụ quân Sự
                </div>
              </div>
              <form onSubmit={ImportFile} className={Style.FormImp}>
                <input type="file" name="file" required></input>
                <Button
                  content="ImportFile"
                  onClick={function () {
                    document.getElementById("Error").style.display = "block";
                  }}
                />
                <Button
                  content="Trở về"
                  onClick={function () {
                    onClickBackImport();
                    changeRadioAll();
                    changeErrAll();
                    document.getElementById("Error").style.display = "none";
                  }}
                />
              </form>
            </div>
          ) : null}

          <div id="Error">
            {ErrImport.length > 0 && (
              <ErrorImport
                ErrorrImport={ErrImport}
                column1="Hàng"
                column2="Nội dung"
              />
            )}
            {ErrImportMSV.length > 0 && (
              <ErrorImport
                ErrorrImport={ErrImportMSV}
                column1="Mã sinh viên"
                column2="Nội dung"
              />
            )}
            {ErrImportMaDK.length > 0 && (
              <ErrorImport
                ErrorrImport={ErrImportMaDK}
                column1="Mã đăng ký"
                column2="Nội dung"
              />
            )}
          </div>

          {/* giay chứng nhận đăng ký  */}
          {Register ? (
            <div className={Style.Register} id="Register">
              <div className={Style.Form_register}>
                <FormMilitary
                  maintitles={"Giấy xác nhận đăng ký Nghĩa Vụ Quân Sự"}
                  titles={titleFormRegister}
                  subtitles={subtitlesRegister}
                  onClickSave={function () {
                    document.getElementById("ErrAdd").style.display = "block";
                  }}
                  Submit={Submit}
                />
                <hr/>
                <FormMilitaryMoveLocal
                  maintitles={"Giấy giới thiệu di chuyển Nghĩa Vụ Quân Sự"}
                  titles={titleFormMoveLocal}
                  subtitles={subtitlesMoveLocal}
                  onClickSave={function () {
                    document.getElementById("ErrAdd").style.display = "block";
                  }}
                  onClickBack={function () {
                    onClickNewBack();
                    document.getElementById("ErrAdd").style.display = "none";
                  }}
                  Submit={SubmitMove}
                />
              </div>
            </div>
          ) : null}

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
                <div className={Style.cmbSearch_Item}>
                  <ComboBox
                    id="NgayNop"
                    title="Năm"
                    items={DateFilter.Year}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={Style.cmbSearch_Item}>
                  <ComboBox
                    id="TenKhoa"
                    title="Khoa"
                    items={Khoa}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={Style.cmbSearch_Item}>
                  <ComboBox
                    id="Khoas"
                    title="Khóa"
                    items={Khoas}
                    Change={ChangeFilter}
                  />
                </div>
                <div className={Style.cmbSearch_Item}>
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
            <div className={Style.Result_search}>
              <h2>Kết Quả Tìm Kiếm</h2>
            </div>
            <div className={style.DataList}>
              {Loading && <LoadingEffect />}
              <TableMilitary
                headers={tableHeaders}
                Content={
                  <TableRegisterData
                    loaddata={loaddata}
                    setLoaddata = {setLoaddata}
                    data={RegisterMilitary}
                    titles={titleForm}
                    subtitles={subtitles}
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegisterMilitary;
