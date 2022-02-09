import { createContext, useEffect, useState } from "react";
import useAxios from "../Helper/API";
const Initial = {
  Khoa: [],
  Lop: [],
  Khoas: [],
};

export const DataContext = createContext(Initial);
export const DataContextProvider = ({ children }) => {
  const Client = useAxios();
  const [Khoa, setKhoa] = useState([]);
  const [Lop, setLop] = useState([]);
  const [Khoas, setKhoas] = useState([]);
  
  //khoa
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

  //lop
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

  //khóa
  useEffect(() => {
    Client.get("/student-management/majors-key")
      .then((response) => {
        const ListKhoas = response.data;
        if (ListKhoas.status === "Success") {
          setKhoas(ListKhoas.data);
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
        Khoas: Khoas,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
