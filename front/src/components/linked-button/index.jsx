import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function LinkedButton({path, children}) {
    return (
        <Link to={path} className="linked-button">
            {children}
        </Link>
    );
}

export default LinkedButton;