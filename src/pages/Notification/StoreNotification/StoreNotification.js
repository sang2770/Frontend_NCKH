import React, {useState} from "react";
import style from "./StoreNotification.module.css";
import Button from "../../../component/ButtonMiliNoti/Button";
import Notification from "../Notifications/Notifications";
import FormStoreNoti from "../../../component/FormStoreNoti/FormStoreNoti";
import useAxios from "../../../Helper/API";

function StoreNotification(){

    const Client = useAxios();
  
    //// show hide
    const [Noti, setNoti] = React.useState(false)
    const [StoreNoti, setStoreNoti] = React.useState(true)

    const onClickBackNoti = () => 
    {
        setStoreNoti(false);
        setNoti(true);
    }

      ////submit form
    const [ErrAdd, setErrAdd] = useState();
    const Submit = async (form, ResetForm) => {
        try {
        const result = await Client.post("/notification-management/store-notification?", form, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        console.log(result);
        if (result.data.status !== "Failed") {
            alert("Bạn đã thêm thành công!");
            setErrAdd(null);
            ResetForm();
        } else {
            alert("Có lỗi");
            setErrAdd([result.data.Err_Message]);
            console.log(result.data.Err_Message);
        }
        } catch (error) {
        alert("Có lỗi! Vui lòng kiểm tra lại!");
        console.log(error);
        setErrAdd(Object.values(error.data.Err_Message));
        }
    };

    return (
        <React.Fragment>
            <div>
            { Noti ? <Notification /> : null }
            { StoreNoti ? (
                <div className={style.Main_store}>
                    <div className={style.Main}>
                        <div className={style.Header_tittel}>
                            <h1>THÔNG BÁO</h1>
                        </div>
                        <FormStoreNoti onClickBack = {onClickBackNoti} Submit = {Submit}/>
                    </div>
                    {ErrAdd && (
                    <div className={style.Err_container}>
                        <h2 className={style.ErrTitle}>Có Lỗi!!!</h2>
                        <div className={style.ResultImport}>
                        <table className={style.TableErr} border={1}>
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
            ) : null}
            </div>
        </React.Fragment>
    )
}

export default StoreNotification;


// 
