import React from "react";
import "./styles.scss";
import LinkedButton from "../linked-button";
import { Menu } from "@mui/icons-material";

function Navbar() {

    return (
        <div className="navbar">
            <h2 className="navbar__title">Qualyteam testing</h2>
            <input id="navbar__check" className="navbar__check" type="checkbox" hidden/>
            <label htmlFor="navbar__check" className="navbar__label">
                <Menu width={32} sx={{ color: '#FFF' }}/>
            </label>
            <div className="navbar__actions">
                <LinkedButton path="/non-conformities">Non conformities</LinkedButton>
                <LinkedButton path="/departments">Departments</LinkedButton>
            </div>
            
        </div>
    );
}

export default Navbar;