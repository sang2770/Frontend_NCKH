import React, {useRef} from "react";
import style from "./FormStoreNoti.module.css";
import Button from "../ButtonMiliNoti/Button";

function FormStoreNoti({onClickBack, Submit}){
    const Form = useRef();
    const SubmitForm = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        console.log(e.target);
        Submit(form, ResetForm);
    };
    const ResetForm = () => {
        Form.current.reset();
    };

    return (
        <form  onSubmit={SubmitForm}>
            <div className={style.Content_store}>
                <div className={style.Conetent_tittel}>
                    <label className={style.Content_lable}>
                        Tiêu đề thông báo
                    </label>
                    <input 
                        className={style.Content_input}
                        id="TieuDeTB"
                        type="text"
                        name="TieuDeTB"
                        onChange=""
                        required
                    />
                </div>
                <div className={style.Content_main}>
                    <label className={style.Content_lable}>
                        Nội dung thông báo
                    </label>
                    <textarea 
                        className={style.Content_textarea}
                        id="NoiDungTB"
                        type="text"
                        name="NoiDungTB"
                        onChange=""
                        required
                    />
                </div>
                <div className={style.Content_file}>
                    <label className={style.Content_lable}>File đính kèm</label>
                    <input type="file" name="file" className={style.Content_input_file}></input>
                </div>
            </div>
            <div className={style.button}>
                <Button content="Lưu"/>
                <Button content="Quay lại" onClick={onClickBack} />
            </div>
        </form>
    )
}

export default FormStoreNoti;