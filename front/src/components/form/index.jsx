import React from "react";
import "./styles.scss";

function Form({onSubmit, children}) {
    return (
        <form className="form" role="form" onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export default Form;