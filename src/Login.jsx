import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { common } from '@mui/material/colors';
import { useNavigate, json } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#49536b',
        },
        secondary: {
          main: '#ff0004',
        },
        background: {
          default: '#d1dcf7',
          paper: '#B1BFE6',
        },
        error: {
          main: '#b71c1c',
          light: '#d50000',
          dark: '#d50000',
          contrastText: '#a22121',
        },
        warning: {
          main: '#bb5200',
        },
    }
})

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    const [login, setLogin] = useState(false); 
    const [erro, setErro] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(login){
            localStorage.setItem("usuario" , JSON.stringify({email:email}));
            setEmail("");
            setSenha("");
            navigate("/");
        }
    }, [login] );

    function Autenticar(evento){
        fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: senha
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json.statusCode === 401){
                setErro(true);
            }else {
                setLogin(true);
            }
        })
        .catch( (erro) => {setErro(true)} )
        evento.preventDefault()
    }

    return (
    <ThemeProvider theme={theme}>
    <Container component="section" maxWidth="xs">
        <Box
         sx={{mt: 10, background: "#B1BFE6", 
            padding:"50px", 
            borderRadius:"10px", 
            display: "flex",
            flexDirection:"column",
            alignItems:"center",
          }}>
            <Typography component="h1" variant='h4'>Entrar</Typography>
            <Box component="form" onSubmit={Autenticar}> 
                <TextField 
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                />
                <TextField 
                type="password"
                label="Senha"
                variant="filled"
                margin="normal" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth 
                  />
                <FormControlLabel
                    control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar( !lembrar )}/> }
                    label="Lembrar-me"
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb: 2}} >Login</Button>
                <Grid container>
                    <Grid item xs>
                        Esqueci a senha
                    </Grid>
                    <Grid item>
                        Casdastrar
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
    </ThemeProvider>
  )
}

export default Login