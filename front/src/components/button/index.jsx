import React from "react";
import "./styles.scss";

function Button({type = "submit", onClick, children}) {
    return (
        <button style={{ alignSelf: 'flex-start' }} className="button" type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;