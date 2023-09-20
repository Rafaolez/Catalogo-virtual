import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Rating, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditaFilme() {

    const {id} = useParams();


    const [nomefilme, setNfilme] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ categorias, setCategorias ] = useState("");
    const[estrela, setEstrela] = useState("");
    const [ ano, setAno ] = useState("");
    const [ duracao, setDuracao ] = useState("");
    const [img, setImg] = useState("");
    const [edita, setEdita] = useState(false);
    const [erro, setErro] = useState(false)

    useEffect(() => {
        const usuario = localStorage.getItem("usuario")
        fetch( process.env.REACT_APP_BACKEND + "produtos/"+ usuario + "/" + id, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if (!json.status){
            setNfilme(json.titulo);
            setDescricao(json.descricao);
            setAno(json.ano);
            setEstrela(json.categoria);
            setDuracao(json.duracao);
            setImg(json.imagem);
            }else{
                setErro("Casa não encontrado ");
            }
            
        })
        .catch( (erro) => {setErro(true)} )
        
    }, []);

    function Editar(evento){
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id : id,
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
                setEdita(true);
                setErro(false)
            }else{
                setEdita(false);
                setErro("Erro ao carregar a reguisição");
            }
        })
        .catch( (erro) => {setErro("Ops... ocorreu um erro")} )
    }

  return (
    <Container>
        <Box sx={{mt: 10, background: "rgba(217, 217, 217, 0.50)", 
            padding:"60px", 
            borderRadius:"10px", 
            display: "flex",
            flexDirection:"column",
            alignItems:"center",
          }}>
            <Typography component="h1" variant='h4'>Editar Casa</Typography>
            {erro && ( <Alert severity='warning'>{erro}</Alert>)}
            {edita && (<Alert severity='success'>Casa editado com sucesso</Alert>)}
            <Box component="form" onSubmit={Editar}>
            

                <TextField
                 type="text" 
                 label="Endereço" 
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
                 label=" Ano" 
                 variant="standard" 
                 margin="normal" 
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="dat" 
                 label=" Duração" 
                 variant="standard" 
                 margin="normal" 
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                 fullWidth
                 required
                />
                <TextField
                 type="ulr" 
                 label=" Insira uma LInk de uma imagem do filme" 
                 variant="standard" 
                 margin="normal" 
                value={img}
                onChange={(e) => setImg(e.target.value)}
                 fullWidth
                 required
                />
                <Button  type="submit" variant="contained" fullWidth sx={{mt: 2, mb: 2}}> Editar</Button>
        </Box>
        <Grid item xs={6}>
                <a  href="http://localhost:3000/" style={{ textDecoration: ' none', color: ' black' }}>Voltar</a>
            </Grid>
        </Box>
    </Container>
  )
}
export default EditaFilme