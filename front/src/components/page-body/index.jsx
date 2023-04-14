import React from "react";
import  "./styles.scss";

function PageBody({children}) {
    return (
        <div className="page-body">
            {children}
        </div>
    );
}

export default PageBody;