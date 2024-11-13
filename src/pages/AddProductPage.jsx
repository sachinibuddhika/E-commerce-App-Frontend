import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions/productsActions";
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

function AddProductPage() {
  const dispatch = useDispatch(); // Accessing the dispatch function for Redux

  // State to hold form input data
  const [formData, setFormData] = useState({
    sku: "",
    quantity: "",
    productName: "",
    productDescription: "",
    images: [],
    thumbnail: "", // Track the selected thumbnail image
  });

  // Handles changes to input fields
  const handleChange = (e) => {
    const { name, value, files } = e.target; // Destructuring the target properties
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)], // Updating the images array
      }));
    } else if (name === "thumbnail") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Updating the corresponding form field
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form data is valid
    if (
      !formData.sku ||
      !formData.productName ||
      formData.images.length === 0 ||
      !formData.thumbnail
    ) {
      alert("Please fill all fields and add images!");
      return;
    }

    // Create a FormData object to send both text fields and image files
    const formDataToSend = new FormData();
    formDataToSend.append("sku", formData.sku);
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("description", formData.productDescription);
    formDataToSend.append("thumbnail", formData.thumbnail);

    // Append images as FormData
    Array.from(formData.images).forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      // Make the API call to add the product
      const response = await fetch("http://localhost:4000/add-product", {
        method: "POST",
        body: formDataToSend, // Send FormData to backend
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        console.log("Product added successfully:", data);
        console.log("form data:", formData);
        // Optionally, dispatch to Redux or navigate
      } else {
        console.error("Error adding product:", data);
      }
    } catch (err) {
      console.error("Failed to add product:", err);
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
