import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Input,
  Box,
  TextareaAutosize,
  Link,
} from "@mui/material";

function AddProductPage() {
  const [formData, setFormData] = useState({
    sku: "",
    quantity: "",
    productName: "",
    productDescription: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...files],
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Satoshi, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    SKU
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    sx={{
                      marginBottom: "10px",
                      backgroundColor: "#F7F7F7",
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "#F7F7F7",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  QTY
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  type="number"
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "#F7F7F7",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              Product Description
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#969191", marginTop: "5px" }}
            >
              A small description about the product
            </Typography>
            <TextareaAutosize
              minRows={4}
              style={{
                marginTop: "10px",
                width: "100%",
                borderRadius: "4px",
                fontFamily: "Satoshi, sans-serif",
                backgroundColor: "#F7F7F7",
                border: "none",
                outline: "none",
              }}
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Product Images
                </Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: "bold",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                    sx={{
                      textDecoration: "underline",
                      color: "#001EB9",
                      fontWeight: "bold",
                    }}
                  >
                    Add Images
                  </Link>
                </Typography>
              </Grid>
            </Grid>

            <Input
              id="image-upload"
              accept="image/*"
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              sx={{ display: "none" }}
            />

            <Box mt={2}>
              {formData.images && formData.images.length > 0 && (
                <div>
                  <Typography variant="body2">Selected Images:</Typography>
                  <ul>
                    {Array.from(formData.images).map((image, index) => (
                      <li key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Box>

            <Grid xs={12} sm={3}>
              <Typography
                variant="caption"
                sx={{ color: "#969191", marginTop: "5px" }}
              >
                JPEG,PNG,SVG,or GIF (Maximum file size 50MB)
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ padding: "10px 20px" }}
            >
              Add Product
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}

export default AddProductPage;
