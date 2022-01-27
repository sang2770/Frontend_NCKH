import React, { useContext, useState } from "react";
import Logo from "../../media/Image/Logo.jpg";
import Avatar from "../../media/Image/avatar.jpg";
import NameSchool from "../../media/Image/NameSchool.png";
import { Link, Route, Routes } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineIdcard,
  AiFillBell,
} from "react-icons/ai";
import {
  BsPersonCircle,
  BsPersonPlusFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi";
import { RiUserSettingsFill } from "react-icons/ri";
import clsx from "clsx";
import "./Main.css";
import { AuthContext } from "../../authContext/AuthContext";
import ListStudent from "../../pages/StudentManage/ListStudent/ListStudent";
import AddStudent from "../../pages/StudentManage/AddStudent/AddStudent";
import UpdateStudent from "../../pages/StudentManage/UpdateStudent/UpdateStudent";
import { Logout } from "../../authContext/AuthAction";

function Main() {
  const [clickMenu, setclickMenu] = useState(false);
  const [ActiveSub, setActiveSub] = useState(1);
  const [MenuSubItem, setMenuSubItem] = useState(3);
  const ChangeMenu = () => {
    const check = clickMenu;
    setclickMenu(!check);
  };
  const ChangeSubMenu = (id) => {
    setActiveSub(id);
  };
  const ChangeMenuSubItem = (id) => {
    setMenuSubItem(id);
  };

  const { user, dispatch } = useContext(AuthContext);
  const Out = () => {
    dispatch(Logout());
  };
  return (
    <React.Fragment>
      <div className="Main_container">
        <div className={clsx("Main_SideBar", clickMenu && "HiddenSideBar")}>
          <div className="Main_SideBar_LogoBar">
            <img src={Logo} alt="Logobar" className="LogoBar_Logo" />
            <h3 className="LogoBar_NameApp">NVQS</h3>
            <div className="LogoBar_Icon" onClick={ChangeMenu}>
              <AiOutlineMenu className="Icon" />
            </div>
          </div>
          <img
            src={NameSchool}
            alt="NameSchool"
            className="Main_SideBar_NameSchool"
          ></img>
          <ul className="Main_SideBar_Options">
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu(1);
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === 1 && "ActiveItem"
                )}
              >
                <BsPersonCircle />
                <span className="Item_content">Thông tin sinh viên</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 1 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(1);
                  }}
                >
                  <Link
                    to="StudentManager-AddStudent"
                    className="SideBar_Item_content"
                  >
                    <BsPersonPlusFill />
                    <span className="Item_content">Thêm sinh viên</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 2 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(2);
                  }}
                >
                  <Link
                    to="StudentManager-UpdateStudent"
                    className="SideBar_Item_content"
                  >
                    <RiUserSettingsFill />
                    <span className="Item_content">Sửa sinh viên</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 3 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(3);
                  }}
                >
                  <Link to="/" className="SideBar_Item_content">
                    <BsFillPeopleFill />
                    <span className="Item_content">Danh sách sinh viên</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu(2);
              }}
            >
              <Link
                to="/"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === 2 && "ActiveItem"
                )}
              >
                <AiOutlineMessage />
                <span className="Item_content">Yêu cầu sinh viên</span>
              </Link>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu(3);
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === 3 && "ActiveItem"
                )}
              >
                <AiOutlineIdcard />
                <span className="Item_content">Nghĩa vụ quân sự</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 1 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(1);
                  }}
                >
                  <Link to="/" className="SideBar_Item_content">
                    <BsPersonPlusFill />
                    <span className="Item_content">Giấy nghĩa vụ quân sự</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 2 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(2);
                  }}
                >
                  <Link to="/" className="SideBar_Item_content">
                    <RiUserSettingsFill />
                    <span className="Item_content">
                      Giấy di chuyển từ trường
                    </span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === 3 && "ActiveSubMenuItem"
                  )}
                  onClick={() => {
                    ChangeMenuSubItem(3);
                  }}
                >
                  <Link to="/" className="SideBar_Item_content">
                    <BsFillPeopleFill />
                    <span className="Item_content">Giấy xác nhận</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu(4);
              }}
            >
              <Link
                to="/"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === 4 && "ActiveItem"
                )}
              >
                <HiOutlineDocument />
                <span className="Item_content">Xuất báo cáo</span>
              </Link>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu(5);
              }}
            >
              <Link
                to="/"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === 5 && "ActiveItem"
                )}
              >
                <AiFillBell />
                <span className="Item_content">Thông báo</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="Main_Content">
          <div className="Main_Content_container">
            <div className="Main_Content_Header">
              <div className="Main_Content_Header_Title">
                <h2 className="Header_title">
                  HỆ THỐNG QUẢN LÝ NGHĨA VỤ QUÂN SỰ
                </h2>
                <h3 className="Header_subtitle">Wellcome Admin!</h3>
              </div>
              <div className="Main_Content_Header_user">
                <div className="Header_user_container">
                  <div className="user_container_context">
                    {user.TenDangNhap}
                    <p className="Header_logout" onClick={Out}>
                      Logout
                    </p>
                  </div>
                  <img src={Avatar} alt="Avatar" className="AvatarUser" />
                </div>
              </div>
            </div>
            <div className="Main_Content_context">
              <Routes>
                <Route path="/" element={<ListStudent />} />
                <Route
                  path="StudentManager-AddStudent"
                  element={<AddStudent />}
                />
                <Route
                  path="StudentManager-UpdateStudent"
                  element={<UpdateStudent />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
