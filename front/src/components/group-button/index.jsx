import React from "react";
import "./styles.scss";

function GroupButton({children}) {
    return (
        <div className="group-button">
            {children}
        </div>
    );
}

export default GroupButton;