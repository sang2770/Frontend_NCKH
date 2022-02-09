import React, {useState, useRef} from "react";
import style from "./UpdateNotification.module.css";
import useAxios from "../../../Helper/API";
import Button from "../../../component/ButtonMiliNoti/Button";

function UpdateNotification({data, idTB, status}){

    const Client = useAxios();

      ////update form
    const FilterTieuDeTB = useRef("");
    const FilterNoiDungTB = useRef("");
  
    const updateNotifi = () => {
        console.log(idTB);
        console.log(FilterTieuDeTB.current.value);
        console.log(FilterNoiDungTB.current.value);
        if( window.confirm("Bạn có muốn cập nhật thông báo này không?") === true){
            idTB && FilterNoiDungTB && FilterTieuDeTB && Client.put("/notification-management/update-notification/" + idTB + "?NoiDungTB=" + FilterNoiDungTB.current.value + "&TieuDeTB=" + FilterTieuDeTB.current.value)
            .then((response) => {
            if (response.data.status === "Success updated") {
                alert("Bạn đã cập nhật thông báo thành công!!!");
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

    const [statusNoti, setStatusNoti] = useState(status);

    const changeStatus = () => {
        setStatusNoti(!statusNoti);
    }

    return (
        <React.Fragment>
        {statusNoti ? (
            <div className={style.Main_store}>
                <div className={style.Main}>
                    <form  onSubmit={SubmitForm}>
                        {data && data.map((item) => (
                        <div className={style.Content_store}>
                            <div className={style.Conetent_tittel}>
                                <label className={style.Content_lable}>
                                    Tiêu đề thông báo
                                </label>
                                <input 
                                    className={style.Content_input}
                                    id="TieuDeTB"
                                    ref={FilterTieuDeTB}
                                    type="text"
                                    name="TieuDeTB"
                                    onChange=""
                                    defaultValue={data === undefined ? "" : item.TieuDeTB}
                                    required
                                />
                            </div>
                            <div className={style.Content_main}>
                                <label className={style.Content_lable}>
                                    Nội dung thông báo
                                </label>
                                <textarea 
                                    className={style.Content_textarea}
                                    id="NoiDungTB"
                                    type="text"
                                    ref={FilterNoiDungTB}
                                    name="NoiDungTB"
                                    onChange=""
                                    defaultValue={data === undefined ? "" : item.NoiDungTB}
                                    required
                                />
                            </div>
                            <div className={style.Content_file}>
                                <label className={style.Content_lable}>File đính kèm</label>
                                <input type="file" name="file" className={style.Content_input_file}></input>
                            </div>
                        </div>
                        ))}
                        
                        <div className={style.button}>
                            <Button content="Cập nhật"/>
                            <Button content="Quay lại" onClick={changeStatus} />
                        </div>
                    </form>
                </div>
            </div>
        ) : null}
        </React.Fragment>
    )
}

export default UpdateNotification;


// 
