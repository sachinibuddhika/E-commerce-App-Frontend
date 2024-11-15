import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // <-- Import useDispatch
import SearchBar from "../components/SearchBar";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/actions/productsActions";

function MainPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    // Dispatch the delete product action
    dispatch(deleteProduct(id));
  };

  const handleFavorite = (product) => {
    // Add to favorites logic here
    console.log("Added to favorites", product);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          alignItems: "center",
          position: "relative",
          left: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SearchBar />
          <Link to="/addProduct" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#001EB9",
                color: "white",
                padding: "10px 50px",
                marginRight: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              New Product
            </Button>
          </Link>
        </div>

        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderColor: "#001EB9",
              color: "#001EB9",
              padding: "10px 15px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
            }}
          >
            <img
              src="src/assets/starred.svg"
              alt="Star Icon"
              style={{
                width: "28px",
                height: "28px",
              }}
            />
          </Button>
        </Link>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          marginTop: "50px",
          width: 1300,
          marginLeft: "15px",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "separate",
            borderSpacing: "0 10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    textTransform: "uppercase",
                    color: "#001EB9",
                    fontWeight: "bold",
                    padding: "0px 10px",
                    fontSize: "16px",
                  }}
                >
                  SKU
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {" "}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    textTransform: "uppercase",
                    color: "#001EB9",
                    fontWeight: "bold",
                    padding: "0px  80px 0px 114px",
                    fontSize: "16px",
                  }}
                >
                  Image{" "}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {" "}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    textTransform: "uppercase",
                    color: "#001EB9",
                    fontWeight: "bold",
                    padding: "0px 60px",
                    fontSize: "16px",
                  }}
                >
                  Product Name{" "}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {" "}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    textTransform: "uppercase",
                    color: "#001EB9",
                    fontWeight: "bold",
                    padding: "0px 60px",
                    fontSize: "16px",
                  }}
                >
                  Price{" "}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell
                  sx={{
                    padding: "15px 40px 15px 25px",
                    fontSize: "16px",
                  }}
                >
                  {product.sku}
                </TableCell>

                <TableCell>
                  <img
                    src={`http://localhost:4000/uploads/${
                      product.thumbnail
                        ? product.thumbnail.replace(/\\/g, "/")
                        : ""
                    }`}
                    style={{
                      width: "50px",
                      height: "auto",
                      borderRadius: "5px",
                      padding: "0",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "15px  60px 15px 80px",
                    fontSize: "16px",
                  }}
                >
                  {product.productName}
                </TableCell>

                <TableCell
                  sx={{ padding: "15px 40px 15px 80px", fontSize: "16px" }}
                >
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ marginRight: 1, marginLeft: 10 }}
                    onClick={() => handleDelete(product._id)}
                    color="error"
                  >
                    <img
                      src="src/assets/delete-icon.svg"
                      alt="Star Icon"
                      style={{
                        height: "25px",
                        width: "auto",
                      }}
                    />
                  </Button>
                  <Link
                    to={`/editProduct/${product.sku}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      color="primary"
                      sx={{
                        padding: 0,
                        marginRight: 1,
                        minWidth: "auto",
                      }}
                    >
                      <img
                        src="src/assets/edit-icon.svg"
                        alt="Star Icon"
                        style={{
                          height: "25px",
                          width: "auto",
                        }}
                      />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleFavorite(product)}
                    color="default"
                    sx={{ marginRight: 1 }}
                  >
                    <img
                      src="src/assets/star.svg"
                      alt="Star Icon"
                      style={{
                        height: "25px",
                        width: "auto",
                      }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MainPage;
