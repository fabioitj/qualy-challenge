import React, { useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate } from "react-router";
import { createDepartment } from "../../../api/departments";
import Button from "../../../components/button";
import GroupButton from "../../../components/group-button";
import { Alert, Snackbar } from "@mui/material";
import TOAST from "../../../constants/toast";
import { isNull } from "../../../utils/validation";

function CreateDepartmentPage() {
    const [name, setName] = useState("");

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    const navigate = useNavigate();

    const fieldsValidation = () => {
        let message = "";

        if(isNull(name))
            message += "Field 'Name' is required.";

        if(!isNull(message)){
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(message);
            return false;
        }

        return true;
    }

    const handleOnClick = (e) => {
        e.preventDefault();

        if(!fieldsValidation()) return;

        createDepartment({name})
            .then((response) => {   
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Department saved successfully!");
                navigate("/departments");
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });

    }

    return (
        <section>
            <PageHeader>Create department</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnClick}>
                    <Field label="Name" type="text" value={name} setValue={setName}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate(-1)}>Back</Button>
                        <Button type="submit">Save</Button>
                    </GroupButton>
                </Form>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default CreateDepartmentPage;