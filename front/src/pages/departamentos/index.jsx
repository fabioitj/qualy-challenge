import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import columns from "./constants/datatable-columns";
import "./styles.scss";
import { getDepartments, removeDepartmentById, verifyDepartmentBeingUsed } from "../../api/departamento";
import TOAST from "../../constants/toast";
import { Alert, Snackbar } from "@mui/material";

function DepartamentosPage() {
    const [departamentos, setDepartamentos] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }


    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartamentos(response.data);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }, []);

    const handleOnRemove = async (id) => {
        const beingUsed = await verifyDepartmentBeingUsed(id);
        if(!beingUsed) {;
            removeDepartmentById(id)
            .then(() => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Departamento removido com sucesso!");
                setDepartamentos(departamentos => departamentos.filter(departamento => departamento.id !== id));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
        } else {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast("Este departamento já está em uso!");
        }
    }

    return (
        <section className="departamentos">
            <PageHeader
                hasAdd
                pathAdd="/departamentos/criar"
            >
                Departamentos
            </PageHeader>
            <PageBody>
                <DataTable columns={columns} data={departamentos} pathEdit="/departamentos/" onRemove={handleOnRemove}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default DepartamentosPage;