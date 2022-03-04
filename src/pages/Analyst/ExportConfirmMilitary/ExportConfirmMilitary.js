import React, { useEffect, useRef, useState, useContext } from "react";
import style from "./ExportConfirmMilitary.module.css";
import { IoIosPaper } from "react-icons/io";
import { AiOutlineBarChart } from "react-icons/ai";
import ComboBox from "../../../component/ComboBox/ComboBox";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import queryString from "query-string";
import HeaderReport from "../../../component/HeaderReport/HeaderReport";
import Button from "../../../component/Button/Button";
import useAxios from "../../../Helper/API";
import { DataContext } from "../../../DataContext/DataContext";
import LineChartConfirm from "../../../component/Chart/LineChartConfirm";

function ExportConfirmMilitary(){
    const { Client } = useAxios();
    const { Khoas } = useContext(DataContext);
    const Time = useRef(null);
    const [result, setResult] = useState({});
    const [filter, setfilter] = useState({
        Nam: 2022,
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

    const CallAPI = () => {
        const params = queryString.stringify(filter);
        Client.get("/export-report/report-confirm-mili?" + params)
          .then((response) => {
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

    //xuat bao cao
    const ExportReport = () => {
        const params = queryString.stringify(filter);
        Client.get("/export-report/export-file-confirm-mili?" + params, {
          responseType: "blob",
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "BaoCaoGiayXacNhan.docx"); //or any other extension
            document.body.appendChild(link);
            link.click();
            alert("Đã xuất file");
          })
          .catch((err) => {
            alert("Tạm thời không thể xuất báo cáo");
          });
    };

    return (
        <div className={style.Export_Update_Container}>
            <HeaderTitle
                Title="Báo cáo tình trạng cấp phát Giấy xác nhận "
                Icon={<IoIosPaper />}
            />
            <div className={style.Update_Filter}>
                <div className={style.Update_Filter_Item}>
                <ComboBox
                    title="Ngày"
                    id="Ngay"
                    items={DateFilter.Day}
                    Change={ChangeFilter}
                />
                </div>
                <div className={style.Update_Filter_Item}>
                <ComboBox
                    title="Tháng"
                    id="Thang"
                    items={DateFilter.Month}
                    Change={ChangeFilter}
                />
                </div>

                <div className={style.Update_Filter_Item}>
                <ComboBox
                    title="Năm"
                    id="NgayCap"
                    items={DateFilter.Year}
                    Change={ChangeFilter}
                />
                </div>

                <div className={style.Update_Filter_Item}>
                    <ComboBox
                        title="Khóa"
                        id="Khoas"
                        items={Khoas}
                        Change={ChangeFilter}
                />
                </div>
            </div>
            <div className={style.ReportContent}>
                <HeaderReport title="Biểu đồ biến động" icon={<AiOutlineBarChart />} />
                <label className={style.note}>(Chọn năm và khóa để xem tình trạng cấp phát)</label>
                <div className={style.Chart}>
                    <LineChartConfirm
                        title='Biểu đồ thể hiện tình trạng cấp phát Giấy xác nhận'
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
                        label1 = "Giấy xác nhận"
                    />
                </div>
                <div className={style.Chart_Details}>
                    <p className={style.Sum_People}>
                        Tổng số giấy xác nhận đã cấp phát:
                        <span>{result.Total_Learning ? result.Total_Learning : 0}</span>
                    </p>
                </div>
                <Button
                content="Xuất báo cáo"
                styles={{ marginTop: "5px" }}
                onClick={ExportReport}
                />
            </div>
        </div>
    )
}

export default ExportConfirmMilitary;