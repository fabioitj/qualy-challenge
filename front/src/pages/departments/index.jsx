import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import PageBody from "../../components/page-body";
import PageHeader from "../../components/page-header";
import columns from "./constants/datatable-columns";
import { getDepartments, removeDepartment, verifyDepartmentBeingUsed } from "../../api/departments";
import TOAST from "../../constants/toast";
import { Alert, Snackbar } from "@mui/material";

function DepartmentsPage() {
    const [departments, setDepartmens] = useState([]);

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
                setDepartmens(response.data);
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
    }, []);

    const handleOnRemove = async (id) => {
        const beingUsed = await verifyDepartmentBeingUsed(id);
        console.log({beingUsed});
        if(!beingUsed) {;
            removeDepartment(id)
            .then(() => {
                setOpenToast(true);
                setTypeToast(TOAST.SUCCESS);
                setMessageToast("Department removed successfully!");
                setDepartmens(departments => departments.filter(department => department.id !== id));
            })
            .catch((err) => {
                setOpenToast(true);
                setTypeToast(TOAST.ERROR);
                setMessageToast(err.message);
            });
        } else {
            setOpenToast(true);
            setTypeToast(TOAST.ERROR);
            setMessageToast("This department is being used!");
        }
    }

    return (
        <section className="departments">
            <PageHeader
                hasAdd
                pathAdd="/departments/create"
            >
                Departments
            </PageHeader>
            <PageBody>
                <DataTable columns={columns} data={departments} pathEdit="/departments/" onRemove={handleOnRemove}/>
            </PageBody>
            <Snackbar open={openToast} resumeHideDuration={1} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeToast} sx={{ width: '100%' }}>
                    {messageToast}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default DepartmentsPage;