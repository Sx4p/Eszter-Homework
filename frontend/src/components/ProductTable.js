import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar";

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

const getKeysFromProduct = (product) => {
    return Object.keys(product)
}

const createLabelFromKey = (key) => {
    return key.split("").map((letter, i) =>
        i === 0 ? letter.toUpperCase() : letter.toUpperCase() === letter ? " " + letter : letter).join("");
}

const sortRowsByLabel = (label, rows) => {
    return [...rows].sort((item1, item2) =>
        typeof item1[label] === "string" ? item1[label].localeCompare(item2[label]) : item1[label] - item2[label])
}

const isAscendingRowsByLabel = (label, rows) => {
    if (rows.length) {
        return rows[0][label] <= rows[rows.length - 1][label];
    } else {
        return true;
    }
}

function ProductTable({products, keys}) {
    const [rows, setRows] = useState([]);
    const [lastLabelSort, setLastLabelSort] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchLabel, setSearchLabel] = useState("");

    useEffect(() => {
        setRows(products);
    }, [products])

    function sortProductsByColumn(key, products) {
        if (lastLabelSort === key) {
            setRows([...products].reverse());
        } else {
            setRows(sortRowsByLabel(key, products))
        }
        setLastLabelSort(key)
    }

    function searchByLabel(searchText, label) {
        const filteredProducts = products.filter((product) =>
            product[label].toString().toLowerCase().includes(searchText.toLowerCase())
        );
        if (lastLabelSort) {
            const sortedRows = sortRowsByLabel(lastLabelSort, filteredProducts);
            isAscendingRowsByLabel(lastLabelSort, rows) ? setRows(sortedRows) : setRows(sortedRows.reverse());
        } else {
            setRows(filteredProducts);
        }
        setSearchText(searchText);
        setSearchLabel(label);
    }

    return (
        <>
            <SearchBar keys={keys} handleSearchByLabel={searchByLabel} rows={rows}/>
            <TableContainer component={Paper}
                            sx={{
                                marginTop: "20px",
                                marginBottom: "20px",
                                maxHeight: "70vh",
                                opacity: 0.8,
                                borderRadius: "20px"
                            }}>
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
                                }} onClick={() => sortProductsByColumn(key, rows)}>{createLabelFromKey(key)}
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
                                {getKeysFromProduct(row).map((key) => (
                                    <TableCell key={key}
                                               align="right">{getHighlightedText(row[key], searchText, key, searchLabel)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ProductTable;