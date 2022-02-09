import React, {useState} from "react";
import style from "./ItemNotification.module.css";
import {AiOutlineStar} from "react-icons/ai";
import ShowNotification from "../../pages/Notification/ShowNotification/ShowNotification";
import useAxios from "../../Helper/API";
import clsx from "clsx";

function ItemNotification({ data, onClickSent }){

    const [DropDown, setDropDown] = useState(-1);

    const ChangeDropDown = (id) => {
      setDropDown(id);
    };
  
    const ChangeDropDownShowNoti = () => {
        setDropDown(-1);
    }

    const { Client } = useAxios();

    const [Err, setErr] = useState(null);

    const [ContentNoti, setContentNoti] = useState([]);
    const list = (MaTB) => {
        Client.get("/notification-management/show-notification/" + MaTB)
            .then((response) => {
            const List = response.data;
            if (List.status === "Success") {
                setContentNoti(List.data);
            }
            })
            .catch((err) => {
            setErr(true);
            });
    };

    return (
        <tbody className={style.bodyNoti}>
            {data.map((item, index) => (
            <React.Fragment key={index}>
                <div className={clsx(style.Noti)}>
                    <div className={style.LeftNoti}>
                        <div className={style.icon}><AiOutlineStar/></div>
                        <div className={style.Noti_label}>
                            <label 
                                onClick={() => {
                                    ChangeDropDown(index)
                                    list(item.MaThongBaoChinh)
                                }}
                            >
                                {item.TieuDeTB}
                            </label>
                        </div>
                    </div>
                    <div className={style.Noti_input}>
                        <input 
                            type="checkbox"
                        />
                    </div>
                </div>
                <div className={clsx(
                    style.FormData,
                    DropDown === index && style.Active_Form
                    )}
                >
                    <ShowNotification 
                        data={ContentNoti} 
                        onClickHide = {ChangeDropDownShowNoti}
                        idTB = {item.MaThongBaoChinh}
                    />
                </div>
            </React.Fragment>
            ))}
        </tbody>
    )
}

export default ItemNotification;