import { Box, Container,  FormControlLabel, TextField, Checkbox, Button, Typography, Alert, Grid } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTel] = useState("");
    const [cpf, setCpf] = useState("");
    const [img , setImg] = useState("");
    const [cadastro, setCadastro] = useState(false)
    const [erro, setErro] = useState(false)
    const [LI, setLembrar] = useState(false);

    function Cadastro(evento){
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "usuarios", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone,
                    senha: senha
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json.cpf){
                setCadastro(true);
                setErro(false)
            }else{
                setErro(true);
                setCadastro(false);
            }
        })
        .catch( (erro) => {setErro(true)} )
    }
    useEffect(() => {
        setNome("");
        setEmail("");
        setCpf("");
        setTel("");
        setSenha("");
        //setCadastro(false); 
    },  [cadastro] );

  return (
        <>
    <Container component="section" maxWidth="sm">
        <Box sx={{mt: 5, background: "#D9D9D9", 
            padding:"60px", 
            borderRadius:"10px", 
            display: "flex",
            flexDirection:"column",
            alignItems:"center",         
          }}>
            <Typography component="h1" variant='h4'>Cadastro</Typography>

            {erro &&( <Alert variant="outlined" severity="warning" sx={{mt:2, mb:2}}>Descupa e tenta novamente</Alert>)}
            {cadastro &&( <Alert variant="outlined" severity="success" sx={{mt:2, mb:2}}>Obrigado por se cadastrar</Alert>)}

            <Box component="form"   onSubmit={Cadastro}>
            <TextField
                type="text" 
                label=" nome " 
                variant="standard" 
                margin="normal" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                required
                />
                <TextField
                type="email" 
                label="Email" 
                variant="standard" 
                margin="normal" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                />
                <TextField 
                type="text"
                label=" CPF"
                variant="standard"
                margin="normal" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                fullWidth   
                required
                  />
                <TextField
                type="tel" 
                label="Telefone" 
                variant="standard" 
                margin="normal" 
                value={telefone}
                onChange={(e) => setTel(e.target.value)}
                fullWidth
                required
                />
                <TextField 
                type="password"
                label="Senha"
                variant="standard"
                margin="normal" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth 
                required
                  />
                <TextField
                type="ulr" 
                label=" Insira uma LInk de uma imagem de perfil" 
                variant="standard" 
                margin="normal" 
                value={img}
                onChange={(e) => setImg(e.target.value)}
                fullWidth
                />
                <FormControlLabel
                    control={<Checkbox value={LI} name="lembrar" onChange={(e) => setLembrar( !LI )}/> }
                    label="Li e comcordo com os termo"
                    required
                />
                <Button type="submit" variant="outlined" fullWidth sx={{mt: 2, mb: 2}}> Cadastrar-se</Button>
            </Box>
            <Grid item >
                        <a  href="http://localhost:3000/login" style={{ textDecoration: ' none', color: ' black' }}>Voltar</a>
                    </Grid>
        </Box>
    </Container>
    
    </>
  )
}

export default Cadastro