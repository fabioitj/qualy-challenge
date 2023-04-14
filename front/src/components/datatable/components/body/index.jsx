import React from "react";
import "./styles.scss";
import { Edit, RemoveCircleOutline } from "@mui/icons-material";
import LinkedIconButton from "../../../linked-icon-button";
import { IconButton } from "@mui/material";

const getPagedData = (data, currentPage, unitsPerPage) => {
    const start = (currentPage - 1) * unitsPerPage;
    const end = start + unitsPerPage;
    const slice = data ? data.slice(start, end) : [];
    return slice;
}

function columnDataByType(id, data) {
    switch(typeof data) {
        case 'object':
            return <td key={id}><div>{data.join(', ')}</div></td>
        
        case 'string':
                const date = new Date(data);
                if(date.toString() !== "Invalid Date")
                    return <td key={id}><div>{date.toLocaleDateString()}</div></td>
                else    
                    return <td key={id}><div>{data}</div></td>  
        case 'number':
            return <td key={id}><div>{data}</div></td>
    }
}

function DataTableBody({data, page, unitsPerPage, columns, pathEdit, onRemove}) {
    const paged_data = getPagedData(data, page, unitsPerPage);

    return (
        <tbody className="datatable__body">
            {paged_data && paged_data.map((row, index) => (
                <tr key={row.id} style={{ backgroundColor: index % 2 == 0 ? 'rgba(0, 0, 0, 0.025)' : '' }}>
                    {columns.map(column => columnDataByType(column.id, row[column.id]))}
                    <td>
                        <div className="datatable__box__body__actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <LinkedIconButton className="datatable__box__button" path={pathEdit + row.id}>
                                <Edit/>
                            </LinkedIconButton>
                            <IconButton onClick={() => { onRemove(row.id) }}>
                                <RemoveCircleOutline/>
                            </IconButton>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default DataTableBody;