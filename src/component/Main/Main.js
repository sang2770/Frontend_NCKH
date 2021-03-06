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
  HiUserAdd,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { RiMenuAddLine, RiUserSettingsFill } from "react-icons/ri";
import { TiUserAddOutline } from "react-icons/ti";
import { BiCommentAdd } from "react-icons/bi";
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
import ResetPass from "../ResetPass/ResetPass";

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
  const [OpenReset, setOpenReset] = useState(false);
  return (
    <React.Fragment>
      <div className="Main_container">
        {OpenReset && <ResetPass setOpenReset={setOpenReset} />}
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
                <span className="Item_content">Th??ng tin sinh vi??n</span>
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
                    <span className="Item_content">Th??m sinh vi??n</span>
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
                    <span className="Item_content">S???a sinh vi??n</span>
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
                    <span className="Item_content">Danh s??ch sinh vi??n</span>
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
                <span className="Item_content">Y??u c???u sinh vi??n</span>
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
                <span className="Item_content">Ngh??a v??? qu??n s???</span>
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
                    <span className="Item_content">Gi???y ngh??a v??? qu??n s???</span>
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
                      Gi???y di chuy???n t??? tr?????ng
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
                    <span className="Item_content">Gi???y x??c nh???n</span>
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
                <span className="Item_content">Xu???t b??o c??o</span>
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
                    <span className="Item_content">B??o c??o Import</span>
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
                    <span className="Item_content">B??o c??o c???p nh???t</span>
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
                    <span className="Item_content">B??o c??o bi???n ?????ng</span>
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
                      T??nh tr???ng c???p ph??t Gi???y x??c nh???n
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
                      T??nh tr???ng c???p ph??t Gi???y gi???i thi???u
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
                <span className="Item_content">Th??ng b??o</span>
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
                <span className="Item_content">T???o t??i kho???n m???i</span>
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
                <RiMenuAddLine />
                <span className="Item_content">Th??m th??ng tin</span>
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
                    <span className="Item_content">Th??ng tin </span>
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
                    <span className="Item_content">Th??ng tin ch??? huy</span>
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
                  H??? TH???NG QU???N L?? NGH??A V??? QU??N S???
                </h2>
                <h3 className="Header_subtitle">Wellcome Admin!</h3>
              </div>
              <div className="Main_Content_Header_user">
                <div className="Header_user_container">
                  <div className="user_container_context">
                    {user.TenDangNhap}
                    <div className="User_Option">
                      <p
                        className="Header_changePass"
                        onClick={() => {
                          setOpenReset(!OpenReset);
                        }}
                      >
                        ?????i m???t kh???u
                      </p>
                      <p className="Line_User_Option">|</p>
                      <p className="Header_logout" onClick={Out}>
                        Logout
                      </p>
                    </div>
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
