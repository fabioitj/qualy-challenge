import React, { useState } from "react";
import "./styles.scss";
import { CircularProgress, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import GroupButton from "../group-button";
import Title from "../title";
import DataTableHeader from "./components/header";
import DataTableBody from "./components/body";

const getTotalPages = (data, unitsPerPage) => {
    return data ? Math.ceil(data.length / unitsPerPage) : 1;
}

function DataTable({columns, data, unitsPerPage = 5, pathEdit, onRemove}) {
    const [page, setPage] = useState(1);
    const total_pages = getTotalPages(data, unitsPerPage) || 1;
    
    const handleNextPage = () => {
        if(page + 1 > total_pages)
            return;
        
        setPage(page => page + 1);
    }

    const handlePreviousPage = () => {
        if(page - 1 < 1) 
            return;
        
        setPage(page => page - 1);
    }

    const verifyOnRemove = (id) => {
        const isLastPage = page === total_pages;
        if(data && Math.ceil((data.length - 1) / unitsPerPage) < total_pages && isLastPage) {
            setPage(page => page - 1);
        }

        onRemove(id);
    }

    return (
        <>
            {
                !data || (data && data.length === 0) ? (
                    <CircularProgress color="inherit" style={{ alignSelf: 'center'}}/>
                ) : (
                    <>
                        <div className="datatable">
                            <table className="datatable__box">
                                <DataTableHeader columns={columns}/>
                                <DataTableBody columns={columns} data={data} page={page} unitsPerPage={unitsPerPage} pathEdit={pathEdit} onRemove={verifyOnRemove}/>
                            </table>
                        </div>
                        <div className="datatable__footer">
                        <div className="datatable__footer__total">
                            Total: {data ? data.length : 0}
                        </div>
                        <div className="datatable__footer__buttons">
                            <GroupButton>
                                <IconButton onClick={handlePreviousPage} disabled={page - 1 < 1}>
                                    <ArrowBack/>
                                </IconButton>
                                <Title h={'4'}>{page}/{total_pages}</Title>
                                <IconButton onClick={handleNextPage} disabled={page + 1 > total_pages}>
                                    <ArrowForward/>
                                </IconButton>
                            </GroupButton>
                        </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default DataTable;