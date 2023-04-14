import React from "react";
import "./styles.scss";
import { Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import NonConformitiesPage from "../../pages/non-conformities";
import CreateNonConformitiePage from "../../pages/non-conformities/features/create-non-conformitie";
import EditNonConformitiePage from "../../pages/non-conformities/features/edit-non-conformitie";

import DepartmentsPage from "../../pages/departments";
import CreateDepartmentPage from "../../pages/departments/create-department";
import EditDepartmentPage from "../../pages/departments/edit-department";

function Content() {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Navigate to="/non-conformities" replace/>}></Route>

                <Route path="/non-conformities" element={<NonConformitiesPage/>}></Route>
                <Route path="/non-conformities/create" element={<CreateNonConformitiePage/>}></Route>
                <Route path="/non-conformities/:id" element={<EditNonConformitiePage/>}></Route>

                <Route path="/departments" element={<DepartmentsPage/>}></Route>
                <Route path="/departments/create" element={<CreateDepartmentPage/>}></Route>
                <Route path="/departments/:id" element={<EditDepartmentPage/>}></Route>
            </Routes>
        </div>
    );
}

export default Content;