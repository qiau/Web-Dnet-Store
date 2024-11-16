import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { getProducts } from "../../api/api";
import axios from "axios";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user ? user.id : null);

    const fetchProductDetail = async () => {
      const products = await getProducts();
      const productDetail = products
        .flatMap((category) => category.items)
        .find((item) => item.id === parseInt(productId));
      setProduct(productDetail);
    };

    fetchProductDetail();
  }, [productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    try {
      const newItem = {
        productId: product.id,
        quantity,
      };

      const response = await axios.get("http://localhost:3000/cart");
      const userCart = response.data.find((cart) => cart.userId === userId);

      if (userCart) {
        const updatedItems = userCart.items.map((item) => {
          if (item.productId === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });

        if (!userCart.items.find((item) => item.productId === product.id)) {
          updatedItems.push(newItem);
        }

        await axios.put(`http://localhost:3000/cart/${userCart.id}`, {
          ...userCart,
          items: updatedItems,
        });
      } else {
        await axios.post("http://localhost:3000/cart", {
          userId,
          items: [newItem],
        });
      }

      alert("Produk berhasil dipesan!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <Typography>Loading product...</Typography>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingY: { xs: "1rem", sm: "2rem", lg: "3rem" },
        bgcolor: "#FFFFFF",
      }}
    >
      <Grid2 container spacing={{ xs: 1, lg: 10 }} columns={20}>
        <Grid2 size={{ xs: 20, lg: 9 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1",
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "2rem",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 20, lg: 11 }}>
          <Typography variant="h4" fontWeight={600}>
            {product.name}
          </Typography>
          <Typography py={2} variant="body1">
            {product.description}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {product.speed}
          </Typography>
          <Typography py={2} variant="h5" color="#0D68F5" fontWeight={600}>
            Rp {product.price.toLocaleString("id-ID")}
          </Typography>

          <Box py="1rem" sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={handleDecrement}
              sx={{ height: "40px", borderColor: "#0D68F5" }}
            >
              -
            </Button>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              inputProps={{
                appearance: "none",
                min: 1,
                style: { textAlign: "center", color: "#0D68F5" },
              }}
              variant="outlined"
              size="small"
              sx={{
                width: "60px",
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleIncrement}
              sx={{ height: "40px", borderColor: "#0D68F5" }}
            >
              +
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundcolor: "#0D68F5" }}
            fullWidth
            onClick={handleAddToCart}
          >
            Pesan Sekarang
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ProductDetail;
