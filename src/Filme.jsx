import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Alert } from '@mui/material'
import React   from 'react'
import { useState, useEffect } from 'react';
 
function Filme(){
    const [nomefilme, setNfilme] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ categorias, setCategorias ] = useState("");
    const handleChange = (event) => {
        setCategorias(event.target.value);
    };
    const [ ano, setAno ] = useState("");
    const [ duração, setDuração ] = useState("");
    const [img, setImg] = useState("");
    const [filmeExist, setFilmeexist] = useState(false);
    const [erro, setErro] = useState(false)

    function Filme(evento){
        evento.preventDefault();
        fetch("http://10.139.75.32:8080/filmes", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: nomefilme,
                    descricao: descricao,
                    categoria: categorias,
                    ano: ano,
                    duracao: duração, 
                    imagem: img,
                }
            )
        })
        
        .then((resposta) => resposta.json())
        .then((json) => {
            if(json.titulo){
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
        setDuração("");
        setImg("");
        //setCadastro(false); 
    },  [filmeExist] );

  return (
    <Container>
        <Box
            sx={{mt: 10, background: "#B1BFE6", 
                padding:"60px", 
                borderRadius:"10px", 
                display: "flex",
                flexDirection:"column",
                alignItems:"center",
            }}>
            <Typography component="h1" variant='h5'>Cadastro de Filme</Typography>
            {erro &&( <Alert variant="outlined" severity="warning" sx={{mt:2, mb:2}}>Descupa e tenta novamente</Alert>)}
            {filmeExist &&( <Alert variant="outlined" severity="success" sx={{mt:2, mb:2}}>Obrigado por se cadastrar</Alert>)}
            <Box component="form" onSubmit={Filme}>
                <TextField
                 type="text" 
                 label=" nome do filme" 
                 variant="filled" 
                 margin="normal" 
                value={nomefilme}
                onChange={(e) => setNfilme(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="text" 
                 label=" Descrição do Filme" 
                 variant="filled" 
                 margin="normal" 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                 fullWidth
                 required
                />
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categorias}
                        label="Categoria"
                        onChange={handleChange}
                    >
                        <MenuItem value={10} >Ação</MenuItem>
                        <MenuItem value={20} >Terror</MenuItem>
                        <MenuItem value={30} >Suspence</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                 type="dat" 
                 label=" Ano" 
                 variant="filled" 
                 margin="normal" 
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="dat" 
                 label=" Duração" 
                 variant="filled" 
                 margin="normal" 
                value={duração}
                onChange={(e) => setDuração(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="ulr" 
                 label=" Insira uma LInk de uma imagem do filme" 
                 variant="filled" 
                 margin="normal" 
                value={img}
                onChange={(e) => setImg(e.target.value)}
                 fullWidth
                 required
                />
                <Box

                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb: 2}}>Cadastra-se</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default Filme