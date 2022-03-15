import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import ComboBox from "../../../component/ComboBox/ComboBox";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import TextBox from "../../../component/TextBox/TextBox";
import { DataContext } from "../../../DataContext/DataContext";
import style from "./ExportFluctation.module.css";
import queryString from "query-string";
import HeaderReport from "../../../component/HeaderReport/HeaderReport";
import Button from "../../../component/Button/Button";
import ChartColumn from "../../../component/Chart/ChartColumn";
import useAxios from "../../../Helper/API";

function ExportFluctation() {
  const { Client, Loading } = useAxios();
  const [result, setResult] = useState({});
  const [filter, setfilter] = useState({
    Nam: new Date().getFullYear(),
  });
  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      // console.log(input.name);
      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };
  const Time = useRef(null);
  const { Lop, Khoa, Khoas } = useContext(DataContext);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/student-fluctuations?" + params)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "Success") {
          setResult(response.data.data);
        } else {
          alert(response.data.Err_Message);
        }
      })
      .catch((err) => {
        alert("Có lỗi");
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
  const ListYear = () => {
    const max = 100;
    const CurrentYear = new Date().getFullYear();
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push(CurrentYear - i);
    }
    return result;
  };
  const ExportReport = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/export-student-fluctuations?" + params, {
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Report.docx"); //or any other extension
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
      })
      .catch((err) => {
        alert("Tạm thời không thể xuất báo cáo");
      });
  };
  return (
    <div className={style.Export_Fluc_Container}>
      <HeaderTitle
        Title="Báo cáo biến động sinh viên"
        Icon={<BsFillPeopleFill />}
      />
      <div className={style.Fluctation_Filter}>
        <div className={style.Fluctation_Filter_Item}>
          <ComboBox
            title="Năm"
            id="Nam"
            items={ListYear()}
            Change={ChangeFilter}
            data={{ Nam: new Date().getFullYear() }}
          />
        </div>
        <div className={style.Fluctation_Filter_Item}>
          <ComboBox id="Lop" title="Lớp" items={Lop} Change={ChangeFilter} />
        </div>
        <div className={style.Fluctation_Filter_Item}>
          <ComboBox title="Khoa" id="Khoa" items={Khoa} Change={ChangeFilter} />
        </div>
        <div className={style.Fluctation_Filter_Item}>
          <ComboBox
            title="Khóa"
            id="Khoas"
            items={Khoas}
            Change={ChangeFilter}
          />
        </div>
      </div>
      <Button
        content="Xuất báo cáo"
        styles={{ margin: "8px" }}
        onClick={ExportReport}
      />
      <div className={style.ReportContent}>
        <HeaderReport title="Biểu đồ biến động" icon={<AiOutlineBarChart />} />
        <div className={style.Chart}>
          <ChartColumn
            datas={result.Chart}
            NameChart="Biểu đồ biến động sinh viên"
            labels={[
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ]}
          />
        </div>
        <div className={style.Chart_Details}>
          <p className={style.Sum_People}>
            Tổng số người đang quản lý:
            <span>{result.Total_Learning ? result.Total_Learning : 0}</span>
          </p>
          <p className={style.Sum_People}>
            Tổng số người đã rời khỏi:
            <span>{result.Total_Out ? result.Total_Out : 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExportFluctation;
