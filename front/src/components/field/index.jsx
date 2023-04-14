import React from "react";
import "./styles.scss";
import { isNull } from "../../utils/validation";

function Field({label, type = "text", value, setValue, isReadOnly = false}) {
    const nullValue = isNull(value);

    return (
        <div className="field">
            {
                label && (
                    <label htmlFor={"field__input__" + label} className={"field__label" + (!nullValue ? " field__label-typed" : "")}>{label}</label>
                )
            }
            <input id={"field__input__" + label} className={"field__input" + (!nullValue ? " field__input-typed" : "")} type={type} value={value || ''} onChange={e => setValue(e.target.value)} disabled={isReadOnly}/>
        </div>
    );
}

export default Field;