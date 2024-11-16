import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setOrderHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart history", error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const getProductById = (productId) => {
    return products
      .flatMap((category) => category.items)
      .find((product) => product.id === productId);
  };

  return (
    <Container sx={{ paddingY: "2rem" }}>
      <Typography variant="h4" mb={6} gutterBottom>
        History Belanja
      </Typography>
      {orderHistory.length === 0 ? (
        <Typography variant="body1">History Anda Kosong!</Typography>
      ) : (
        orderHistory.map((cart) => (
          <Box key={cart.id} sx={{ marginBottom: "2rem" }}>
            <Box>
              {cart.items.map((item, index) => {
                const product = getProductById(item.productId);
                return product ? (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "1rem",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "1rem",
                        objectPosition: "top",
                      }}
                    />
                    <Box>
                      <Typography variant="body1">{product.name}</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                      <Typography variant="body2">
                        Price: Rp {product.price}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                ) : null;
              })}
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
}

export default OrderHistory;
