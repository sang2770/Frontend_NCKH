import React, { useState, useRef, useEffect } from "react";
import style from "./Notification.module.css";
import Button from "../../../component/ButtonMiliNoti/Button";
import Pagination from "../../../component/Pagination/Pagination";
import ItemNotification from "../../../component/ItemNotification/ItemNotification";
import queryString from "query-string";
import useAxios from "../../../Helper/API";
import StoreNotification from "../StoreNotification/StoreNotification";

function Notification() {
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

  const [deleteNoti, setDeleteNoti] = useState(false);

  useEffect(() => {
    const params = queryString.stringify(filter);
    Client.get("/notification-management/index-header-notification?" + params)
      .then((response) => {
        const List = response.data;
        // console.log(List);
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setTieuDe(List.data);
        } else {
          setTieuDe([]);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  }, [filter, deleteNoti]);

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

  // show hide
  const [Noti, setNoti] = React.useState(true);
  const [StoreNoti, setStoreNoti] = React.useState(false);

  const onClickStore = () => {
    setStoreNoti(true);
    setNoti(false);
  };

  return (
    <React.Fragment>
      <div>
        {StoreNoti ? <StoreNotification /> : null}
        {Noti ? (
          <div className={style.MainNoti}>
            <h1 className={style.Hearder_text}>THÔNG BÁO</h1>
            <div className={style.Content}>
              <div className={style.MainContent}>
                {/* Danh sach tieu de thong bao */}
                {TieuDe.length != 0 ? (
                  <ItemNotification
                    data={TieuDe}
                    datadelete={deleteNoti}
                    setDelete={setDeleteNoti}
                  />
                ) : (
                  <div className={style.NotiNo}>Danh sách thông báo trống!</div>
                )}
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
              <Button content="Tạo thông báo" onClick={onClickStore} />
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default Notification;
