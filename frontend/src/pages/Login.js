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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function Login() {
    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginFailed(false);
        const loginData = new FormData(event.currentTarget);
        try {
            const res = await fetch("/api/user/login", {
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
                const response = await res.json();
                localStorage.setItem("token", response["token"]);
                localStorage.setItem("username", response["username"]);
                navigate("/")
            } else {
                setErrorMessage("Incorrect username/password!")
                setLoginFailed(true);
            }
        } catch {
            setErrorMessage("Oops! Something went wrong... Please try again!")
            setLoginFailed(true);
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
                    Log in to Netlient Product Table
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
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={"/register"} variant="body2">
                                {"Don't have an account? Register!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={loginFailed} autoHideDuration={5000} onClose={() => setLoginFailed(false)}>
                <Alert severity={"error"}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;