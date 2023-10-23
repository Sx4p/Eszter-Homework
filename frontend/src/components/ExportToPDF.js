import React from 'react';
import {IconButton, Tooltip} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (head, body) => {
    const document = new jsPDF();
    document.text("Product Table", 20, 10)

    autoTable(document, {
        theme: "grid",
        head: [head],
        body: body.map((row) => [row.itemNumber, row.name, row.netPrice, row.valueAddedTax])
    })

    document.save("table.pdf")
}

function ExportToPdf({labels, products}) {
    return (
        <div>
            <Tooltip title="Export to PDF">
                <IconButton sx={{m: 1, color: "black"}} onClick={() => exportPDF(labels, products)}>
                    <FileDownloadOutlinedIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default ExportToPdf;