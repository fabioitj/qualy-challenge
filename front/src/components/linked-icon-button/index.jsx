import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function LinkedIconButton({path, children}) {
    return (
        <Link to={path} className="linked-icon-button">
            <IconButton>
                {children}
            </IconButton>
        </Link>
    );
}

export default LinkedIconButton;