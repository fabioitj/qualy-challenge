import React, { useState } from "react";
import "./styles.scss";
import { createCorrectiveAction, removeCorrectiveAction } from "../../../../../../api/corrective-actions";
import Field from "../../../../../../components/field";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Check, Close, Edit, RemoveCircleOutline } from "@mui/icons-material";
import Datepicker from "../../../../../../components/datepicker";
import { updateNonConformitie } from "../../../../../../api/non-conformities";
import { isNull } from "../../../../../../utils/validation";
import TOAST from "../../../../../../constants/toast";

function CorrectiveActions({correctiveActions, setCorrectiveActions, nonConformitie}) {
    const [id, setId] = useState("");
    const [what, setWhat] = useState("");
    const [why, setWhy] = useState("");
    const [how, setHow] = useState("");
    const [where, setWhere] = useState("");
    const [untilWhen, setUntilWhen] = useState();

    const [correctiveActionMemory, setCorrectiveActionMemory] = useState();

    const [isEditing, setIsEditing] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [typeToast, setTypeToast] = useState(TOAST.SUCCESS);
    const [messageToast, setMessageToast] = useState("");
    const handleClose = () => {   
        setOpenToast(false);
        setMessageToast("");
    }

    const handleUpdateNonConformitie = (idCorrectiveAction) => {
        nonConformitie['corrective-actions'].push(idCorrectiveAction);
        updateNonConformitie(nonConformitie, nonConformitie.id)
        .then().catch((err) => {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(err.message);
        });
    }

    const fieldsValidation = () => {
        let message= "";

        if(isNull(what))
            message += "Field 'What' is required.\n";

        if(isNull(why))
            message += "Field 'Why' is required.\n";

        if(isNull(how))
            message += "Field 'How' is required.\n";

        if(isNull(where))
            message += "Field 'Where' is required.\n";

        if(isNull(untilWhen))
            message += "Field 'Until when' is required.\n";

        if(!isNull(message)) {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(message);
        
            return false;
        }

        return true;
    }

    const handleOnAdd = () => {

        if(!fieldsValidation()) return;

        createCorrectiveAction({
            'what-to-do': what,
            'why-to-do-it': why,
            'how-to-do-it': how,
            'where-to-do-it': where,
            'until-when': untilWhen
        })
        .then((response) => {
            setMessageToast("Corrective action saved successfully!");
            setTypeToast(TOAST.SUCCESS);
            setOpenToast(true);

            setIsEditing(false);
            setCorrectiveActions(correctiveActionsOld => [...correctiveActionsOld, response.data]);
            handleUpdateNonConformitie(response.data.id)
            setWhat("");
            setWhy("");
            setHow("");
            setWhere("");
            setUntilWhen("");
        })
        .catch((err) => {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(err.message);
        });
    }

    const handleOnCancel = () => {
        setIsEditing(false);
        setCorrectiveActions(correctiveActionsOld => [...correctiveActionsOld, correctiveActionMemory])
        setWhat("");
        setWhy("");
        setHow("");
        setWhere("");
        setUntilWhen("");
        setCorrectiveActionMemory(null);
    }

    const handleOnRemove = (id) => {
        removeCorrectiveAction(id)
        .then(() => {
            setCorrectiveActions(correctiveActionsOld => correctiveActionsOld.filter(correctiveAction => correctiveAction.id !== id));
            setOpenToast(true);
            setTypeToast(TOAST.SUCCESS);
            setMessageToast("Corrective action removed successfully!");
        })
        .catch((err) => {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast(err.message);
        });
    }

    const handleIsEditing = (correctiveAction) => {
        setIsEditing(true);
        setCorrectiveActionMemory(correctiveAction);
        setId(correctiveAction["id"]);
        setWhat(correctiveAction["what-to-do"]);
        setWhy(correctiveAction["why-to-do-it"]);
        setHow(correctiveAction["how-to-do-it"]);
        setWhere(correctiveAction["where-to-do-it"]);
        setUntilWhen(new Date(correctiveAction["until-when"]));
        setCorrectiveActions(correctiveActionsOld => correctiveActionsOld.filter(correctiveActionOld => correctiveActionOld.id !== correctiveAction["id"]))
    }

    return (
        <section className="acoes-corretivas">
            <table className="acoes-corretivas__datatable">
                <thead className="acoes-corretivas__datatable__header">
                    <tr>
                        <th>What</th>
                        <th>Why</th>
                        <th>How</th>
                        <th>Where</th>
                        <th>Until when</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="acoes-corretivas__datatable__body">
                    <tr>
                        <td>
                            <Field value={what} setValue={setWhat}/>
                        </td>
                        <td>
                            <Field value={why} setValue={setWhy}/>
                        </td>
                        <td>
                            <Field value={how} setValue={setHow}/>
                        </td>
                        <td>
                            <Field value={where} setValue={setWhere}/>
                        </td>
                        <td>
                            <Datepicker value={untilWhen} setValue={setUntilWhen}/>
                        </td>
                        <td>
                            <IconButton onClick={() => { handleOnAdd() }}>
                                <Check/>
                            </IconButton>
                            {
                                isEditing && (
                                    <IconButton onClick={() => { handleOnCancel() }}>
                                        <Close/>
                                    </IconButton>
                                )
                            }
                        </td>
                    </tr>
                    {correctiveActions && correctiveActions.map((item, index) => (
                        <tr key={item.id} style={{ backgroundColor: index % 2 == 0 ? 'rgba(0, 0, 0, 0.025)' : '' }}>
                            <td>{item['what-to-do']}</td>
                            <td>{item['why-to-do-it']}</td>
                            <td>{item['how-to-do-it']}</td>
                            <td>{item['where-to-do-it']}</td>
                            <td>{(new Date(item['until-when'])).toLocaleDateString()}</td>
                            <td>
                                <IconButton onClick={() => { handleIsEditing(item) }}>
                                    <Edit/>
                                </IconButton>
                                <IconButton onClick={() => { handleOnRemove(item.id) }}>
                                    <RemoveCircleOutline/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>   
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default CorrectiveActions;