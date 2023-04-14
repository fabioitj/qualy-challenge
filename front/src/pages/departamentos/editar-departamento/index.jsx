import React, { useEffect, useState } from "react";
import Field from "../../../components/field";
import Form from "../../../components/form";
import "./styles.scss";
import PageHeader from "../../../components/page-header";
import PageBody from "../../../components/page-body";
import { useNavigate, useParams } from "react-router";
import { getDepartmentById, updateDepartmentById } from "../../../api/departamento";
import Button from "../../../components/button";
import GroupButton from "../../../components/group-button";
import TOAST from "../../../constants/toast";
import { Alert, Snackbar } from "@mui/material";
import { isNull } from "../../../utils/validation";

function EditarDepartamentoPage() {
    const { id } = useParams();
    const [nome, setNome] = useState("");

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    const navigate = useNavigate();

    useEffect(() => {

        getDepartmentById(id)
            .then((response) => {
                setNome(response.data.name);
            })
            .catch(err => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });

    }, []);

    const validarCampos = () => {
        let message = "";

        if(isNull(nome))
            message += "Campo 'Nome' obrigatório.";

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

        if(!validarCampos()) return;

        updateDepartmentById(id, {name: nome})
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Departamento salvo com sucesso!");
                navigate("/departamentos");
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }

    return (
        <section className="editar-departamento">
            <PageHeader>Editar departamentos</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnClick}>
                    <Field label="Nome" type="text" value={nome} setValue={setNome}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate(-1)}>Voltar</Button>
                        <Button type="submit">Salvar</Button>
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

export default EditarDepartamentoPage;