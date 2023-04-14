import React, { useEffect, useState } from "react";
import Field from "../../../../components/field";
import "./styles.scss";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Form from "../../../../components/form";
import Button from "../../../../components/button";
import { getDepartments } from "../../../../api/departamento";
import { createNaoConformidade } from "../../../../api/nao-conformidade";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import departmentToOptions from "../../mappers/departments-to-options";
import { useNavigate } from "react-router-dom";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../utils/validation";
import { Alert, Snackbar } from "@mui/material";
import TOAST from "../../../../constants/toast";

function CriarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState();
    const [departamentos, setDepartamentos] = useState();
    const [departamentosOptions, setDepartamentosOptions] = useState();

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
                setDepartamentosOptions(departmentToOptions(response.data));
            })
    }, []);

    const validaCampos = () => {
        let message = "";

        if(isNull(descricao)) {
            message += "Campo 'Descrição' obrigatório\n";
        }
        
        if(isNull(dataOcorrencia)) {
            message += "Campo 'Data de ocorrência' obrigatório\n";
        }

        if(!departamentos || (departamentos && departamentos.length === 0)) {
            message += "Campo 'Departamentos' obrigatório\n";
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

        if(!validaCampos()) return;

        createNaoConformidade({
            'description': descricao,
            'ocurrence-date': dataOcorrencia,
            'departments': departamentos ? departamentos.map(departamento => departamento.value) : []
        })
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Não conformidade criada com sucesso!");
                navigate("/nao-conformidade/" + response.data.id);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }

    

    return (
        <section className="criar-nao-conformidade">
            <PageHeader>Cadastrar Não Conformidade</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao}/>
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia}/>
                    <SelectCustom label="Departamentos" options={departamentosOptions} value={departamentos} setValue={setDepartamentos}/>
                    
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate("/nao-conformidade")}>Voltar</Button>
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
    )
}

export default CriarNaoConformidadePage;