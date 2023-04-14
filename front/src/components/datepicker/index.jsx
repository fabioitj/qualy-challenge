import React from "react";
import "./styles.scss";
import { isNull } from "../../utils/validation";
import DatePicker from "react-datepicker";

function Datepicker({label, value, setValue, isReadOnly = false}) {
    const nullValue = isNull(value);

    return (
        <div className="datepicker">
            {
                label && (
                    <label htmlFor={"datepicker__date__" + label} className={"datepicker__label" + (!nullValue ? " datepicker__label-typed" : "")}>{label}</label>
                )
            }
            <DatePicker id={"datepicker__date__" + label} className={"datepicker__date" + (!nullValue ? " datepicker__date-typed" : "")} selected={value} onChange={date => setValue(date)} readOnly={isReadOnly} dateFormat="dd/MM/yyyy"/>
        </div>
        
    );
}

export default Datepicker;