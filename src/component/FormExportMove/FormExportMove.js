import React, { useEffect, useRef, useState, useContext } from "react";
import style from "./FormExportMove.module.css";
import { BiExit } from "react-icons/bi";
import ComboBox from "../../component/ComboBox/ComboBox";
import useAxios from "../../Helper/API";
import Button from "../ButtonMiliNoti/Button";

function FormExportMove({ nameSV, msv, changeData, setChangeData, exit, url }) {
  const { Client } = useAxios();
  const [Err, setErr] = useState(null);

  const Time = useRef(null);
  const [filter, setfilter] = useState({
    NamHH: new Date().getFullYear(),
    limit: 10,
    page: 1,
  });

  const [DateFilter, setDate] = useState({
    Year: [],
    Month: [],
    Day: [],
  });

  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }

    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };

  useEffect(() => {
    const max = 5;
    const CurrentYear = new Date().getFullYear();
    const year = [];
    for (let i = 0; i < max; i++) {
      year.push(CurrentYear - i);
    }
    const month = [];
    for (let i = 0; i < 12; i++) {
      month.push(i + 1);
    }
    setDate({ ...DateFilter, Month: month, Year: year });
  }, []);

  useEffect(() => {
    if (filter.ThangHH && filter.NamHH) {
      const daysInMonth = new Date(filter.NamHH, filter.ThangHH, 0).getDate();
      const day = [];
      for (let i = 1; i <= daysInMonth; i++) {
        day.push(i);
      }
      setDate({ ...DateFilter, Day: day });
    }
  }, [filter]);
  // chi huy truong
  const [commander, setCommander] = useState([]); // phó
  const [commanderCaptain, setCommanderCaptain] = useState([]); // trưởng
  useEffect(() => {
    Client.get("/commander-management/GetListCommanderName")
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setCommander(List.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  useEffect(() => {
    Client.get("/commander-management/GetListCommanderNameCaptain")
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setCommanderCaptain(List.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  // Export
  const Export = async () => {
    if (
      filter.NgayHH == undefined ||
      filter.ThangHH == undefined ||
      filter.NgayHH == "" ||
      filter.ThangHH == ""
    ) {
      alert("Vui lòng chọn thời gian hết hạn!");
    } else if (filter.HoVaTen == undefined || filter.HoVaTen == "") {
      alert("Vui lòng chọn người ký giấy!");
    } else {
      if (msv) {
        nameSV = nameSV + "_" + msv;
        url =
          "/move-military-management/move-military?MaSinhVien=" +
          msv +
          "&NgayHH=" +
          filter.NgayHH +
          "&NamHH=" +
          filter.NamHH +
          "&ThangHH=" +
          filter.ThangHH +
          "&HoVaTen=" +
          filter.HoVaTen;
      } else if (url) {
        url =
          url +
          "&NgayHH=" +
          filter.NgayHH +
          "&NamHH=" +
          filter.NamHH +
          "&ThangHH=" +
          filter.ThangHH +
          "&HoVaTen=" +
          filter.HoVaTen;
        nameSV = "DanhSachGiayDiChuyenNVQS";
      }
      Client.get(url, {
        responseType: "blob",
      })
        .then((response) => {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", nameSV + ".docx");
          document.body.appendChild(link);
          link.click();
          alert("Đã xuất file");
          setChangeData(!changeData);
        })
        .catch((err) => {
          setErr(true);
          console.log(err);
          alert("Có lỗi!");
        });
    }
  };

  return (
    <div className={style.FormUpdate}>
      <div className={style.InfoUpdate}>
        <div className={style.Btn_Exit} onClick={exit}>
          <BiExit />
        </div>
        <div className={style.text}>
          <p>Giấy có giá trị hiệu lực đến ngày:</p>
        </div>
        <div className={style.Update_Filter}>
          <div className={style.Update_Filter_Item}>
            <ComboBox
              title="Năm"
              id="NamHH"
              items={DateFilter.Year}
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Update_Filter_Item}>
            <ComboBox
              title="Tháng"
              id="ThangHH"
              items={DateFilter.Month}
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Update_Filter_Item}>
            <ComboBox
              title="Ngày"
              id="NgayHH"
              items={DateFilter.Day}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.text}>
          <p>Chọn người ký giấy (Chỉ chọn một trong hai):</p>
        </div>
        <div className={style.Update_Filter}>
          <div className={style.Update_Filter_Item}>
            <ComboBox
              title="Chỉ huy trưởng"
              id="HoVaTen"
              items={commanderCaptain}
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Update_Filter_Item}>
            <ComboBox
              title="Chỉ huy phó"
              id="HoVaTen"
              items={commander}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.btn}>
          <Button content="Cấp giấy" onClick={Export} />
        </div>
      </div>
    </div>
  );
}

export default FormExportMove;
