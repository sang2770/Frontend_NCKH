import React, {useRef} from "react";
import style from "./FormUpdateRegister.module.css";
import Button from "../ButtonMiliNoti/Button";
import ElementForm from "../../component/ElementMiliFrom/ElementForm";
import useAxios from "../../Helper/API";

function FormUpdateRegister({titles, subtitles, data, MSV, MaGiayDC_DK, Tab}){

    const { Client } = useAxios();

    // Update register
    const FilterSoDK = useRef("");
    const FilterNgayDK = useRef("");
    const FilterNoiDK = useRef("");
    const FilterDiaChi = useRef("");
    const FilterNgayNop = useRef("");

    const updateRegister = () => {
        if( window.confirm("Bạn có muốn cập nhật giấy chứng nhận này không?") === true){
            Client.put("/register-military-management/update-register-military/" + MSV
            + "?SoDangKy=" + FilterSoDK.current.value + "&NoiDangKy=" + FilterNoiDK.current.value 
            + "&NgayDangKy=" + FilterNgayDK.current.value + "&DiaChiThuongTru=" + FilterDiaChi.current.value 
            + "&NgayNop=" + FilterNgayNop.current.value)
            .then((response) => {
            if (response.data.status === "Success updated") {
                alert("Bạn đã cập nhật thành công!!!");
            }else{
                alert("Not Found!")
            }
            })
            .catch((err) => {
                alert("Có lỗi!!!");
            });
        }
    };

    const Form = useRef();
    const SubmitFormRegister = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        updateRegister(form, ResetForm);
    };
    const ResetForm = () => {
        Form.current.reset();
    };

    // update MoveLocal
    const FilterSoGT = useRef("");
    const FilterNgayCap = useRef("");
    const FilterNgayHH = useRef("");
    const FilterNoiOHT = useRef("");
    const FilterNoiChuyenDen = useRef("");
    const FilterBanChiHuy = useRef("");

    const updateMoveLocal = () => {
        if( window.confirm("Bạn có muốn cập nhật giấy chứng nhận này không?") === true){
            Client.put("/move-military-local-management/update-move-military-local/" + MaGiayDC_DK
            + "?SoGioiThieu=" + FilterSoGT.current.value + "&NgayCap=" + FilterNgayCap.current.value 
            + "&NgayHH=" + FilterNgayHH.current.value + "&NoiOHienTai=" + FilterNoiOHT.current.value 
            + "&NoiChuyenDen=" + FilterNoiChuyenDen.current.value + "&BanChiHuy=" + FilterBanChiHuy.current.value)
            .then((response) => {
            if (response.data.status === "Success updated") {
                alert("Bạn đã cập nhật thành công!!!");
            }else{
                alert("Not Found!")
            }
            })
            .catch((err) => {
                alert("Có lỗi!!!");
            });
        }
    };

    const SubmitFormMove = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        updateMoveLocal(form, ResetFormMove);
    };
    const ResetFormMove = () => {
        Form.current.reset();
    };

    return (
        <div>
        {Tab === "true" ? (
        <form className={style.Form_main} onSubmit={SubmitFormRegister}>
            <div className={style.Form_left}>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[0]}>
                        {titles[0]}:
                    </label>
                    <input
                        id={subtitles[0]}
                        type="text"
                        name={subtitles[0]}
                        defaultValue={data === undefined ? "" : data[subtitles[0]]}
                        readOnly
                    />
                </div>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[1]}>
                        {titles[1]}:
                    </label>
                    <input
                        id={subtitles[1]}
                        type="text"
                        name={subtitles[1]}
                        defaultValue={data === undefined ? "" : data[subtitles[1]]}
                        readOnly
                    />
                </div>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[2]}>
                        {titles[2]}:
                    </label>
                    <input
                        id={subtitles[2]}
                        type="text"
                        name={subtitles[2]}
                        defaultValue={data === undefined ? "" : data[subtitles[2]]}
                        readOnly
                    />
                </div>
                <ElementForm title={titles[3]} subtitle={subtitles[3]} data = {data} Ref={FilterNgayDK}/>
            </div>
            <div className={style.Form_right}>
                <ElementForm title={titles[4]} subtitle={subtitles[4]} data = {data} Ref={FilterSoDK}/>
                <ElementForm title={titles[5]} subtitle={subtitles[5]} data = {data} Ref={FilterNoiDK}/>
                <ElementForm title={titles[6]} subtitle={subtitles[6]} data = {data} Ref={FilterDiaChi}/>
                <ElementForm title={titles[7]} subtitle={subtitles[7]} data = {data} Ref={FilterNgayNop}/>
            </div>
            <div className={style.Button_register}>
                <Button 
                    content="Cập nhật"
                />
            </div>
        </form>
        ) : (
            <form className={style.Form_main} onSubmit={SubmitFormMove}>
            <div className={style.Form_left}>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[0]}>
                        {titles[0]}:
                    </label>
                    <input
                        id={subtitles[0]}
                        type="text"
                        name={subtitles[0]}
                        defaultValue={data === undefined ? "" : data[subtitles[0]]}
                        readOnly
                    />
                </div>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[1]}>
                        {titles[1]}:
                    </label>
                    <input
                        id={subtitles[1]}
                        type="text"
                        name={subtitles[1]}
                        defaultValue={data === undefined ? "" : data[subtitles[1]]}
                        readOnly
                    />
                </div>
                <ElementForm title={titles[2]} subtitle={subtitles[2]} data = {data} Ref={FilterSoGT}/>
                <ElementForm title={titles[3]} subtitle={subtitles[3]} data = {data} Ref={FilterBanChiHuy}/>
            </div>
            <div className={style.Form_right}>
                <ElementForm title={titles[4]} subtitle={subtitles[4]} data = {data} Ref={FilterNgayCap}/>
                <ElementForm title={titles[5]} subtitle={subtitles[5]} data = {data} Ref={FilterNgayHH}/>
                <ElementForm title={titles[6]} subtitle={subtitles[6]} data = {data} Ref={FilterNoiOHT}/>
                <ElementForm title={titles[7]} subtitle={subtitles[7]} data = {data} Ref={FilterNoiChuyenDen}/>
            </div>
            <div className={style.Button_register}>
                <Button 
                    content="Cập nhật"
                />
            </div>
        </form>
        )}
        </div>
    )
}

export default FormUpdateRegister;