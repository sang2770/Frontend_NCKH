import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import useAxios from "../Helper/API";

const useFilter = (TrangThai, path, Confirm, PageExport) => {
  const { Client, Loading } = useAxios();
  const [ListRequest, setListRequest] = useState([]);
  const [paginations, setPaginations] = useState({
    limit: 10,
    page: 1,
    TotalPage: 1,
  });
  const [filter, setfilter] = useState({
    limit: 10,
    page: 1,
    TrangThaiXuLy: TrangThai,
  });
  const [Err, setErr] = useState(null);
  const LoadAPI = () => {
    const params = queryString.stringify(filter);
    Client.get(path + params)
      .then((response) => {
        // console.log(response.data);
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setListRequest(List.data);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  };
  useEffect(() => {
    LoadAPI();
    const Load = setInterval(() => {
      LoadAPI();
    }, 1000 * 60 * 5);
    return () => {
      clearTimeout(Load);
    };
  }, [filter, Confirm, PageExport]);
  // console.log(DataFilter);

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
  const ChangeFilter = (e) => {
    if (Time.current) {
      clearTimeout(Time.current);
    }
    Time.current = setTimeout(() => {
      const input = e.target;
      const name = input.name;
      console.log(input.name);

      setfilter({ ...filter, [name]: input.value });
    }, 300);
  };

  return {
    ListRequest,
    paginations,
    filter,
    setfilter,
    Err,
    ChangeLimit,
    ChangeFilter,
    Loading,
  };
};

export default useFilter;
