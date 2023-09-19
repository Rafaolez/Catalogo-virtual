import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Button, Tooltip, Avatar  } from "@mui/material"
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Casateste', 'casateste2', 'casatest4'];
const settings = ['Perfil', 'test', 'test6', 'test2'];


function MenuResponsivoo() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

  return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                >
                    Logo
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                       size="large"
                       aria-label="account of current user"
                       aria-controls="menu-appbar"
                       aria-haspopup="true"
                       onClick={handleOpenNavMenu}
                       color="inherit" 
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/login" style={{ textDecoration: ' none', color: ' white' }}>Teste1</a></Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/login" style={{ textDecoration: ' none', color: ' white' }}>Teste2</a></Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/login" style={{ textDecoration: ' none', color: ' white' }}>Teste3</a></Typography>
                </MenuItem>
            
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <a href="http://localhost:3000/login" style={{ textDecoration: ' none', color: ' white' }}>Teste1</a>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <a href="http://localhost:3000/cadastro" style={{ textDecoration: ' none', color: ' white' }}>Teste2</a>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <a href="http://localhost:3000/filme" style={{ textDecoration: ' none', color: ' white' }}>Teste3</a>
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/filme" style={{ textDecoration: ' none', color: ' white' }}>Perfil</a></Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/filme" style={{ textDecoration: ' none', color: ' white' }}>Adicionar novo local</a></Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href="http://localhost:3000/filme" style={{ textDecoration: ' none', color: ' white' }}>Sair</a></Typography>
                </MenuItem>
  
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MenuResponsivoo