import React, { useRef } from "react";
import style from "./Pahination.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

function Pagination({ title, paginations, filter, setfilter, ChangeLimit }) {
  // console.log(paginations);
  const NextPage = () => {
    const CurrentPage = filter.page;
    if (CurrentPage < paginations.TotalPage) {
      setfilter({ ...filter, page: filter.page + 1 });
    }
  };
  const PrePage = () => {
    const CurrentPage = filter.page;
    if (CurrentPage >= 1) {
      setfilter({ ...filter, page: filter.page - 1 });
    }
  };

  return (
    <div className={style.pagination}>
      <div className={style.pagination_row}>{title}</div>
      <input
        className={style.pagination_rowNumber}
        type="text"
        defaultValue={paginations.limit}
        onChange={ChangeLimit}
      />
      <div className={style.pagination_changePage}>
        <div
          className={clsx(
            style.pagination_changePage_pre,
            paginations.page === 1 && style.BtnDisable
          )}
          onClick={PrePage}
        >
          <IoIosArrowBack />
        </div>
        <div className={style.pagination_changePage_number}>
          {paginations.page}
        </div>
        <div
          className={clsx(
            style.pagination_changePage_next,
            paginations.page === paginations.TotalPage && style.BtnDisable
          )}
          onClick={NextPage}
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div className={style.TotalPage}>
        /Tổng số trang: {paginations.TotalPage}
      </div>
    </div>
  );
}

export default Pagination;
