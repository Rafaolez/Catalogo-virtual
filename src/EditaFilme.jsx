import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditaFilme() {

    const {id} = useParams();


    const [nomefilme, setNfilme] = useState("");
    const [ descricao, setDescricao] = useState("");
    const [ categorias, setCategorias ] = useState("");
    const handleChange = (event) => {
        setCategorias(event.target.value);
    };
    const [ ano, setAno ] = useState("");
    const [ duracao, setDuracao ] = useState("");
    const [img, setImg] = useState("");
    const [edita, setEdita] = useState(false);
    const [erro, setErro] = useState(false)

    useEffect(() => {
        fetch( process.env.REACT_APP_BACKEND + "filmes/" + id, {
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
            setCategorias(json.categoria);
            setDuracao(json.duracao);
            setImg(json.imagem);
            }else{
                setErro("FIlme não encontrado ");
            }
            
        })
        .catch( (erro) => {setErro(true)} )
        
    }, []);

    function Editar(evento){
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "filmes", {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id : id,
                    titulo: nomefilme,
                    descricao: descricao,
                    categoria: categorias,
                    ano: ano,
                    duracao: duracao, 
                    imagem: img,
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
        <Box sx={{mt: 10, background: "#B1BFE6", 
            padding:"60px", 
            borderRadius:"10px", 
            display: "flex",
            flexDirection:"column",
            alignItems:"center",
          }}>
            <Typography component="h1" variant='h4'>Editar FIlme</Typography>
            {erro && ( <Alert severity='warning'>{erro}</Alert>)}
            {edita && (<Alert severity='success'>Filme editado com sucesso</Alert>)}
            <Box component="form" onSubmit={Editar}>
            <Typography component="h1" variant='h5'>Cadastro de Filme</Typography>

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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                    <Select labelId="demo-simple-select-label"
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
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
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
                <Button  type="submit" variant="contained" fullWidth sx={{mt: 2, mb: 2}}> Editar</Button>
        </Box>
        </Box>
    </Container>
  )
}
export default EditaFilme