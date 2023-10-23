import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import {Avatar, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function Register() {
    const [registrationFailed, setRegistrationFailed] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRegistrationFailed(false);
        setRegistered(false);
        const loginData = new FormData(event.currentTarget);
        try {
            if (loginData.get("username")) {
                const res = await fetch("/api/user/register", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "username": loginData.get("username"),
                            "password": loginData.get("password")
                        })
                    }
                );
                if (res.status === 200) {
                    setRegistered(true);
                } else {
                    if (res.status === 422) {
                        setErrorMessage("The password must be at least 8 characters!");
                    }
                    if (res.status === 409) {
                        setErrorMessage("This username is already taken!");
                    }
                    setRegistrationFailed(true);
                }
            } else {
                setErrorMessage("Please fill out username field!");
                setRegistrationFailed(true);
            }
        } catch {
            setErrorMessage("Oops! Something went wrong... Please try again!")
            setRegistrationFailed(true);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/");
        }
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: "white",
                    opacity: 0.8,
                    borderRadius: "20px",
                    padding: "50px"
                }}
            >
                <Avatar sx={{m: 1, backgroundColor: "#54888a"}}>
                    <PersonOutlineOutlinedIcon sx={{color: "white"}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registration to Netlient Product Table
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        sx={{
                            "& fieldset": {
                                borderColor: "#54888a"
                            },
                            "&:hover fieldset": {
                                borderWidth: 2
                            },
                            "& label": {
                                color: "#54888a"
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        sx={{
                            "& fieldset": {
                                borderColor: "#54888a"
                            },
                            "&:hover fieldset": {
                                borderWidth: 2
                            },
                            "& label": {
                                color: "#54888a"
                            }
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: "#54888a"}}
                    >
                        registration
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={"/login"} variant="body2">
                                {"Have an account? Log In!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={registrationFailed} autoHideDuration={5000} onClose={() => setRegistrationFailed(false)}>
                <Alert severity={"error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={registered} autoHideDuration={5000} onClose={() => setRegistered(false)}>
                <Alert severity={"success"}>
                    Successful registration! Please log in!
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Register;