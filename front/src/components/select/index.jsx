import React from "react";
import "./styles.scss";
import { isNull } from "../../utils/validation";

import Select from "react-select";

function SelectCustom({options, label, value, setValue}) {
    const nullValue = isNull(value);

    return (
        <div className="select">
            {
                label && (
                    <label htmlFor={"select__field__" + label} className={"select__label" + (!nullValue ? " select__label-typed" : "")}>{label}</label>
                )
            }
            <Select
                id={"select__field__" + label}
                aria-label={"select__field__" + label}
                className={"select__field" + (!nullValue ? " select__field-typed" : "")}
                closeMenuOnSelect={true}
                isMulti
                isSearchable
                value={value}
                options={options}
                onChange={(state) => setValue(state)}
                placeholder=""
            />
        </div>
    );
}

export default SelectCustom;