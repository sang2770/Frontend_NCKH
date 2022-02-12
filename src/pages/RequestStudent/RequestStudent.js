import React, { useContext, useState, useRef } from "react";
import HeaderTitle from "../../component/HeaderTitle/HeaderTitle";
import style from "./Request.module.css";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { DataContext } from "../../DataContext/DataContext";
import TextBox from "../../component/TextBox/TextBox";
import ComboBox from "../../component/ComboBox/ComboBox";
import Table from "../../component/Table/Table";
import TableContent from "../../component/Table/TableContent";
import Button from "../../component/Button/Button";
import Pagination from "../../component/Pagination/Pagination";
import useFilter from "../../Helper/Filter";
import useAxios from "../../Helper/API";
import LoadingEffect from "../../component/Loading/Loading";
import queryString from "query-string";
const tableHeaders = [
  "Mã sinh viên",
  "Họ và tên",
  "Lần xin cấp",
  "Ngày yêu cầu",
  "Trạng thái",
  "Chọn",
];

function RequestStudent() {
  const [Confirm, setConfirm] = useState(false);
  const MSV = useRef({
    MaSinhVien: 1,
    MaYeuCau: 1,
  });
  const {
    ListRequest,
    paginations,
    filter,
    setfilter,
    Err,
    ChangeLimit,
    ChangeFilter,
    Loading,
  } = useFilter("Chờ xử lý", "/request-management/confirm?", Confirm);
  const useConfirmed = useFilter(
    "Đã xử lý",
    "/request-management/confirm?",
    Confirm
  );
  const { Lop, Khoa, Khoas } = useContext(DataContext);
  const { Client } = useAxios();

  const ConfirmAll = async () => {
    const form = new FormData();
    form.append("MSV", JSON.stringify(useConfirmed.ListMSV));
    try {
      const result = await Client.post(
        "/request-management/confirmIndex",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      if (result.data.status !== "Failed") {
        alert("Bạn đã Thao tác thành công thành công!");
        setConfirm(!Confirm);
      } else {
        alert("Có lỗi");
      }
    } catch (error) {
      alert("Có lỗi! Vui lòng kiểm tra lại!");
    }
  };
  const ExportPape = () => {
    const stringify = queryString.stringify(MSV.current);
    Client.get("confirm-military-management/confirm-military?" + stringify, {
      responseType: "blob",
    })
      .then((response) => {
        if (!response.data.status) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "GXN.docx"); //or any other extension
          document.body.appendChild(link);
          link.click();
          alert("Xuất thành công");
        } else {
          alert("Có lỗi vui lòng thử lại");
        }
      })
      .catch((err) => {
        // console.log(err);
        alert("Có lỗi vui lòng thử lại");
      });
  };
  const ExportAll = () => {
    MSV.current = useConfirmed.filter;
    ExportPape();
  };
  return (
    <div className={style.Request_Student_Container}>
      <HeaderTitle Title="Yêu cầu của sinh viên" Icon={<AiOutlineMessage />} />

      <div className={style.ListConfirmed}>
        <div className={style.ListHeader}>
          <HiOutlineClipboardList />
          <p className={style.ListHeader_content}>Danh sách chờ xác nhận</p>
        </div>
        <div className={style.Filter}>
          <div className={style.Filter_Item}>
            <TextBox
              title="Mã sinh viên"
              subtitle="MaSinhVien"
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <TextBox title="Họ và tên" subtitle="HoTen" Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox id="Lop" title="Lớp" items={Lop} Change={ChangeFilter} />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khoa"
              id="Khoa"
              items={Khoa}
              Change={ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khóa"
              id="Khoas"
              items={Khoas}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.DataList}>
          {Loading && <LoadingEffect />}
          <Table
            headers={tableHeaders}
            Content={
              <TableContent
                Check={true}
                data={ListRequest}
                Confirm={Confirm}
                setConfirm={setConfirm}
              />
            }
          />
        </div>
        <div className={style.GroupOption}>
          <Button content="Xác nhận tất cả" onClick={ConfirmAll} />
        </div>
        <Pagination
          title="Số sinh viên"
          paginations={paginations}
          filter={filter}
          setfilter={setfilter}
          ChangeLimit={ChangeLimit}
        />
      </div>
      <div className={style.ListConfirmed}>
        <div className={style.ListHeader}>
          <HiOutlineClipboardList />
          <p className={style.ListHeader_content}>Danh sách chờ cấp</p>
        </div>
        <div className={style.Filter}>
          <div className={style.Filter_Item}>
            <TextBox
              title="Mã sinh viên"
              subtitle="MaSinhVien"
              Change={useConfirmed.ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <TextBox
              title="Họ và tên"
              subtitle="HoTen"
              Change={useConfirmed.ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              id="Lop"
              title="Lớp"
              items={Lop}
              Change={useConfirmed.ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khoa"
              id="Khoa"
              items={Khoa}
              Change={useConfirmed.ChangeFilter}
            />
          </div>
          <div className={style.Filter_Item}>
            <ComboBox
              title="Khóa"
              id="Khoas"
              items={Khoas}
              Change={ChangeFilter}
            />
          </div>
        </div>
        <div className={style.DataList}>
          {useConfirmed.Loading && <LoadingEffect />}
          <Table
            headers={tableHeaders}
            Content={
              <TableContent
                data={useConfirmed.ListRequest}
                Check={true}
                Confirmed={true}
                Confirm={Confirm}
                setConfirm={setConfirm}
                MSV={MSV}
                ExportPape={ExportPape}
              />
            }
          />
        </div>

        <div className={style.GroupOption}>
          <Button content="Xuất giấy" onClick={ExportAll} />
        </div>
        <Pagination
          title="Số sinh viên"
          paginations={useConfirmed.paginations}
          filter={useConfirmed.filter}
          setfilter={useConfirmed.setfilter}
          ChangeLimit={useConfirmed.ChangeLimit}
        />
      </div>
    </div>
  );
}

export default RequestStudent;
