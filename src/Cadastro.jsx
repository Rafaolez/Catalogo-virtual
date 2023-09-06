import { Box, Container,  FormControlLabel, TextField, Checkbox, Button, Typography, Alert } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';

function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTel] = useState("");
    const [cpf, setCpf] = useState("");
    const [cadastro, setCadastro] = useState(false)
    const [erro, setErro] = useState(false)
    const [LI, setLembrar] = useState(false);

    function Cadastro(evento){
        evento.preventDefault();
        fetch("http://10.139.75.32:8080/users", {
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
    <Container component="section" maxWidth="sm">
        <Box sx={{mt: 10, background: "#B1BFE6", 
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
                variant="filled" 
                margin="normal" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                required
                />
                <TextField
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                />
                <TextField 
                type="text"
                label=" CPF"
                variant="filled"
                margin="normal" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                fullWidth   
                required
                  />
                <TextField
                type="tel" 
                label="Telefone" 
                variant="filled" 
                margin="normal" 
                value={telefone}
                onChange={(e) => setTel(e.target.value)}
                fullWidth
                required
                />
                <TextField 
                type="password"
                label="Senha"
                variant="filled"
                margin="normal" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth 
                required
                  />
                <FormControlLabel
                    control={<Checkbox value={LI} name="lembrar" onChange={(e) => setLembrar( !LI )}/> }
                    label="Li e comcordo com os termo"
                    required
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb: 2}}> Cadastrar-se</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Cadastro