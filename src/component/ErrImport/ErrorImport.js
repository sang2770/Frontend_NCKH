import React from "react";
import style from "./ErrImport.module.css";

function ErrorImport({ErrorrImport, column1, column2}){
    return(
        <div className={style.Err_container}>
            <h2 className={style.ErrTitle}>Import File Có Lỗi!!!</h2>
            <div className={style.ResultImport}>
            <table className={style.TableErr} border={1}>
                <thead>
                <tr>
                    <th>{column1}</th>
                    <th>{column2}</th>
                </tr>
                </thead>
                <tbody>
                {ErrorrImport.map((item, index) => {
                    return (
                    <tr key={index}>
                        <td>{item.row}</td>
                        <td>{item.err[0]}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default ErrorImport;