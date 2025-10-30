import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0f0f0fff 60%, #202221ff 100%)", // Vert LoL dégradé
        boxShadow: "0 2px 12px rgba(233, 215, 157, 0.77)",
        top: 0,
        left: 0,
        zIndex: 100,
        margin: 0,
        padding: 0,
      }}
      elevation={4}
    >
      <Toolbar
        sx={{
          minHeight: "64px",
          px: { xs: 1, sm: 3 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 20,
            color: "#e9e6c3", // Or pâle contrasté LoL
            textTransform: "none",
            mr: 2,
            display: { xs: "none", md: "inline-flex" },
          }}>
            LolAPP
          </Typography>
        </Box>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 20,
              color: "#e9e6c3", // Or pâle contrasté LoL
              textTransform: "none",
              mr: 2,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Accueil
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/champions"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 20,
              color: "#e9e6c3", // Or pâle contrasté LoL
              textTransform: "none",
              mr: 2,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Champions
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/regions"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 20,
              color: "#e9e6c3", // Or pâle contrasté LoL
              textTransform: "none",
              mr: 2,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Régions
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/regions"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 20,
              color: "#e9e6c3", // Or pâle contrasté LoL
              textTransform: "none",
              mr: 2,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Objets
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/regions"
            sx={{
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 20,
              color: "#e9e6c3", // Or pâle contrasté LoL
              textTransform: "none",
              mr: 2,
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            Runes & Sorts
          </Button>
        </Box>
        <Box>
          <Typography sx={{
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 20,
            color: "#e9e6c3", // Or pâle contrasté LoL
            textTransform: "none",
            mr: 2,
            display: { xs: "none", md: "inline-flex" },
            cursor: "pointer",
          }} onClick={() => window.location = 'mailto:toto@tata.com'}>
            Contact
          </Typography>
        </Box>

        {/* Mobile menu toggle */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            Accueil
          </MenuItem>
          <MenuItem component={Link} to="/champions" onClick={handleMenuClose}>
            Champions
          </MenuItem>
          <MenuItem component={Link} to="/regions" onClick={handleMenuClose}>
            Régions
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
