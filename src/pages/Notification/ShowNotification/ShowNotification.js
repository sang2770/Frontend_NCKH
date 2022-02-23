import React, { useState, useContext, useRef } from "react";
import Button from "../../../component/ButtonMiliNoti/Button";
import ComboBox from "../../../component/ComboboxMiliNoti/Combobox";
import style from "./ShowNotification.module.css";
import {MdOutlineDoubleArrow} from "react-icons/md";
import { DataContext } from "../../../DataContext/DataContext";
import {BiHealth} from "react-icons/bi";
import useAxios from "../../../Helper/API";
import Style from "../UpdateNotification/UpdateNotification.module.css";
import { TiDeleteOutline } from "react-icons/ti";

const ShowNotification = ({data, onClickHide, datadelete, setDelete }) => {
    const { Client } = useAxios();
    const { Lop, Khoa, Khoas } = useContext(DataContext);

    // Show Hide
    const [DropDown, setDropDown] = useState(false);
    const [DropDownBtn, setDropDownBtn] = useState(true);

    const ChangeDropDownShow = () => {
      setDropDown(!DropDown);
    };

    const ChangeDropDownBtn = () => {
        setDropDownBtn(!DropDownBtn);
    };
    
    // gui thong bao
    const [FilterKhoa, setFilterKhoa] = useState("");
    const [FilterKhoas, setFilterKhoas] = useState("");
    const [FilterLop, setFilterLop] = useState("");
  
    const changeKhoa = (event) => {
      setFilterKhoa(event.target.value)
    }
    const changeKhoas = (event) => {
      setFilterKhoas(event.target.value)
    }
    const changeLop = (event) => {
      setFilterLop(event.target.value)
    }
  
    const SentNotification = async (idTBC) => {
        if(FilterKhoa === "" && FilterKhoas === "" && FilterLop === ""){
            alert("Bạn chưa chọn thông tin khoa khóa lớp để gửi thông báo!");
        }
        else{
            Client.post("/notification-management/sent-notification-students?MaThongBaoChinh=" + idTBC +
            "&TenLop=" + FilterLop + "&Khoas=" + FilterKhoas + "&TenKhoa=" + FilterKhoa)
            .then((response) => {
            if (response.data.status === "Success") {
                alert("Bạn đã gửi thông báo thành công");
            }
            })
            .catch((err) => {
                alert("Có lỗi!");
            });
        }
    };

    ////update form
    const [store, setStore] = useState(false);
    const [contentStore, setContentStore] = useState(true);
    const showStore = () => {
        setStore(!store);
        setContentStore(!contentStore);
        ChangeDropDownBtn();
    }

    const FilterTieuDeTB = useRef("");
    const FilterNoiDungTB = useRef("");

    const [idTB, setIdTB] = useState();
    const changeIdIB = (id) => {
        setIdTB(id);
    }

    const [dataNoti, setDataNoti] = useState([]);
    const updateNotifi = () => {
        if( window.confirm("Bạn có muốn cập nhật thông báo này không?") === true){
            idTB && FilterNoiDungTB && FilterTieuDeTB && Client.put("/notification-management/update-notification/" 
            + idTB + "?NoiDungTB=" + FilterNoiDungTB.current.value + "&TieuDeTB=" + FilterTieuDeTB.current.value)
            .then((response) => {
            if (response.data.status === "Success updated") {
                console.log(response.data.data["TieuDeTB"]);
                setDataNoti(response.data.data);
                setDelete(!datadelete);
                alert("Bạn đã cập nhật thông báo thành công!!!");
            }else{
                alert("Có lỗi!!!***")
            }
            })
            .catch((err) => {
                alert("Có lỗi!!!");
            });
        }
    };

    const Form = useRef();
    const SubmitForm = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        updateNotifi(form, ResetForm);
    };
    const ResetForm = () => {
        Form.current.reset();
    };  

    return (
        <React.Fragment>
            <div>
                {data.map((item, index) => (
                <div className={style.MainNoti} key={index}>
                    <div className={style.iconX} onClick = {onClickHide}>
                        <TiDeleteOutline/>
                    </div>
                    {contentStore ? (
                    <div className={style.Content}>
                        {/* Main Content Notification */}
                        <h4 className={style.ContentNoti_main_h1}>NỘI DUNG THÔNG BÁO</h4>
                        <div className={style.Main_ShowNoti}>
                            <div className={style.header}>
                                <div className={style.IconNoti}>
                                    <MdOutlineDoubleArrow/>
                                </div>
                                <div className={style.TieuDeTB}>
                                    <label>{item.TieuDeTB}</label>
                                </div>
                            </div>
                            <div className={style.ContentNoti}>
                                <label>{item.NoiDungTB}</label>
                            </div>
                        </div>
                    </div>
                    ) : null}

                    {store ? (
                        <div className={Style.Main_store}>
                            <div className={Style.Main}>
                                <form  onSubmit={SubmitForm}>
                                    <div className={Style.Content_store}>
                                        <div className={Style.Conetent_tittel}>
                                            <label className={Style.Content_lable}>
                                                Tiêu đề thông báo
                                            </label>
                                            <input 
                                                className={Style.Content_input}
                                                id="TieuDeTB"
                                                ref={FilterTieuDeTB}
                                                type="text"
                                                name="TieuDeTB"
                                                defaultValue={data === undefined ? "" : item.TieuDeTB}
                                                required
                                            />
                                        </div>
                                        <div className={Style.Content_main}>
                                            <label className={Style.Content_lable}>
                                                Nội dung thông báo
                                            </label>
                                            <textarea 
                                                className={Style.Content_textarea}
                                                id="NoiDungTB"
                                                type="text"
                                                ref={FilterNoiDungTB}
                                                name="NoiDungTB"
                                                defaultValue={data === undefined ? "" : item.NoiDungTB}
                                                required
                                            />
                                        </div>
                                        <div className={Style.Content_file}>
                                            <label className={Style.Content_lable}>File đính kèm</label>
                                            <input type="file" name="file" className={Style.Content_input_file}></input>
                                        </div>
                                    </div>
                                    
                                    <div className={Style.button}>
                                        <Button content="Cập nhật" onClick={() => {
                                            changeIdIB(item.MaThongBaoChinh)
                                        }}/>
                                        <Button content="Quay lại" onClick={showStore} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : null}

                    {/* Gui thong bao */}
                    {DropDown ? (
                    <div className={style.ContentNoti_main}>
                        <h4 className={style.ContentNoti_main_h1}>THÔNG BÁO ĐẾN SINH VIÊN</h4>
                        <div className={style.SentNoti}>
                            <div className={style.ContentNoti_search}>
                                <div className={style.ContentNoti_main_lable}>
                                    <div className={style.icon}><BiHealth/></div>
                                    <label>Chọn thông tin sinh viên cần gửi thông báo!</label>
                                </div>
                                <div className={style.ContentNoti_main_search}>
                                    <ComboBox id = {FilterKhoa} title="Khoa" items={Khoa} Change = {changeKhoa}/>
                                    <ComboBox id = {FilterKhoas} title="Khóa" items={Khoas} Change = {changeKhoas}/>
                                    <ComboBox id = {FilterLop} title="Lớp" items={Lop} Change = {changeLop}/>
                                </div>
                                <div className={style.checkNoti}>
                                    <label>Sinh viên chưa nộp giấy nghĩa vụ quân sự</label>
                                    <input type="checkbox"></input>
                                </div>
                            </div>
                            <div className={style.button}>
                                <div className={style.btn}>
                                    <Button 
                                        content = "Gửi"
                                        onClick={() => {
                                            SentNotification(item.MaThongBaoChinh)
                                        }}
                                    />
                                </div>
                                <div className={style.btn}>
                                    <Button
                                        content = "Quay lại"
                                        onClick={() => {
                                            ChangeDropDownShow();
                                            ChangeDropDownBtn();
                                        }}/>
                                </div>
                            </div> 
                        </div> 
                    </div>
                    ) : null}

                    {DropDownBtn ? (
                        <div className={style.button} id = "btn">
                            <Button 
                                content="Sửa thông báo" 
                                onClick={showStore}
                            />
                            <Button 
                                content="Gửi thông báo" 
                                onClick={() => {
                                    ChangeDropDownShow();
                                    ChangeDropDownBtn();
                                }} 
                            />
                        </div>
                    ): null}
                </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default ShowNotification;
