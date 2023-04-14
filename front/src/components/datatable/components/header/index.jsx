import React from "react";
import "./styles.scss";

function DataTableHeader({columns}) {
    return (
        <thead className="datatable__header">
            <tr>
                {columns && columns.map(column => (
                    <th key={column.id} style={{ width: column.width }}>{column.title}</th>
                ))}
                <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
        </thead>
    )
}

export default DataTableHeader;