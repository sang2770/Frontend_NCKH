import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import useAxios from "../Helper/API";

const useFilter = (TrangThai, path, Confirm) => {
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
  const ListMSV = useRef([]);
  useEffect(() => {
    const params = queryString.stringify(filter);
    Client.get(path + params)
      .then((response) => {
        // console.log(response.data);
        const List = response.data;
        if (List.status === "Success") {
          setPaginations(List.pagination);
          setListRequest(List.data);
          List.data.forEach((element) => {
            ListMSV.current.push(element.MaSinhVien);
          });
        }
      })
      .catch((err) => {
        setErr(true);
      });
  }, [filter, Confirm]);
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
  // console.log(ListMSV);
  return {
    ListRequest,
    paginations,
    filter,
    setfilter,
    Err,
    ChangeLimit,
    ChangeFilter,
    ListMSV,
    Loading,
  };
};

export default useFilter;
