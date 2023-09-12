import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filmes from "./components/Filme";

function App(){
  const [filme, setFilme] = useState();
  const {erro, setErro} = useState();
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "filmes", {
      method: "GET", 
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => { setFilme ( json)  } )
    .catch( (erro) => {setErro(true)} )
  }, [])
  return (
    <>
      <h1>Filmes</h1>
      <Container
        sx={{
          display:"flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap:"2rem",
        }}
      >
      {filme &&(
        filme.map((Filme, index) => (
          <Filmes
            imagem={Filme.imagem} 
            titulo={Filme.titulo} 
            descricao={Filme.descricao}
            categoria={Filme.categoria}
            ano={Filme.ano}
            duracao={Filme.duracao}
          />
         ))
      )}
      </Container>
    </>
  );
}
export default App