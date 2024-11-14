import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  TextField,
  Grid,
  Button,
  Typography,
  Input,
  Box,
  TextareaAutosize,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

function EditProductPage() {
  const { sku } = useParams(); // Get SKU from URL params
  const navigate = useNavigate(); // To navigate after the edit

  const [formData, setFormData] = useState({
    sku: "",
    quantity: "",
    productName: "",
    productDescription: "",
    images: [],
    thumbnail: "",
  });

  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    // Fetch existing product data using the SKU
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/product/sku/${sku}`
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({
            sku: data.sku,
            productName: data.productName,
            quantity: data.quantity,
            productDescription: data.description,
            images: data.images || [],
            thumbnail: data.thumbnail || "",
          });
          setExistingImages(data.images); // Set existing images for display
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [sku]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)],
      }));
    } else if (name === "thumbnail") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.sku ||
      !formData.productName ||
      formData.images.length === 0 ||
      !formData.thumbnail
    ) {
      alert("Please fill all fields and add images!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("sku", formData.sku);
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("description", formData.productDescription);
    formDataToSend.append("thumbnail", formData.thumbnail);

    Array.from(formData.images).forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      // Send a PUT request to update the product
      const response = await fetch(
        `http://localhost:4000/update-product/sku/${sku}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        console.log("Product updated successfully:", data);
        // Redirect back to the product page or the product list
        navigate.push("/");
      } else {
        console.error("Error updating product:", data);
      }
    } catch (err) {
      console.error("Failed to update product:", err);
    }
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
                    disabled
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
                    marginLeft: "25px",
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
                    type="button"
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
                    Add/Update Images
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
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {formData.images.map((image, index) => (
                      <li key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          width={50}
                          height={50}
                        />
                        <RadioGroup
                          value={formData.thumbnail}
                          onChange={handleChange}
                          name="thumbnail"
                        >
                          <FormControlLabel
                            value={image.name}
                            control={<Radio />}
                            label="Set as Thumbnail"
                          />
                        </RadioGroup>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Box>

            <Grid item xs={12} sm={3}>
              <Typography
                variant="caption"
                sx={{ color: "#969191", marginTop: "5px" }}
              >
                JPEG, PNG, SVG, or GIF (Maximum file size 50MB)
              </Typography>
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
                Update Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default EditProductPage;
