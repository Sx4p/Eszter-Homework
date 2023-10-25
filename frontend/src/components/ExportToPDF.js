import React from 'react';
import {IconButton, Tooltip} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getKeysFromProduct = (product) => {
    return Object.keys(product)
}

const exportPDF = (head, body) => {
    const document = new jsPDF();
    document.text("Product Table", 20, 10)

    autoTable(document, {
        theme: "grid",
        head: [head],
        body: body.map((row) => getKeysFromProduct(row).map((key) => row[key]))
    })

    document.save("table.pdf")
}

function ExportToPdf({labels, products}) {
    return (
        <div>
            <Tooltip title="Export to PDF">
                <span>
                    <IconButton sx={{m: 1, color: "black"}} onClick={() => exportPDF(labels, products)}
                                disabled={products.length === 0}>
                        <FileDownloadOutlinedIcon/>
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
}

export default ExportToPdf;