import React, { useEffect, useState } from "react";
import { getNonConformitieById, updateNonConformitie } from "../../../../api/non-conformities";
import { useNavigate, useParams } from "react-router";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Field from "../../../../components/field";
import Title from "../../../../components/title";
import Separator from "../../../../components/separator";
import Button from "../../../../components/button";
import Form from "../../../../components/form";
import CorrectiveActions from "./components/corrective-actions";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import { getDepartments } from "../../../../api/departments";
import departmentToOptions from "../../mappers/departments-to-options";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../utils/validation";
import TOAST from "../../../../constants/toast";
import { Alert, Snackbar } from "@mui/material";

function EditNonConformitiePage() {
    const [description, setDescription] = useState("");
    const [ocurrenceDate, setOcurrenceDate] = useState(new Date());
    const [departments, setDepartments] = useState();
    const [correctiveActions, setCorrectiveActions] = useState([]);
    const [departmentsOptions, setDepartmentsOptions] = useState();

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {    
        setOpenToast(false);
        setMessageToast("");
    }

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        getDepartments()
            .then((response) => {
                setDepartmentsOptions(departmentToOptions(response.data));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });

        getNonConformitieById(id)
            .then((response) => {
                setDescription(response.description);
                setOcurrenceDate(new Date(response["ocurrence-date"]));
                setDepartments(departmentToOptions(response.departments));

                if(response['corrective-actions'])
                    setCorrectiveActions(response['corrective-actions']);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
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

        updateNonConformitie({
            'id': id,
            'description': description,
            'ocurrence-date': ocurrenceDate,
            'departments': departments ? departments.map(department => department.value) : [],
            'corrective-actions': correctiveActions ? correctiveActions.map(acao => acao.id) : [],
        }, id)
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
            })
    }

    const nonConformitie = {
        'id': id,
        'description': description,
        'ocurrence-date': ocurrenceDate,
        'departments': departments ? departments.map(department => department.value) : [],
        'corrective-actions': correctiveActions ? correctiveActions.map(action => action.id) : []
    };

    return (
        <section>
            <PageHeader>Edit non conformitie</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Description" type="text" value={description} setValue={setDescription} />
                    <Datepicker label="Ocurrence date" value={ocurrenceDate} setValue={setOcurrenceDate}/>
                    <SelectCustom label="Departments" options={departmentsOptions} value={departments} setValue={setDepartments}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate("/non-conformities")}>Back</Button>
                        <Button type="submit">Save</Button>
                    </GroupButton>
                </Form>
                <Separator />
                <Title h={'3'}>Corrective actions</Title>
                <CorrectiveActions correctiveActions={correctiveActions} setCorrectiveActions={setCorrectiveActions} nonConformitie={nonConformitie}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default EditNonConformitiePage;