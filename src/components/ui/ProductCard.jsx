import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { getProducts } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      {products && products.length > 0 ? (
        products.map((category) => (
          <div key={category.id}>
            <Typography variant="h6">{category.type}</Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {category.items.map((product) => (
                <Card key={product.id} sx={{ maxWidth: 300, margin: 1 }}>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="400"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {product.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {product.speed}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          Rp {product.price.toLocaleString("id-ID")}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductCard;
