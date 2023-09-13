import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from "./Cadastro"
import Filme from "./Filme"
import EditaFilme from './EditaFilme';

const theme = createTheme({
  palette: {
      mode: 'light',
      primary: {
        main: '#49536b',
      },
      secondary: {
        main: '#ff0004',
      },
      background: {
        default: '#d1dcf7',
        paper: '#B1BFE6',
      },
      error: {
        main: '#b71c1c',
        light: '#d50000',
        dark: '#d50000',
        contrastText: '#a22121',
      },
      warning: {
        main: '#bb5200',
      },
  }
})

 const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>
  },
  { 
    path: "/login", 
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/filme",
    element: <Filme/>
  },
  {
    path: "/editarfilme/:id",
    element: <EditaFilme/>
  }
 ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
  </ThemeProvider>
);