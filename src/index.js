import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from "./Cadastro"
import Filme from "./Filme"
import EditaFilme from './EditaCasa';
import CadastroCasa from './CadastroCasa';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#393939',
    },
    background: {
      default: '#f5ecdc',
      paper: '#d9d9d9',
    },
    divider: '#f5ecdc',
  },
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
  },
  {
    path: "/CasdastroCasa",
    element: <CadastroCasa/>
  }
 ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
  </ThemeProvider>
);