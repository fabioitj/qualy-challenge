import React, { useEffect, useState } from "react";
import Field from "../../../../components/field";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Form from "../../../../components/form";
import Button from "../../../../components/button";
import { getDepartments } from "../../../../api/departments";
import { createNonConformitie } from "../../../../api/non-conformities";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import departmentToOptions from "../../mappers/departments-to-options";
import { useNavigate } from "react-router-dom";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../utils/validation";
import { Alert, Snackbar } from "@mui/material";
import TOAST from "../../../../constants/toast";

function CreateNonConformitiePage() {
    const [description, setDescription] = useState("");
    const [ocurrenceDate, setOcurrenceDate] = useState();
    const [departments, setDepartments] = useState();
    const [departmentsOptions, setDepartmentsOptions] = useState();

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    const navigate = useNavigate();

    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartmentsOptions(departmentToOptions(response.data));
            })
    }, []);

    const fieldsValidation = () => {
        let message = "";

        if(isNull(description)) {
            message += "Field 'Description' is required\n";
        }
        
        if(isNull(ocurrenceDate)) {
            message += "Field 'Ocurrence date' is required\n";
        }

        if(!departments || (departments && departments.length === 0)) {
            message += "Field 'Departments' is required\n";
        }

        if(!isNull(message)){
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(message);
            return false;
        }

        return true;
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!fieldsValidation()) return;

        createNonConformitie({
            'description': description,
            'ocurrence-date': ocurrenceDate,
            'departments': departments ? departments.map(department => department.value) : []
        })
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Non conformitie saved successfully!");
                navigate("/non-conformities/" + response.data.id);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }

    

    return (
        <section>
            <PageHeader>Create non conformitie</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Description" type="text" value={description} setValue={setDescription}/>
                    <Datepicker label="Ocurrence date" value={ocurrenceDate} setValue={setOcurrenceDate}/>
                    <SelectCustom label="Departments" options={departmentsOptions} value={departments} setValue={setDepartments}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate("/non-conformities")}>Back</Button>
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
    )
}

export default CreateNonConformitiePage;