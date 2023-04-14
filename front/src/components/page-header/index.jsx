import React from "react";
import "./styles.scss";
import Add from '@mui/icons-material/Add';
import LinkedIconButton from "../linked-icon-button";

function PageHeader({pathAdd = "", hasAdd = false, children}) {
    return (
        <div className="page-header">
            <h3 className="page-header__title">{children}</h3>
            {
                hasAdd && (
                    <LinkedIconButton path={pathAdd}>
                        <Add />
                    </LinkedIconButton>
                )
            }
        </div>
    );
}

export default PageHeader;