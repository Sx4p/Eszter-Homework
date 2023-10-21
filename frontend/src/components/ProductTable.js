import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

function createRow(itemNumber, name, netPrice, valueAddedTax) {
    return {itemNumber, name, netPrice, valueAddedTax};
}

function ProductTable({products}) {
    const [rows, setRows] = useState([]);
    const [labels] = useState(["Item Number", "Name", "Net Price", "Value Added Tax"]);
    const [lastLabelSort, setLastLabelSort] = useState(null);

    useEffect(() => {
        const rows = products.map((product) => createRow(product.itemNumber, product.name, product.netPrice, product.valueAddedTax));
        setRows(rows)
    }, [products])

    function sortProductsByColumn(label) {
        const key = label.split(" ").map((word, i) =>
            i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join("");

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
                        sx={{marginTop: "20px", maxHeight: "90vh", opacity: 0.8, borderRadius: "20px"}}>
            <Table sx={{minWidth: 650, padding: "5px"}} aria-label="simple table" stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        {labels.map((label) => (
                            <TableCell align="right" key={label} sx={{
                                fontSize: 20,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: "#75c1c4",
                                    color: "white",
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    cursor: "pointer"
                                }
                            }} onClick={() => sortProductsByColumn(label)}>{label}
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
                            <TableCell align="right">{row.itemNumber}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.netPrice}</TableCell>
                            <TableCell align="right">{row.valueAddedTax}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;