import { createContext, useEffect, useState } from "react";
import useAxios from "../Helper/API";
const Initial = {
  Khoa: [],
  Lop: [],
};

export const DataContext = createContext(Initial);
export const DataContextProvider = ({ children }) => {
  const Client = useAxios();
  const [Khoa, setKhoa] = useState([]);
  const [Lop, setLop] = useState([]);
  useEffect(() => {
    Client.get("/student-management/majors")
      .then((response) => {
        const ListKhoa = response.data;
        if (ListKhoa.status === "Success") {
          setKhoa(ListKhoa.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    Client.get("/student-management/class")
      .then((response) => {
        const ListClass = response.data;
        console.log(ListClass);
        if (ListClass.status === "Success") {
          setLop(ListClass.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        Khoa: Khoa,
        Lop: Lop,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
