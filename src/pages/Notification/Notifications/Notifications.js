import React, { useState, useRef, useEffect } from "react";
import style from "./Notification.module.css";
import Button from "../../../component/ButtonMiliNoti/Button";
import Pagination from "../../../component/Pagination/Pagination";
import ItemNotification from "../../../component/ItemNotification/ItemNotification";
import queryString from "query-string";
import useAxios from "../../../Helper/API";
import StoreNotification from "../StoreNotification/StoreNotification";
import SentNotification from "../SentNotification/SentNotification";

function Notification(){

    const { Client } = useAxios();
  
    const [Err, setErr] = useState(null);

    const [TieuDe, setTieuDe] = useState([]);

    const [paginations, setPaginations] = useState({
        limit: 10,
        page: 1,
        TotalPage: 1,
    });
    const [filter, setfilter] = useState({
        limit: 10,
        page: 1,
    });
    
    useEffect(() => {
        const params = queryString.stringify(filter);
        Client.get("/notification-management/index-header-notification?" + params)
          .then((response) => {
            const List = response.data;
            if (List.status === "Success") {
              setPaginations(List.pagination);
              setTieuDe(List.data);
            }
          })
          .catch((err) => {
            setErr(true);
          });
      }, [filter]);

    const Time = useRef(null);
    const ChangeLimit = (e) => {
        const input = e.target;
        if (Time.current) {
            clearTimeout(Time.current);
        }
        Time.current = setTimeout(() => {
            setfilter({ ...filter, limit: input.value });
        }, 300);
    };

    const [Noti, setNoti] = React.useState(true)
    const [StoreNoti, setStoreNoti] = React.useState(false)

    const onClickStore = () => 
    {
        setStoreNoti(true);
        setNoti(false);
    }

    return (
        <React.Fragment>
            <div>
            { StoreNoti ? <StoreNotification /> : null }
            {/* { SentNoti ? <SentNotification data={TieuDe}/> : null } */}
            { Noti ? (
                <div className={style.MainNoti}>
                    <h1 className={style.Hearder_text}>THÔNG BÁO</h1>
                    <div className={style.Content}>
                        <div className={style.MainContent}>
                            {/* Danh sach tieu de thong bao */}
                            <ItemNotification 
                                data = {TieuDe}
                            />
                        </div>
                        <div className={style.PaginationNoti}>
                            <Pagination
                                title="Số sinh viên / Trang"
                                paginations={paginations}
                                filter={filter}
                                setfilter={setfilter}
                                ChangeLimit={ChangeLimit}
                            />
                        </div>
                    </div>
                    <div className={style.button}>
                        <Button 
                            content="Tạo thông báo" 
                            onClick={onClickStore}
                        />
                    </div>
                </div>
            ) : null}
            </div>
        </React.Fragment>
    )
}

export default Notification;
