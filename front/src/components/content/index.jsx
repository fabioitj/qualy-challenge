import React from "react";
import "./styles.scss";
import { Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import NaoConformidadePage from "../../pages/nao-conformidade";
import DepartamentosPage from "../../pages/departamentos";
import CriarDepartamentoPage from "../../pages/departamentos/criar-departamento";
import EditarDepartamentoPage from "../../pages/departamentos/editar-departamento";
import CriarNaoConformidadePage from "../../pages/nao-conformidade/features/criar-nao-conformidade";
import EditarNaoConformidadePage from "../../pages/nao-conformidade/features/editar-nao-conformidade";

function Content() {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Navigate to="/nao-conformidade" replace/>}></Route>

                <Route path="/nao-conformidade" element={<NaoConformidadePage/>}></Route>
                <Route path="/nao-conformidade/criar" element={<CriarNaoConformidadePage/>}></Route>
                <Route path="/nao-conformidade/:id" element={<EditarNaoConformidadePage/>}></Route>

                <Route path="/departamentos" element={<DepartamentosPage/>}></Route>
                <Route path="/departamentos/criar" element={<CriarDepartamentoPage/>}></Route>
                <Route path="/departamentos/:id" element={<EditarDepartamentoPage/>}></Route>
            </Routes>
        </div>
    );
}

export default Content;