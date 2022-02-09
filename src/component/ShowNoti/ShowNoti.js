import React from "react";
import style from "./ShowNoti.module.css";
import {MdOutlineDoubleArrow} from "react-icons/md";

function ShowNoti({data}){
    return(
        <div>
        {data.map((item) => (
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
        ))}
        </div>

    )
}

export default ShowNoti;
