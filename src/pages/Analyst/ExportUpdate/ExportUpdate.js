import React, { useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Pagination from "../../../component/Pagination/Pagination";
import { AiOutlineBarChart } from "react-icons/ai";
import ComboBox from "../../../component/ComboBox/ComboBox";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import style from "./ExportUpdate.module.css";
import queryString from "query-string";
import HeaderReport from "../../../component/HeaderReport/HeaderReport";
import Button from "../../../component/Button/Button";
import useAxios from "../../../Helper/API";
import TextBox from "../../../component/TextBox/TextBox";
function ExportUpdate() {
  const GetDate = (date) => {
    date = new Date(date);
    return (
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " - " +
      date.getDate() +
      "/" +
      date.getMonth() +
      1 +
      "/" +
      date.getFullYear()
    );
  };
  const { Client, Loading } = useAxios();
  const [result, setResult] = useState({});
  const [filter, setfilter] = useState({
    Nam: 2022,
    limit: 10,
    page: 1,
  });
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
    TotalPage: 1,
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
    if (e.target.name === "Thang") {
      //   var dt = new Date();
      //   var month = dt.getMonth();
      //   var year = dt.getFullYear();
      //  daysInMonth = new Date(year, month, 0).getDate();
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };
  useEffect(() => {
    if (filter.Thang && filter.Nam) {
      const daysInMonth = new Date(filter.Nam, filter.Thang, 0).getDate();
      const day = [];
      for (let i = 1; i <= daysInMonth; i++) {
        day.push(i);
      }
      setDate({ ...DateFilter, Day: day });
    }
  }, [filter]);

  const Time = useRef(null);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/student-update?" + params)
      .then((response) => {
        // console.log(response);
        if (response.data.status === "Success") {
          setResult(response.data.data);
          setPaginations(response.data.pagination);
        } else {
          alert(response.data.Err_Message);
        }
      })
      .catch((err) => {
        alert("C?? l???i");
      });
  };
  useEffect(() => {
    const max = 100;
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
  const ListDay = () => {
    const max = 100;
    const CurrentYear = new Date().getFullYear();
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push(CurrentYear - i);
    }
    return result;
  };
  const ChangeLimit = (e) => {
    const input = e.target;
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      setfilter({ ...filter, limit: input.value, page: 1 });
    }, 300);
  };
  const ExportReport = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/export-student-update?" + params, {
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `BaoCaoCapNhatSinhVien_${filter.MaSinhVien}_${filter.Nam}.docx`
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        alert("???? xu???t file");
      })
      .catch((err) => {
        alert("T???m th???i kh??ng th??? xu???t b??o c??o");
      });
  };
  return (
    <div className={style.Export_Update_Container}>
      <HeaderTitle
        Title="B??o c??o th??ng k?? c???p nh???t sinh vi??n "
        Icon={<BsFillPeopleFill />}
      />
      <div className={style.Update_Filter}>
        <div className={style.Update_Filter_Item}>
          <ComboBox
            title="Ng??y"
            id="Ngay"
            items={DateFilter.Day}
            Change={ChangeFilter}
          />
        </div>
        <div className={style.Update_Filter_Item}>
          <ComboBox
            title="Th??ng"
            id="Thang"
            items={DateFilter.Month}
            Change={ChangeFilter}
          />
        </div>

        <div className={style.Update_Filter_Item}>
          <ComboBox
            title="N??m"
            id="Nam"
            items={DateFilter.Year}
            Change={ChangeFilter}
          />
        </div>

        <div className={style.Update_Filter_Item}>
          <TextBox
            title="M?? sinh vi??n"
            subtitle="MaSinhVien"
            Change={ChangeFilter}
            search={true}
          />
        </div>
      </div>

      <div className={style.ReportContent}>
        {result.Total_Update ? (
          <div className={style.Chart_Details}>
            <p className={style.Sum_People}>
              T???ng s??? l???n c???p nh???t:
              <span>{result.Total_Update ? result.Total_Update : 0}</span>
            </p>
          </div>
        ) : (
          ""
        )}
        {result.Details ? (
          <React.Fragment>
            <HeaderReport title="Chi ti???t" icon={<AiOutlineBarChart />} />
            <div className={style.ListDetails}>
              <table className={style.TableDetails} style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Th???i gian</th>
                    <th>Ng?????i s???a</th>
                    <th>N???i dung</th>
                  </tr>
                </thead>
                <tbody>
                  {result.Details.map((item, index) => {
                    return (
                      <tr key={item}>
                        <td>{GetDate(item.ThoiGian)}</td>
                        <td>{item.TenDangNhap}</td>
                        <td>
                          {Object.keys(item.NoiDung).map((key) => (
                            <p>
                              {key} : {item.NoiDung[key]}
                            </p>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                title="S??? sinh vi??n"
                paginations={paginations}
                filter={filter}
                setfilter={setfilter}
                ChangeLimit={ChangeLimit}
              />
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        {result.Total_Update ? (
          <Button
            content="Xu???t b??o c??o"
            styles={{ marginTop: "5px" }}
            onClick={ExportReport}
          />
        ) : (
          <Button
            content="Th???ng k??"
            styles={{ marginTop: "5px" }}
            onClick={CallAPI}
          />
        )}
      </div>
    </div>
  );
}

export default ExportUpdate;
