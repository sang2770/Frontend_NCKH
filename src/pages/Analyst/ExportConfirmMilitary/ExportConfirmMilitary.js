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
    const { Khoa, Khoas } = useContext(DataContext);
    const Time = useRef(null);
    const [result, setResult] = useState({});

    var today = new Date().getFullYear();
    const [filter, setfilter] = useState({
        Nam: today,
        limit: 10,
        page: 1,
    });
    
    const [DateFilter, setDate] = useState({
        Year: [],
        Month: [],
        // Day: [],
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
            alert("C?? l???i");
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
            alert("???? xu???t file");
          })
          .catch((err) => {
            alert("T???m th???i kh??ng th??? xu???t b??o c??o");
          });
    };

    return (
        <div className={style.Export_Update_Container}>
            <HeaderTitle
                Title="B??o c??o t??nh tr???ng c???p ph??t Gi???y x??c nh???n "
                Icon={<IoIosPaper />}
            />
            <div className={style.Update_Filter}>
                <div className={style.Update_Filter_Item}>
                  <ComboBox
                      title="N??m"
                      id="NgayCap"
                      items={DateFilter.Year}
                      Change={ChangeFilter}
                      data={{ Nam: today }}
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
                        title="Khoa"
                        id="TenKhoa"
                        items={Khoa}
                        Change={ChangeFilter}
                    />
                </div>

                <div className={style.Update_Filter_Item}>
                  <ComboBox
                      title="Kh??a"
                      id="Khoas"
                      items={Khoas}
                      Change={ChangeFilter}
                  />
                </div>
            </div>
            <div className={style.ReportContent}>
                <div className={style.TittelChart}>
                  <HeaderReport title="Bi???u ????? bi???n ?????ng" icon={<AiOutlineBarChart />} />
                  <label className={style.note}>(Ch???n n??m v?? kh??a ????? xem t??nh tr???ng c???p ph??t)</label>
                  <div className={style.btnXBC}>
                    <Button
                      content="Xu???t b??o c??o"
                      styles={{ marginTop: "5px"}}
                      onClick={ExportReport}
                    />
                  </div>
                </div>
                <div className={style.Chart}>
                    <LineChartConfirm
                        title='Bi???u ????? th??? hi???n t??nh tr???ng c???p ph??t Gi???y x??c nh???n'
                        datas={result.Chart}
                        NameChart="Bi???u ????? bi???n ?????ng sinh vi??n"
                        labels={[
                        "Th??ng 1",
                        "Th??ng 2",
                        "Th??ng 3",
                        "Th??ng 4",
                        "Th??ng 5",
                        "Th??ng 6",
                        "Th??ng 7",
                        "Th??ng 8",
                        "Th??ng 9",
                        "Th??ng 10",
                        "Th??ng 11",
                        "Th??ng 12",
                        ]}
                        label1 = "Gi???y x??c nh???n"
                    />
                </div>
                <div className={style.Chart_Details}>
                    <p className={style.Sum_People}>
                        T???ng s??? gi???y x??c nh???n ???? c???p ph??t:
                        <span>{result.Total_Learning ? result.Total_Learning : 0}</span>
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default ExportConfirmMilitary;