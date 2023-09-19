import { Alert, Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { common } from '@mui/material/colors';
import { useNavigate, json } from 'react-router-dom';
import stile from "./components/css/login.module.css"

function Login() {
   
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    const [login, setLogin] = useState(false); 
    const [erro, setErro] = useState(false);
    const navigate = useNavigate();


    /*Essa parte esta lendo e recebendo as informação, e rescrevendo em algum lugar, para fazer a ferificação  */ 
    useEffect(() => {
        if(login){
            localStorage.setItem("usuario" , JSON.stringify({email:email}));
            setEmail("");
            setSenha("");
            navigate("/");
        }
    }, [login] );
    /*ja nessa parte ele esta vendo se as informação pasada pelo useEffect são verdadeira ou falso, se as infrmação tiver ele vai executar 
    o if e else se der o erro 401 vai dar o aleti casso não vai pasar para outra tela  */ 
    function Autenticar(evento){
        fetch(process.env.REACT_APP_BACKEND + "login", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json.user ){
                setLogin(true);
            }else {
                setErro(true);
            }
        })
        .catch( (erro) => {setErro(true)} )
        evento.preventDefault()
    }

    return (
    <>
    <div className= {stile.img}></div>
    <Container component="section" maxWidth="xs">
        <Box
         sx={{mt: 10, background: "rgba(217, 217, 217, 0.50)",
            padding:"50px", 
            borderRadius:"41px", 
            display: "flex",
            flexDirection:"column",
            alignItems:"center",
            height: '35rem',
            width:"31rem",
            marginLeft: '-6rem',
          }}>
            <Avatar  alt="Remy Sharp" sx={{ width: 100, height: 100 }} src='' />
            <br/>
            <Typography component="h1" variant='h4'>Entrar</Typography>
            {erro && ( <Alert variant="outlined" severity="warning">Revise seus dados e tente novamenete </Alert> )}
            <Box component="form" onSubmit={Autenticar}> 
            <TextField 
            id="standard-basic"
            label="Email" 
            variant="standard" 
            margin="normal"
            type="email"  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
             />
            <TextField 
                id="standard-basic"
                type="password"
                label="Senha"
                variant="standard"
                margin="normal" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth 
            />
                <FormControlLabel
                    control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar( !lembrar )}/> }
                    label="Lembrar-me"
                />
                <Button type="submit" variant="outlined" fullWidth sx={{mt: 2, mb: 2}} >Login</Button>
                <Grid container>
                    <Grid item xs={6}>
                        <a  href="http://localhost:3000/cadastro">Cadastro</a>
                    </Grid>
                    <Grid item xs={6}>
                        <a  href="http://localhost:3000/">Voltar</a>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        
    </Container>
    </>
  )
  
}

export default Login