import { Box, Button, Container, Rating, InputLabel, Select, TextField, Typography, Alert, Grid } from '@mui/material'
import React   from 'react'
import { useState, useEffect } from 'react';
import MenuResponsivoo from './components/MenuResponsivoo';
 
function CadastroCasa(){
    const [nomefilme, setNfilme] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ categorias, setCategorias ] = useState("");
    const handleChange = (event) => {
        setCategorias(event.target.value);
    };
    const [ ano, setAno ] = useState("");
    const [ duracao, setDuracao ] = useState("");
    const [img, setImg] = useState("");
    const[estrela, setEstrela] = useState("");
    const [filmeExist, setFilmeexist] = useState(false);
    const [erro, setErro] = useState(false)

    document.body.style.backgroundColor = "#F5ECDC"

    function Filme(evento){
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: nomefilme,
                    descricao: descricao,
                    categoria: estrela,
                    ano: ano,
                    duracao: duracao, 
                    imagem: img,
                    usuario: localStorage.getItem("usuario")
                }
            )
        })
        
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json._id){
                setFilmeexist(true);
                setErro(false)
            }else{
                setErro(true);
                setFilmeexist(false);
            }
        })
        .catch( (erro) => {setErro(true)} )
    }
    useEffect(() => {
        setNfilme("");
        setDescricao("");
        setCategorias("");
        setAno("");
        setDuracao("");
        setImg("");
        //setCadastro(false); 
    },  [filmeExist] );

  return (
    <>
    <MenuResponsivoo/>
    <Container>
        <Box
            sx={{mt: 10, background: "#D9D9D9", 
                padding:"60px", 
                borderRadius:"10px", 
                display: "flex",
                flexDirection:"column",
                alignItems:"center",
            }}>
            <Typography component="h1" variant='h5'>Nova Casa</Typography>
            {erro &&( <Alert variant="outlined" severity="warning" sx={{mt:2, mb:2}}>endereço ja cadastrado. Tente novamente por favor!</Alert>)}
            {filmeExist &&( <Alert variant="outlined" severity="success" sx={{mt:2, mb:2}}>Obrigado por cadastrar da seu casa !</Alert>)}
            <Box component="form" onSubmit={Filme}>
                <TextField
                 type="text" 
                 label=" Endereço" 
                 variant="standard" 
                 margin="normal" 
                value={nomefilme}
                onChange={(e) => setNfilme(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="text" 
                 label=" Descrição" 
                 variant="standard" 
                 margin="normal" 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="dat" 
                 label=" Bairro:" 
                 variant="standard" 
                 margin="normal" 
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                 fullWidth
                 required
                />
                <Typography component="legend" sx={{mt: 5}}>Qualidade</Typography>
                <Rating
                    name="simple-controlled"
                    value={estrela}
                    onChange={(event, newValue) => {
                    setEstrela(newValue);
                    }}
                />
                <TextField
                 type="dat" 
                 label=" Valor:" 
                 variant="standard" 
                 margin="normal" 
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="ulr" 
                 label=" Foto da casa:" 
                 variant="standard" 
                 margin="normal" 
                value={img}
                onChange={(e) => setImg(e.target.value)}
                 fullWidth
                 required
                />
                <Box

                />
                <Button type="submit" variant="outlined" fullWidth sx={{mt: 2, mb: 2}}>Cadastra-se</Button>
            </Box>
            <Grid item xs={6}>
                <a  href="http://localhost:3000/" style={{ textDecoration: ' none', color: ' black' }}>Voltar</a>
            </Grid>
            
        </Box>
    </Container>
    </>
  )
}

export default CadastroCasa
