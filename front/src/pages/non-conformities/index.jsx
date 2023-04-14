import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import columns from "./constants/datatable-columns";
import { getNonConformities, removeNonConformitie } from "../../api/non-conformities";
import { Alert, Snackbar } from "@mui/material";
import TOAST from "../../constants/toast";

function NonConformitiesPage() {
    const [nonConformities, setNonConformities] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    useEffect(() => {
        getNonConformities()
            .then((response) => {
                setNonConformities(response);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }, []);

    const handleOnRemove = (id) => {
        removeNonConformitie(id)
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Non conformitie removed successfully!");
                setNonConformities(nonConformities => nonConformities.filter(nonConformitie => nonConformitie.id !== id));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }

    return (
        <section>
            <PageHeader
                hasAdd
                pathAdd="/non-conformities/create"
            >
                Non conformities
            </PageHeader>
            <PageBody>
                <DataTable columns={columns} data={nonConformities} pathEdit={"/non-conformities/"} onRemove={handleOnRemove}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default NonConformitiesPage;