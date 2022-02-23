import React, {useRef} from "react";
import style from "./FormMilitary.module.css";
import ElementForm from "../ElementMiliFrom/ElementForm";
import Button from "../ButtonMiliNoti/Button";

function FormMilitary({titles, subtitles, Submit, onClickSave, onClickBack}){
    const Form = useRef();
    const SubmitForm = (e) => {
        e.preventDefault();
        Form.current = e.target;
        const form = new FormData(e.target);
        Submit(form, ResetForm);
    };
    const ResetForm = () => {
        Form.current.reset();
    };

    return(
        <form className={style.Form_main} onSubmit={SubmitForm}>
            <div className={style.Form_left}>
                <ElementForm title={titles[0]} subtitle={subtitles[0]}/>
                <ElementForm title={titles[1]} subtitle={subtitles[1]}/>
                <ElementForm title={titles[2]} subtitle={subtitles[2]}/>
                <ElementForm title={titles[3]} subtitle={subtitles[3]}/>
            </div>
            <div className={style.Form_right}>
                <ElementForm title={titles[4]} subtitle={subtitles[4]}/>
                <ElementForm title={titles[5]} subtitle={subtitles[5]}/>
                <ElementForm title={titles[6]} subtitle={subtitles[6]}/>
                <ElementForm title={titles[7]} subtitle={subtitles[7]}/>
            </div>
            <div className={style.Button_register}>
                <Button 
                    content="Lưu"
                    onClick={onClickSave}
                />
                <Button
                    content="Trở lại" 
                    onClick={onClickBack}
                />
            </div>
        </form>
    )
}

export default FormMilitary;