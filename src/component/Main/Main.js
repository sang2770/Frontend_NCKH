import React, { useContext, useState, useEffect } from "react";
import Logo from "../../media/Image/Logo.jpg";
import Avatar from "../../media/Image/avatar.jpg";
import NameSchool from "../../media/Image/NameSchool.png";
import CreateAccount from "../../pages/CreateAccount/CreateAccount";
import { Link, Route, Routes, useLocation } from "react-router-dom";
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
import {
  HiOutlineDocument,
  HiOutlineViewGridAdd,
  HiUserAdd,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { TiUserAddOutline } from "react-icons/ti";
import { BiCommentAdd } from "react-icons/bi";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoIosPaper } from "react-icons/io";
import clsx from "clsx";
import "./Main.css";
import { AuthContext } from "../../authContext/AuthContext";
import ListStudent from "../../pages/StudentManage/ListStudent/ListStudent";
import AddStudent from "../../pages/StudentManage/AddStudent/AddStudent";
import UpdateStudent from "../../pages/StudentManage/UpdateStudent/UpdateStudent";
import { Logout } from "../../authContext/AuthAction";
import { DataContextProvider } from "../../DataContext/DataContext";
import RequestStudent from "../../pages/RequestStudent/RequestStudent";
import RegisterMilitary from "../../pages/MilitaryManage/RegisterMilitary/RegisterMilitary";
import MoveMilitary from "../../pages/MilitaryManage/MoveMilitary/MoveMilitary";
import ConfirmMilitary from "../../pages/MilitaryManage/ConfirmMilitary/ConfirmMilitary";
import MoveMilitaryLocal from "../../pages/MilitaryManage/MoveMilitaryLocal/MoveMilitaryLocal";
import Notification from "../../pages/Notification/Notifications/Notifications";
import ExportImport from "../../pages/Analyst/ExportImport/ExportImport";
import ExportUpdate from "../../pages/Analyst/ExportUpdate/ExportUpdate";
import ExportFluctation from "../../pages/Analyst/ExportFluctation/ExportFluctation";
import AddInformation from "../../pages/AddInformation/AddInformation";
import ExportConfirmMilitary from "../../pages/Analyst/ExportConfirmMilitary/ExportConfirmMilitary";
import ExportMoveMilitary from "../../pages/Analyst/ExportMoveMilitary/ExportMoveMilitary";
import AddInfomationCommander from "../../pages/AddInformation/AddInfomationCommander";

