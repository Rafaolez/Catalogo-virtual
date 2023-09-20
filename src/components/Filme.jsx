import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';

function Filme(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={props.imagem}
                alt={props.titulo}
            />
            
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.descricao}
                </Typography>
                <Grid container>
                    <Grid item xs={10 }>
                        <span>{props.estrela}</span>
                    </Grid>
                    <Grid item xs={5}>
                        <span>{props.ano}</span>
                    </Grid>
                    <Grid item xs={4}>
                        <span>{props.duracao}</span>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
        <Grid item >
            <DeleteForeverIcon onClick={props.escluir} />
            <Link href={"editarfilme/" + props.id} ><CreateIcon/></Link>
        </Grid>
    </Card>
  )
}

export default Filme