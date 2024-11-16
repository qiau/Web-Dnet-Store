import React from "react";
import { Box, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users");
      const userExists = response.data.some(
        (user) => user.username === username
      );

      if (userExists) {
        setError("Username sudah terdaftar!");
      } else {
        const newUser = { username, password };
        await axios.post("http://localhost:3000/users", newUser);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error checking user:", err);
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
              mt: "5.5rem",
              textAlign: "center",
            }}
          >
            The Quality Internet
            <br />
            Service Provider
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
            Register
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
            Hai, Selamat bergabung di platform kami!
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
            onClick={handleRegister}
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
            Daftar
          </Button>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              fontSize: "1rem",
              paddingY: "1rem",
            }}
          >
            Sudah punya akun? Silahkan{" "}
            <Link
              href="/login"
              underline="hover"
              sx={{ fontWeight: "600", color: "#0D68F5" }}
            >
              masuk!
            </Link>
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default RegisterPage;
