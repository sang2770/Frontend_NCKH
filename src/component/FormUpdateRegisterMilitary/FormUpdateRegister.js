import React, {useRef} from "react";
import style from "./FormUpdateRegister.module.css";
import Button from "../ButtonMiliNoti/Button";
import ElementForm from "../../component/ElementMiliFrom/ElementForm";
import useAxios from "../../Helper/API";

function FormUpdateRegister({titles, subtitles, onClickBack, data, MSV}){

    const Client = useAxios();

    const FilterSoDK = useRef("");
    const FilterNgayDK = useRef("");
    const FilterNoiDK = useRef("");
    const FilterDiaChi = useRef("");
    const FilterNgayNop = useRef("");
    const FilterHoTen = useRef(data[subtitles[0]]);
    const FilterMSV = useRef(data[subtitles[1]]);
    const FilterNgaySinh = useRef(data[subtitles[2]]);


    const updateRegister = () => {
        if( window.confirm("Bạn có muốn cập nhật giấy chứng nhận này không?") === true){
            // MSV && FilterSoDK && FilterNgayDK && FilterNoiDK && FilterDiaChi && FilterNgayNop &&
            Client.put("/register-military-management/update-register-military/" + MSV
            + "?SoDangKy=" + FilterSoDK.current.value + "&NoiDangKy=" + FilterNoiDK.current.value 
            + "&NgayDangKy=" + FilterNgayDK.current.value + "&DiaChiThuongTru=" + FilterDiaChi.current.value 
            + "&NgayNop=" + FilterNgayNop.current.value)
            .then((response) => {
            if (response.data.status === "Success updated") {
                alert("Bạn đã cập nhật thông báo thành công!!!");
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
    const SubmitForm = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        updateRegister(form, ResetForm);
    };
    const ResetForm = () => {
        Form.current.reset();
    };

    return (
        <form className={style.Form_main} onSubmit={SubmitForm}>
            <div className={style.Form_left}>
                <div className={style.Element_form}>
                    <label htmlFor={subtitles[0]}>
                        {titles[0]}:
                    </label>
                    <input
                        ref={FilterHoTen}
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
                        ref={FilterMSV}
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
                        ref={FilterNgaySinh}
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
                <Button
                    content="Ẩn" 
                    onClick={onClickBack}
                />
            </div>
        </form>
    )
}

export default FormUpdateRegister;