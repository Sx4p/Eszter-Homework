import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';

import {Outlet, useNavigate} from "react-router-dom";
import {Button, Grid, MenuItem} from "@mui/material";


function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
            localStorage.clear()
            navigate("/login")
    }

    return (
        <>
            <AppBar variant="elevation" position={"sticky"}
                    sx={{backgroundColor: "#54888a", marginBottom: "30px"}}>
                <Toolbar>
                    <MenuItem sx={{pointerEvents: 'none'}}>
                        <Typography sx={{
                            display: {xs: "inline-block", md: "none"},
                            fontWeight: 700,
                            fontSize: 20,
                            paddingLeft: "5px"
                        }}>
                            NPT
                        </Typography>
                        <Typography sx={{
                            display: {xs: "none", md: "inline-block"},
                            fontWeight: 700,
                            fontSize: 20,
                            paddingLeft: "5px"
                        }}>
                            Netlient Product Table
                        </Typography>
                    </MenuItem>
                    <Grid container justifyContent="flex-end">
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginRight: {xs: '9px', md: '9px', lg: '20px'},
                            fontWeight: '600'

                        }}>
                            {localStorage.getItem("username")}
                        </Typography>
                        <Button sx={{backgroundColor: "white", borderRadius: "50px", opacity: 0.8}} onClick={handleLogout}>
                            <LogoutIcon sx={{color: "black"}}/>
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
}

export default NavBar;