import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

const getHighlightedText = (text, highlight, column, searchLabel) => {
    if (column === searchLabel) {
        const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? {
                fontWeight: 'bold',
                backgroundColor: "#75c1c4"
            } : {}}>
            {part}
        </span>);
    } else {
        return text;
    }
}

const createLabelFromKey = (key) => {
    return key.split("").map((letter, i) =>
        i === 0 ? letter.toUpperCase() : letter.toUpperCase() === letter ? " " + letter : letter).join("");
}

function ProductTable({products, keys, searchText, searchLabel}) {
    const [rows, setRows] = useState([]);
    const [lastLabelSort, setLastLabelSort] = useState(null);

    useEffect(() => {
        setRows(products)
    }, [products])

    function sortProductsByColumn(key) {
        if (lastLabelSort === key) {
            setRows([...rows].reverse());
        } else {
            setRows([...rows].sort((item1, item2) =>
                typeof item1[key] === "string" ? item1[key].localeCompare(item2[key]) : item1[key] - item2[key]));
        }
        setLastLabelSort(key)
    }

    return (
        <TableContainer component={Paper}
                        sx={{marginTop: "20px", marginBottom: "20px", maxHeight: "70vh", opacity: 0.8, borderRadius: "20px"}}>
            <Table sx={{minWidth: 650, padding: "5px"}} aria-label="simple table" stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        {keys.map((key) => (
                            <TableCell align="right" key={key} sx={{
                                fontSize: 20,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: "#75c1c4",
                                    color: "white",
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    cursor: "pointer"
                                }
                            }} onClick={() => sortProductsByColumn(key)}>{createLabelFromKey(key)}
                            </TableCell>))
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:hover': {backgroundColor: "rgba(187,221,224,0.55)", color: "white"}}}
                        >
                            <TableCell
                                align="right">{getHighlightedText(row.itemNumber, searchText, "itemNumber", searchLabel)}</TableCell>
                            <TableCell
                                align="right">{getHighlightedText(row.name, searchText, "name", searchLabel)}</TableCell>
                            <TableCell
                                align="right">{getHighlightedText(row.netPrice, searchText, "netPrice", searchLabel)}</TableCell>
                            <TableCell
                                align="right">{getHighlightedText(row.valueAddedTax, searchText, "valueAddedTax", searchLabel)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;