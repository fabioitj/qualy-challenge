import React, { useEffect, useState } from "react";
import "./styles.scss";
import { getNaoConformidadeById, updateNaoConformidade } from "../../../../api/nao-conformidade";
import { useNavigate, useParams } from "react-router";
import PageHeader from "../../../../components/page-header";
import PageBody from "../../../../components/page-body";
import Field from "../../../../components/field";
import Title from "../../../../components/title";
import Separator from "../../../../components/separator";
import Button from "../../../../components/button";
import Form from "../../../../components/form";
import AcoesCorretivas from "./components/acoes-corretivas";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "../../../../components/datepicker";
import SelectCustom from "../../../../components/select";
import { getDepartments } from "../../../../api/departamento";
import departmentToOptions from "../../mappers/departments-to-options";
import GroupButton from "../../../../components/group-button";
import { isNull } from "../../../../utils/validation";
import TOAST from "../../../../constants/toast";
import { Alert, Snackbar } from "@mui/material";


function EditarNaoConformidadePage() {
    const [descricao, setDescricao] = useState("");
    const [dataOcorrencia, setDataOcorrencia] = useState(new Date());
    const [departamentos, setDepartamentos] = useState();
    const [acoesCorretivas, setAcoesCorretivas] = useState([]);
    const [departamentosOptions, setDepartamentosOptions] = useState();

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
                setDepartamentosOptions(departmentToOptions(response.data));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });

        getNaoConformidadeById(id)
            .then((response) => {
                setDescricao(response.description);
                setDataOcorrencia(new Date(response["ocurrence-date"]));
                setDepartamentos(departmentToOptions(response.departments));

                if(response['corrective-actions'])
                    setAcoesCorretivas(response['corrective-actions']);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
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

        updateNaoConformidade({
            'id': id,
            'description': descricao,
            'ocurrence-date': dataOcorrencia,
            'departments': departamentos ? departamentos.map(departamento => departamento.value) : [],
            'corrective-actions': acoesCorretivas ? acoesCorretivas.map(acao => acao.id) : [],
        }, id)
            .then((response) => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Não conformidade salva com sucesso!");
                navigate("/nao-conformidade/" + response.data.id);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            })
    }

    const naoConformidade = {
        'id': id,
        'description': descricao,
        'ocurrence-date': dataOcorrencia,
        'departments': departamentos ? departamentos.map(departamento => departamento.value) : [],
        'corrective-actions': acoesCorretivas ? acoesCorretivas.map(acao => acao.id) : []
    };

    return (
        <section className="editar-nao-conformidade">
            <PageHeader>Editar Não Conformidade</PageHeader>
            <PageBody>
                <Form onSubmit={handleOnSubmit}>
                    <Field label="Descrição" type="text" value={descricao} setValue={setDescricao} />
                    <Datepicker label="Data de ocorrência" value={dataOcorrencia} setValue={setDataOcorrencia}/>
                    <SelectCustom label="Departamentos" options={departamentosOptions} value={departamentos} setValue={setDepartamentos}/>
                    
                    <GroupButton>
                        <Button type="button" onClick={() => navigate("/nao-conformidade")}>Voltar</Button>
                        <Button type="submit">Salvar</Button>
                    </GroupButton>
                </Form>
                <Separator />
                <Title h={'3'}>Ações corretivas</Title>
                <AcoesCorretivas acoesCorretivas={acoesCorretivas} setAcoesCorretivas={setAcoesCorretivas} naoConformidade={naoConformidade}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default EditarNaoConformidadePage;