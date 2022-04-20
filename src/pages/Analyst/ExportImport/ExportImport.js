import React, { useEffect, useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Pagination from "../../../component/Pagination/Pagination";
import { AiOutlineBarChart } from "react-icons/ai";
import ComboBox from "../../../component/ComboBox/ComboBox";
import HeaderTitle from "../../../component/HeaderTitle/HeaderTitle";
import style from "./ExportImport.module.css";
import queryString from "query-string";
import HeaderReport from "../../../component/HeaderReport/HeaderReport";
import Button from "../../../component/Button/Button";
import useAxios from "../../../Helper/API";
import ChartPie from "../../../component/Chart/ChartPie";
const GetDate = (date) => {
  date = new Date(date);
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    "-" +
    date.getDate() +
    "/" +
    date.getMonth() +
    1 +
    "/" +
    date.getFullYear()
  );
};
function ExportImport() {
  const { Client, Loading } = useAxios();
  const [result, setResult] = useState({});
  const [filter, setfilter] = useState({
    Nam: 2022,
    limit: 10,
    page: 1,
  });
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
    TotalPage: 1,
  });
  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      // console.log(input.name);
      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };
  const Time = useRef(null);
  const CallAPI = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/student-import?" + params)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Success") {
          setResult(response.data.data);
          setPaginations(response.data.pagination);
        } else {
          alert(response.data.Err_Message);
        }
      })
      .catch((err) => {
        alert("Có lỗi");
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
  }, [filter]);
  const ListYear = () => {
    const max = 100;
    const CurrentYear = new Date().getFullYear();
    const result = [];
    for (let i = 0; i < max; i++) {
      result.push(CurrentYear - i);
    }
    return result;
  };
  const ChangeLimit = (e) => {
    const input = e.target;
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      setfilter({ ...filter, limit: input.value, page: 1 });
    }, 300);
  };
  const ExportReport = () => {
    const params = queryString.stringify(filter);
    Client.get("/export-report/export-student-import?" + params, {
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `BaoCaoImport${filter.Nam}.docx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
      })
      .catch((err) => {
        alert("Tạm thời không thể xuất báo cáo");
      });
  };
  return (
    <div className={style.Export_Import_Container}>
      <HeaderTitle
        Title="Báo cáo thông kê thêm sinh viên bằng File"
        Icon={<BsFillPeopleFill />}
      />
      <div className={style.Import_Filter}>
        <div className={style.Import_Filter_Item}>
          <ComboBox
            title="Năm"
            id="Nam"
            items={ListYear()}
            Change={ChangeFilter}
            data={{ Nam: 2022 }}
          />
        </div>
      </div>
      <Button
        content="Xuất báo cáo"
        styles={{ margin: "8px" }}
        onClick={ExportReport}
      />
      <div className={style.ReportContent}>
        <HeaderReport title="Biểu đồ trạng thái" icon={<AiOutlineBarChart />} />
        <div className={style.Chart}>
          <ChartPie
            datas={[result.Total_Success, result.Total_Failed]}
            NameChart="Biểu đồ trạng thái"
            labels={["Thành công", "Thất bại"]}
          />
        </div>
        <div className={style.Chart_Details}>
          <p className={style.Sum_People}>
            Tổng số lần thành công:
            <span>{result.Total_Success ? result.Total_Success : 0}</span>
          </p>
          <p className={style.Sum_People}>
            Tổng số lần thất bại:
            <span>{result.Total_Failed ? result.Total_Failed : 0}</span>
          </p>
        </div>
        {result.Details ? (
          <React.Fragment>
            <HeaderReport title="Chi tiết" icon={<AiOutlineBarChart />} />
            <div className={style.ListDetails}>
              <table className={style.TableDetails} style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Người sửa</th>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {result.Details.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{GetDate(item.ThoiGian)}</td>
                        <td>{item.TenDangNhap}</td>
                        <td>{item.NoiDung}</td>
                        <td>{item.TrangThai}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                title="Số sinh viên"
                paginations={paginations}
                filter={filter}
                setfilter={setfilter}
                ChangeLimit={ChangeLimit}
              />
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ExportImport;