function Main() {
  const [clickMenu, setclickMenu] = useState(false);
  const location = useLocation();
  const [ActiveSub, setActiveSub] = useState(
    JSON.parse(localStorage.getItem("ActiveSub")) || "/"
  );
  const [MenuSubItem, setMenuSubItem] = useState(
    JSON.parse(localStorage.getItem("MenuSubItem")) || 3
  );
  const ChangeMenu = () => {
    const check = clickMenu;
    setclickMenu(!check);
  };
  const ChangeSubMenu = (id) => {
    setActiveSub(id);
    setMenuSubItem(-1);
    localStorage.setItem("ActiveSub", JSON.stringify(id));
  };
  const ChangeMenuSubItem = (id) => {
    setMenuSubItem(id);
    localStorage.setItem("MenuSubItem", JSON.stringify(id));
  };
  const { user, dispatch } = useContext(AuthContext);
  const Out = () => {
    dispatch(Logout());
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = document.documentElement.clientWidth;
      if (width < 600) {
        setclickMenu(true);
      } else {
        setclickMenu(false);
      }
    });
  }, []);
  useEffect(() => {
    const locate = location.pathname;
    if (locate === "/") {
      setActiveSub("/");
      setMenuSubItem("/");
    } else if (locate.includes("/StudentManager")) {
      setActiveSub("/");
      setMenuSubItem(locate.slice(1, locate.length));
    } else if (locate.includes("/Military")) {
      setActiveSub("Military");
      setMenuSubItem(locate.slice(1, locate.length));
    } else if (locate.includes("/ExportAnalyst")) {
      setActiveSub("ExportAnalyst");
      setMenuSubItem(locate.slice(1, locate.length));
    } else if (locate.includes("/AddInfomation")) {
      setActiveSub("AddInfomation");
      setMenuSubItem(locate.slice(1, locate.length));
    } else {
      setActiveSub(locate.slice(1, locate.length));
    }
  }, []);

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
                ChangeSubMenu("/");
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "/" && "ActiveItem"
                )}
              >
                <BsPersonCircle />
                <span className="Item_content">Thông tin sinh viên</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "StudentManager-AddStudent" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    // console.log(e.target);
                    ChangeMenuSubItem("StudentManager-AddStudent");
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
                    MenuSubItem === "StudentManager-UpdateStudent" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("StudentManager-UpdateStudent");
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
                    MenuSubItem === "/" && "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("/");
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
                ChangeSubMenu("Request-Student");
              }}
            >
              <Link
                to="/Request-Student"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "Request-Student" && "ActiveItem"
                )}
              >
                <AiOutlineMessage />
                <span className="Item_content">Yêu cầu sinh viên</span>
              </Link>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu("Military");
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "Military" && "ActiveItem"
                )}
              >
                <AiOutlineIdcard />
                <span className="Item_content">Nghĩa vụ quân sự</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "Military-RegisterMilitary" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("Military-RegisterMilitary");
                  }}
                >
                  <Link
                    to="/Military-RegisterMilitary"
                    className="SideBar_Item_content"
                  >
                    <BsPersonPlusFill />
                    <span className="Item_content">Giấy nghĩa vụ quân sự</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "Military-MoveMilitary" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("Military-MoveMilitary");
                  }}
                >
                  <Link
                    to="/Military-MoveMilitary"
                    className="SideBar_Item_content"
                  >
                    <RiUserSettingsFill />
                    <span className="Item_content">
                      Giấy di chuyển từ trường
                    </span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_Item_content",
                    MenuSubItem === "Military-ConfirmMilitary" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("Military-ConfirmMilitary");
                  }}
                >
                  <Link
                    to="/Military-ConfirmMilitary"
                    className="SideBar_Item_content"
                  >
                    <IoIosPaper />
                    <span className="Item_content">Giấy xác nhận</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu("ExportAnalyst");
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "ExportAnalyst" && "ActiveItem"
                )}
              >
                <HiOutlineDocument />
                <span className="Item_content">Xuất báo cáo</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "ExportAnalyst-Import" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    // console.log(e.target);
                    ChangeMenuSubItem("ExportAnalyst-Import");
                  }}
                >
                  <Link
                    to="ExportAnalyst-Import"
                    className="SideBar_Item_content"
                  >
                    <BsPersonPlusFill />
                    <span className="Item_content">Báo cáo Import</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "ExportAnalyst-Update" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("ExportAnalyst-Update");
                  }}
                >
                  <Link
                    to="ExportAnalyst-Update"
                    className="SideBar_Item_content"
                  >
                    <RiUserSettingsFill />
                    <span className="Item_content">Báo cáo cập nhật</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "ExportAnalyst-Fluctation" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("ExportAnalyst-Fluctation");
                  }}
                >
                  <Link
                    to="ExportAnalyst-Fluctation"
                    className="SideBar_Item_content"
                  >
                    <BsFillPeopleFill />
                    <span className="Item_content">Báo cáo biến động</span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "ExportAnalyst-ConfirmMilitary" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("ExportAnalyst-ConfirmMilitary");
                  }}
                >
                  <Link
                    to="ExportAnalyst-ConfirmMilitary"
                    className="SideBar_Item_content"
                  >
                    <IoIosPaper />
                    <span className="Item_content">
                      Tình trạng cấp phát Giấy xác nhận
                    </span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "ExportAnalyst-MoveMilitary" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("ExportAnalyst-MoveMilitary");
                  }}
                >
                  <Link
                    to="ExportAnalyst-MoveMilitary"
                    className="SideBar_Item_content"
                  >
                    <HiOutlineNewspaper />
                    <span className="Item_content">
                      Tình trạng cấp phát Giấy giới thiệu
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu("Notifiaction-main");
              }}
            >
              <Link
                to="/Notifiaction-main"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "Notifiaction-main" && "ActiveItem"
                )}
              >
                <AiFillBell />
                <span className="Item_content">Thông báo</span>
              </Link>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu("CreateAccount");
              }}
            >
              <Link
                to="/CreateAccount"
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "CreateAccount" && "ActiveItem"
                )}
              >
                <HiUserAdd />
                <span className="Item_content">Tạo tài khoản mới</span>
              </Link>
            </li>
            <li
              className="SideBar_Item"
              onClick={() => {
                ChangeSubMenu("AddInfomation");
              }}
            >
              <p
                className={clsx(
                  "SideBar_Item_content",
                  ActiveSub === "AddInfomation" && "ActiveItem"
                )}
              >
                <BsPersonCircle />
                <span className="Item_content">Thêm thông tin</span>
              </p>
              <ul className="SideBar_MenuChild">
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "AddInfomation-Edu" && "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("AddInfomation-Edu");
                  }}
                >
                  <Link to="AddInfomation-Edu" className="SideBar_Item_content">
                    <BiCommentAdd />
                    <span className="Item_content">Thông tin </span>
                  </Link>
                </li>
                <li
                  className={clsx(
                    "SideBar_MenuChild_item",
                    MenuSubItem === "AddInfomation-commander" &&
                      "ActiveSubMenuItem"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    ChangeMenuSubItem("AddInfomation-commander");
                  }}
                >
                  <Link
                    to="AddInfomation-commander"
                    className="SideBar_Item_content"
                  >
                    <TiUserAddOutline />
                    <span className="Item_content">Thông tin chỉ huy</span>
                  </Link>
                </li>
              </ul>
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
            <DataContextProvider>
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
                  <Route path="CreateAccount" element={<CreateAccount />} />
                  <Route path="/Request-Student" element={<RequestStudent />} />
                  <Route
                    path="Military-RegisterMilitary"
                    element={<RegisterMilitary />}
                  />
                  <Route
                    path="Military-MoveMilitary"
                    element={<MoveMilitary />}
                  />
                  <Route
                    path="Military-ConfirmMilitary"
                    element={<ConfirmMilitary />}
                  />
                  <Route
                    path="ExportAnalyst-Import"
                    element={<ExportImport />}
                  />
                  <Route
                    path="ExportAnalyst-Update"
                    element={<ExportUpdate />}
                  />
                  <Route
                    path="ExportAnalyst-Fluctation"
                    element={<ExportFluctation />}
                  />
                  <Route
                    path="ExportAnalyst-ConfirmMilitary"
                    element={<ExportConfirmMilitary />}
                  />
                  <Route
                    path="ExportAnalyst-MoveMilitary"
                    element={<ExportMoveMilitary />}
                  />
                  <Route
                    path="AddInfomation-Edu"
                    element={<AddInformation />}
                  />
                  <Route
                    path="AddInfomation-commander"
                    element={<AddInfomationCommander />}
                  />
                  <Route path="AddInfomation" element={<AddInformation />} />
                  <Route path="Notifiaction-main" element={<Notification />} />
                </Routes>
              </div>
            </DataContextProvider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
