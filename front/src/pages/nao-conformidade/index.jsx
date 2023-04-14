import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import "./styles.scss";
import columns from "./constants/datatable-columns";
import { getNaoConformidades, removeNaoConformidade } from "../../api/nao-conformidade";
import { Alert, Snackbar } from "@mui/material";
import TOAST from "../../constants/toast";

function NaoConformidadePage() {
    const [naoConformidade, setNaoConformidade] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    useEffect(() => {
        getNaoConformidades()
            .then((response) => {
                setNaoConformidade(response);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }, []);

    const handleOnRemove = (id) => {
        removeNaoConformidade(id)
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Não conformidade removida com sucesso!");
                setNaoConformidade(naoConformidade => naoConformidade.filter(item => item.id !== id));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }

    return (
        <section className="nao-conformidade">
            <PageHeader
                hasAdd
                pathAdd="/nao-conformidade/criar"
            >
                Não conformidade
            </PageHeader>
            <PageBody>
                <DataTable columns={columns} data={naoConformidade} pathEdit={"/nao-conformidade/"} onRemove={handleOnRemove}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default NaoConformidadePage;