import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../Helper/API";
import LoadingEffect from "../../component/Loading/Loading";
import HeaderTitle from "../../component/HeaderTitle/HeaderTitle";
import style from "./AddInfomation.module.css";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import ComboBox from "../../component/ComboBox/ComboBox";
import { AiOutlineEdit } from "react-icons/ai";
import { TiUserDeleteOutline } from "react-icons/ti";
import { IoAddSharp } from "react-icons/io5";
import clsx from "clsx";
import queryString from "query-string";
import Pagination from "../../component/Pagination/Pagination";
function AddInfomationCommander() {
  const { Client, Loading } = useAxios();
  const [ListUser, setListUser] = useState([]);
  const [ChangeData, setChangeData] = useState(false);
  const [paginations, setPaginations] = useState({
    limit: 5,
    page: 1,
    TotalPage: 1,
  });
  const [filter, setfilter] = useState({
    limit: 5,
    page: 1,
    TrangThai: "Đang hoạt động",
  });
  const [Err, setErr] = useState(null);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("commander-management/GetListCommander?" + params)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setListUser(List.data);
        }
      })
      .catch((err) => {
        setErr(true);
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
  }, [filter, ChangeData]);
  const Time = useRef(null);
  const ChangeLimit = (e) => {
    const input = e.target;
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      setfilter({ ...filter, limit: input.value, page: 1 });
    }, 300);
  };

  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      setfilter({ ...filter, [name]: input.value, page: 1 });
    }, 300);
  };
  // console.log(filter);

  const [AddLine, setAddLine] = useState(false);
  const change = () => {
    setAddLine(!AddLine);
  };
  const AddUser = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    Client.post("commander-management/CreateCommander", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const List = response.data;
        console.log(List);
        if (List.status === "Success") {
          alert("Bạn đã thao tác thành công");
          setAddLine(!AddLine);
          setChangeData(!ChangeData);
        } else {
          alert(List.Err_Message);
        }
      })
      .catch((err) => {
        setErr(true);
        alert("Bạn đã thao tác thất bại");
      });
  };
  const CancelUser = () => {
    setAddLine(!AddLine);
  };
  const GetDate = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  // Cap nhat
  const SubmitUpdate = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    form.append("_method", "PUT");
    Client.post("commander-management/UpdateCommander", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const List = response.data;
        console.log(List);
        if (List.status === "Success") {
          alert("Bạn đã thao tác thành công");
          setChangeData(!ChangeData);
        } else {
          alert(List.Err_Message);
        }
      })
      .catch((err) => {
        setErr(true);
        alert("Bạn đã thao tác thất bại");
      });
  };
  // xoa
  const DeleteUser = (id) => {
    Client.delete("commander-management/DeleteCommander/" + id)
      .then((response) => {
        const List = response.data;
        if (List.status === "Success") {
          alert("Bạn đã thao tác thành công");
          setChangeData(!ChangeData);
        } else {
          alert("Bạn đã thao tác thất bại");
        }
      })
      .catch((err) => {
        setErr(true);
        alert("Bạn đã thao tác thất bại");
      });
  };
  return (
    <React.Fragment>
      <div className={style.Add_Container}>
        <HeaderTitle
          Title="Thông tin chỉ huy trưởng"
          Icon={<HiOutlineViewGridAdd />}
        />
      </div>
      <div className={style.Filter_Commander}>
        <div className={style.CommantFilter_Item}>
          <ComboBox
            Change={ChangeFilter}
            title="Trạng thái"
            id="TrangThai"
            data={{ TrangThai: "Đang hoạt động" }}
            items={["Đang hoạt động", "Nghỉ hưu"]}
          />
        </div>
        <div className={style.table_Commander}>
          <div className={style.table_Header}>
            Danh sách chỉ huy và phó chỉ huy trưởng
          </div>
          {Loading && <LoadingEffect />}
          <div className={style.Table_Content}>
            <div className={style.tr}>
              <div className={style.th}>Họ và tên</div>
              <div className={style.th}>Chức vụ</div>
              <div className={style.th}>Thời gian bắt đầu</div>
              <div className={style.th}>Thời gian kết thúc</div>
              <div className={style.th}>Lựa chọn</div>
            </div>
            {ListUser.map((item, index) => (
              <form
                onSubmit={SubmitUpdate}
                className={style.tr}
                key={item.MaCanBo}
              >
                <input
                  name="MaCanBo"
                  type="text"
                  defaultValue={item.MaCanBo}
                  style={{ display: "none" }}
                />{" "}
                <div className={style.td}>
                  <div className={style.Item}>
                    <input
                      name="HoVaTen"
                      type="text"
                      defaultValue={item.HoVaTen}
                      className={style.Input}
                    />
                  </div>
                </div>
                <div className={style.td}>
                  <div className={style.Item}>
                    <select
                      name="ChucVu"
                      className={style.Input}
                      defaultValue={item.ChucVu}
                    >
                      <option value="Chỉ huy trưởng">Chỉ huy trưởng</option>
                      <option value="Phó chỉ huy trưởng">
                        Phó chỉ huy trưởng
                      </option>
                    </select>
                  </div>
                </div>
                <div className={style.td}>
                  <input
                    name="ThoiGianBatDau"
                    type="text"
                    defaultValue={GetDate(item.ThoiGianBatDau)}
                    className={style.Input}
                  />
                </div>
                <div className={style.td}>
                  <input
                    type="text"
                    defaultValue={
                      item.ThoiGianKetThuc
                        ? GetDate(item.ThoiGianKetThuc)
                        : "Chưa có"
                    }
                    className={style.Input}
                  />
                </div>
                <div className={clsx(style.Option_Commander, style.td)}>
                  <div className={style.Item}>
                    <div className={style.Item_Option}>
                      {filter.TrangThai === "Nghỉ hưu" ? (
                        <div style={{ color: "red", padding: "5px" }}>
                          not allowed
                        </div>
                      ) : (
                        <React.Fragment>
                          <button
                            type="submit"
                            style={{ color: "blue" }}
                            className={clsx(style.BtnOptions, style.BtnUpdate)}
                          >
                            <AiOutlineEdit />
                          </button>
                          <span
                            style={{ color: "red" }}
                            className={style.BtnOptions}
                            onClick={() => {
                              DeleteUser(item.MaCanBo);
                            }}
                          >
                            <TiUserDeleteOutline />
                          </span>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            ))}
            {filter.TrangThai === "Nghỉ hưu" ? (
              ""
            ) : !AddLine ? (
              <div className={style.tr}>
                <div
                  className={clsx(style.Item, style.AddButton)}
                  onClick={change}
                >
                  <IoAddSharp />
                </div>
              </div>
            ) : (
              <form onSubmit={AddUser} className={style.tr}>
                {" "}
                <div className={style.td}>
                  <div className={style.Item}>
                    <input
                      type="text"
                      name="HoVaTen"
                      placeholder="Nhập họ và tên"
                      className={style.Input}
                    />
                  </div>
                </div>
                <div className={style.td}>
                  <div className={style.Item}>
                    <select name="ChucVu" className={style.Input}>
                      <option value="" disabled selected>
                        ---Chức vụ---
                      </option>

                      <option value="Chỉ huy trưởng">Chỉ huy trưởng</option>
                      <option value="Phó chỉ huy trưởng">
                        Phó chỉ huy trưởng
                      </option>
                    </select>
                  </div>
                </div>
                <div className={style.td}>
                  <input
                    placeholder="yy-mm-dd"
                    type="text"
                    name="ThoiGianBatDau"
                    className={style.Input}
                  />
                </div>
                <div className={style.td}></div>
                <div className={clsx(style.Option_Commander, style.td)}>
                  <div className={style.Item}>
                    <div className={style.Item_Option}>
                      <button type="submit" className={style.BtnLineConfirm}>
                        Thêm mới
                      </button>
                      <div className={style.BtnLineCancel} onClick={CancelUser}>
                        Thoát
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
          <Pagination
            title="Số cán bộ"
            paginations={paginations}
            filter={filter}
            setfilter={setfilter}
            ChangeLimit={ChangeLimit}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddInfomationCommander;
