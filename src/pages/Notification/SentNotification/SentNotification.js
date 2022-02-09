import React, {useContext, useState} from "react";
import style from "./SentNotification.module.css";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import { DataContext } from "../../../DataContext/DataContext";
import {BiHealth} from "react-icons/bi";
import Button from "../../../component/ButtonMiliNoti/Button";

function SentNotification({ onClickHide } ){
    const { Lop, Khoa, Khoas } = useContext(DataContext);

    const [change, setChange] = useState(onClickHide);
    const onClickHide2 = () => {
        setChange(!change);
    }
    return (
        <React.Fragment>
            <div>
                {change ? (
                    <div className={style.ContentNoti_main}>
                        <h4 className={style.ContentNoti_main_h1}>THÔNG BÁO ĐẾN SINH VIÊN</h4>
                        <div className={style.SentNoti}>
                            <div className={style.ContentNoti_search}>
                                <div className={style.ContentNoti_main_lable}>
                                    <div className={style.icon}><BiHealth/></div>
                                    <label>Chọn thông tin sinh viên cần gửi thông báo!</label>
                                </div>
                                <div className={style.ContentNoti_main_search}>
                                    <div className={style.cmbSent}>
                                        <ComboBox title="Khoa" items={Khoa}/>
                                        <ComboBox title="Khóa" items={Khoas}/>
                                    </div>
                                    <div className={style.cmbLop}>
                                        <ComboBox title="Lớp" items={Lop}/>
                                    </div>
                                </div>
                                <div className={style.checkNoti}>
                                    <label>Sinh viên chưa nộp giấy nghĩa vụ quân sự</label>
                                    <input type="checkbox"></input>
                                </div>
                            </div>
                            <div className={style.button}>
                                <div className={style.btn}>
                                    <Button content = "Gửi"/>
                                </div>
                                <div className={style.btn}>
                                    <Button
                                        content = "Quay lại"
                                        onClick={() => {
                                            onClickHide2();
                                        }}/>
                                </div>
                            </div> 
                        </div> 
                    </div>
                ) : null}
            </div>
        </React.Fragment>
    )
}

export default SentNotification;