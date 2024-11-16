import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { History } from "@mui/icons-material";

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLoggedIn, user, logout } = useUserContext();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/images/dnet-logo.svg"
            alt="logo dnet"
            sx={{
              width: "100px",
              height: "auto",
              display: "flex",
              paddingRight: "12px",
              paddingBottom: "4px",
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Riwayat Pesanan">
                <Link to="/orderhistory">
                  <IconButton sx={{ mr: 4 }}>
                    <History sx={{ fontSize: 38 }} />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Pengaturan">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ fontSize: 36 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }} onClick={logout}>
                    Keluar
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
