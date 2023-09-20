import { Avatar, Button, Container, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Filmes from "./components/Filme";
import MenuResponsivoo from "./components/MenuResponsivoo";
import  "./components/css/cssDoAPp.module.css"


function App(){
  const[estrela, setEstrela] = useState("");
  const [filme, setFilme] = useState();
  const [erro, setErro] = useState(); 
  
  useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    fetch(process.env.REACT_APP_BACKEND + "produtos/" + usuario, {
      method: "GET", 
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then((resposta) => resposta.json())
    .then((json) => { setFilme ( json)  } )
    .catch( (erro) => {setErro(true)} )
  }, [])
  function Excluir( evento, id ){
    fetch(process.env.REACT_APP_BACKEND + "produtos", {
      method: "DELETE", 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
              id: id,
              usuario: localStorage.getItem("usuario")
          }
      )
  })
  .then((resposta) => resposta.json())
  .then((json) => {
    const novalista = filme.filter((filme) => filme._id !== id);
    setFilme(novalista);
  })
  .catch( (erro) => {setErro(true)} )
  evento.preventDefault()
  }
  return (
    <>
      <MenuResponsivoo/>
      <h1>Casas</h1>
      <Container
        sx={{
          display:"flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap:"2rem",
          backgroundColor:"#f5ecdc",
        }}
      >
      {filme &&(
        filme.map((Filme, index) => (
          <Filmes
            imagem={Filme.imagem} 
            titulo={Filme.titulo} 
            descricao={Filme.descricao}
            estrela= {<Rating name="read-only" value={Filme.categoria} readOnly />}
            ano={Filme.ano}
            duracao={Filme.duracao}
            escluir={ (e) => Excluir( e, Filme._id ) }
            id={Filme._id}
          />
         ))
      )}
      </Container>
    </>
  );
}
export default App