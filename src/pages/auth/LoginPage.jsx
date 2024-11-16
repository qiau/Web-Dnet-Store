import React from "react";
import { Box, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan password wajib diisi!");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        login(user);
        navigate("/");
      } else {
        setError("Username atau password salah!");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Username belum terdaftar!");
    }
  };
  return (
    <Grid2 container columns={2} sx={{ height: "100vh" }}>
      <Grid2 size={{ xs: 0, lg: 1 }}>
        <Box
          sx={{
            height: "100%",
            backgroundImage: "url(/images/bg-auth.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: "2.5rem",
              color: "#253D7A",
              m: "5.5rem 10rem",
              textAlign: "center",
            }}
          >
            The Quality Internet Service Provider
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 2, lg: 1 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingX={{ xs: "2rem" }}
      >
        <Box sx={{ width: "490px" }}>
          <Box
            component="img"
            src="/images/dnet-logo.svg"
            alt="logo dnet"
            sx={{
              width: "140px",
              height: "auto",
              marginLeft: "-8px",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: "2rem",
              color: "#191D20",
              paddingTop: "0.8rem",
            }}
          >
            Login
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              fontSize: "1rem",
              paddingY: "1rem",
              color: "#191D20",
            }}
          >
            Selamat datang kembali!
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#0D68F5",
              "&:hover": {
                backgroundColor: "#0B5BD6",
              },

              height: "3rem",
              marginTop: "1rem",
            }}
            fullWidth
          >
            Masuk
          </Button>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              fontSize: "1rem",
              paddingY: "1rem",
            }}
          >
            Belum punya akun? Coba{" "}
            <Link
              href="/register"
              underline="hover"
              sx={{ fontWeight: "600", color: "#0D68F5" }}
            >
              daftar!
            </Link>
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default LoginPage;
