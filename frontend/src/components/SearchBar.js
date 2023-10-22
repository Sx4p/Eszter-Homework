import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";

const createLabelFromKey = (key) => {
    return key.split("").map((letter, i) =>
        i === 0 ? letter.toUpperCase() : letter.toUpperCase() === letter ? " " + letter : letter).join("");
}

function SearchBar({keys, handleSearchByLabel}) {
    const [label, setLabel] = useState("");
    const [searchText, setSearchText] = useState("");

    return (
        <Paper sx={{
            borderRadius: "20px",
            padding: "20px",
            opacity: "0.8",
            marginBottom: "30px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: {xs: "column", md: "row"}
        }}>
            <Typography sx={{fontSize: 20, fontWeight: 600}}>Search by Table labels:</Typography>
            <FormControl sx={{m: 1, width: 200}}>
                <InputLabel id="select-label">Label</InputLabel>
                <Select
                    labelId="select-label"
                    id="select-label"
                    label="Label"
                    value={label}
                    onChange={(event) => {
                        setLabel(event.target.value);
                        if (searchText) {
                            handleSearchByLabel(searchText, event.target.value)
                        }
                    }}
                >
                    {keys.map((key) => (<MenuItem key={key} value={key}>{createLabelFromKey(key)}</MenuItem>))}
                </Select>
            </FormControl>
            <TextField
                sx={{m: 1, maxWidth: 550}}
                autoFocus
                margin="dense"
                id="search"
                label="Start typing..."
                fullWidth
                onChange={(event) => {
                    setSearchText(event.target.value);
                    if (label) {
                        handleSearchByLabel(event.target.value, label)
                    }
                }}/>
        </Paper>
    );
}

export default SearchBar;