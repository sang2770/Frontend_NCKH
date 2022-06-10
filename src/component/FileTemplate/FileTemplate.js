import React, { useEffect, useState, useRef } from "react";
import HeaderTitle from "../HeaderTitle/HeaderTitle";
import style from "./FileTemplate.module.css";
import { AiFillFileExcel } from "react-icons/ai";
import File from "../../media/Image/file.png";
import Button from "../Button/Button";
import useAxios from "../../Helper/API";
import { BiExit } from "react-icons/bi";
import LoadingEffect from "../Loading/Loading";
function FileTemplate({ Open }) {
  const [ListNameFile, setListNameFile] = useState([]);
  const link = useRef();
  const { Client, Loading } = useAxios();
  const CallAPI = () => {
    Client.get("/file-management/files")
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Success") {
          setListNameFile(res.data.ListFileName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    CallAPI();
    const Load = setInterval(() => {
      CallAPI();
    }, 1000 * 60 * 5);
    return () => {
      clearInterval(Load);
    };
  }, []);
  const DowFile = (Name) => {
    // link.current.href = process.env.REACT_APP_HOST_NAME + "/public/" + Name;
    // link.current.click();
    Client.get(process.env.REACT_APP_HOST_NAME + "/public/" + Name, {
      responseType: "blob",
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.status) {
          alert("Không xuất được file");
          return;
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", Name); //or any other extension
        document.body.appendChild(link);
        link.click();
        alert("Đã xuất file");
      })
      .catch((err) => {
        alert("Có lỗi");
        // console.log(err);
      });
  };
  return (
    <div className={style.FileTemplate_Container}>
      <a href="" ref={link} download></a>
      <div className={style.File_Content}>
        <HeaderTitle Title="Danh sách file mẫu" Icon={<AiFillFileExcel />} />
        <div className={style.Btn_Exit} onClick={Open}>
          <BiExit />
        </div>
        {Loading ? (
          <LoadingEffect />
        ) : (
          <React.Fragment>
            <div className={style.FileGroup}>
              {ListNameFile.map((item, index) => (
                <div className={style.ItemFile} key={index}>
                  <img
                    src={File}
                    alt="File"
                    className={style.FileImage}
                    onClick={() => {
                      DowFile(item);
                    }}
                  />
                  <div className={style.FileHeader}>{item}</div>
                </div>
              ))}
            </div>
            {/* <div className={style.File_Add}>
              <Button content="Thêm File" />
            </div> */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default FileTemplate;
