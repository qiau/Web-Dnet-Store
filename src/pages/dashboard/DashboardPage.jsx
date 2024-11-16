import { Container, Grid2 } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/ui/ProductCard";

function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: "5rem", bgcolor: "#FFFFFF" }}>
      <Header />
      <Grid2 container justifyContent="center">
        <Grid2>
          <ProductCard />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default DashboardPage;
