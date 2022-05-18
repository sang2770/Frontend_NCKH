import React, { useEffect, useRef, useState, useContext } from "react";
import style from "./FormExportMove.module.css";
import { BiExit } from "react-icons/bi";
import ComboBox from "../../component/ComboBox/ComboBox";
import useAxios from "../../Helper/API";
import Button from "../ButtonMiliNoti/Button";

function FormExportConfirm({ nameSV, msv, changeData, setChangeData, exit, url, mYC }) {
    const { Client } = useAxios();
    const [Err, setErr] = useState(null);

    const Time = useRef(null);
    const [filter, setfilter] = useState({
        limit: 10,
        page: 1,
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
        if(filter.HoVaTen == undefined || filter.HoVaTen == ""){
            alert("Vui lòng chọn người ký giấy!");
        }
        else{
            if(msv && mYC){
                nameSV = nameSV + "_" + msv;
                url =  "/confirm-military-management/confirm-military?MaSinhVien=" + msv + "&HoVaTen=" + filter.HoVaTen;
            }
            else if(msv){
                nameSV = nameSV + "_" + msv;
                url =  "/confirm-military-management/confirm-military-off?MaSinhVien=" + msv + "&HoVaTen=" + filter.HoVaTen;
            }else if(url){
                url = url + "&HoVaTen=" + filter.HoVaTen;
                nameSV = "DanhSachGiayXacNhanNVQS";
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
                <div className={style.btn}><Button content="Cấp giấy" onClick={Export}/></div>
            </div>
        </div>
    );
}

export default FormExportConfirm;
