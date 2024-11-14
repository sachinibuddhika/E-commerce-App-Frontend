import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Input,
  Radio,
  Link,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productsActions"; // Your existing fetchProducts action
import { PhotoCamera } from "@mui/icons-material"; // Icon for the file input

function EditProductPage() {
  const { sku } = useParams(); // Get SKU from URL params
  const dispatch = useDispatch(); // Hook to dispatch actions
  const products = useSelector((state) => state.products.products); // Get products from the Redux store
  const [productData, setProductData] = useState({
    sku: "",
    productName: "",
    quantity: "",
    description: "",
    price: 29.99, // Default price (fallback in case there's no price)
    images: [],
    thumbnail: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch products from Redux if they are not already loaded
  useEffect(() => {
    console.log("Products:", products);
    console.log("SKU:", sku);
    if (products.length === 0) {
      dispatch(fetchProducts()); // Dispatch the action to fetch products
    }
  }, [dispatch, products.length]);

  // Find the product based on SKU after products are fetched
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((prod) => prod.sku === sku);
      if (product) {
        setProductData({
          sku: product.sku,
          productName: product.productName,
          quantity: product.quantity,
          description: product.description,
          price: product.price || 29.99, // Use the fetched price or default to 29.99
          images: product.images || [],

          thumbnail: product.thumbnail || "",
        });
        setLoading(false); // Set loading to false once data is fetched
      } else {
        setLoading(false); // Product not found
      }
    }
  }, [products, sku]);

  //Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Update the state with the new images (they will be appended later in handleSubmit)
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files], // Add new files to the images array
    }));
  };

  const handleRemoveImage = (imageUrl) => {
    setProductData({
      ...productData,
      images: productData.images.filter((img) => img !== imageUrl),
    });
  };

  const handleThumbnailChange = (e) => {
    const selectedImage = e.target.value;
    setProductData({
      ...productData,
      thumbnail: selectedImage, // Set the selected image as the thumbnail
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append updated fields to the form data
    formData.append("productName", productData.productName);
    formData.append("quantity", productData.quantity);
    formData.append("description", productData.description);

    // Append images (if any new images are selected)
    productData.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image); // Add new file image to FormData
      } else {
        formData.append("images", image); // Add existing image (if it's a path)
      }
    });

    // If a new thumbnail image is selected, append it to the FormData
    if (productData.thumbnail && productData.thumbnail instanceof File) {
      formData.append("thumbnail", productData.thumbnail);
    } else if (
      productData.thumbnail &&
      typeof productData.thumbnail === "string"
    ) {
      // If the thumbnail is a string (path), send it as-is to keep the old thumbnail
      formData.append("thumbnail", productData.thumbnail);
    } else {
      // If no thumbnail is selected, send an empty string to retain the existing thumbnail
      formData.append("thumbnail", ""); // Empty string to signal "no change"
    }

    try {
      const response = await fetch(
        `http://localhost:4000/update-product/sku/${sku}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Handle success (e.g. redirect or show success message)
        console.log("Product updated successfully:", result);
      } else {
        // Handle error (e.g. show an error message)
        console.error("Failed to update product:", result);
      }
    } catch (error) {
      console.error("Error submitting the update:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching product data
  }

  if (!productData.sku) {
    return <div>Product not found</div>; // Show error if product is not found
  }

  return (
    <div>
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
                      value={productData.sku}
                      onChange={handleChange}
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
                    value={productData.productName}
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
                    type="number"
                    value={productData.quantity}
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

            {/* Product Description */}
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
                name="description"
                value={productData.description}
                onChange={handleChange}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "4px",
                  fontFamily: "Satoshi, sans-serif",
                  backgroundColor: "#F7F7F7",
                  border: "none",
                  outline: "none",
                }}
              />
            </Grid>

            {/* Price */}
            {/* <Grid item xs={12}>
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
                    Price
                  </Typography>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="price"
                      value={productData.price}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}

            {/* Images */}
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
                  {/* <Input
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    inputProps={{
                      multiple: true,
                    }}
                  /> */}
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
                      Edit Images
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
            </Grid>

            {/* Display Images */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {productData.images.map((imageUrl, index) => {
                  const fullImageUrl =
                    typeof imageUrl === "string"
                      ? `http://localhost:4000/uploads/${imageUrl}`
                      : URL.createObjectURL(imageUrl);
                  {
                    /* {Array.isArray(productData.images) &&
                  productData.images.map((imageUrl, index) => {
                    const fullImageUrl =
                      typeof imageUrl === "string"
                        ? `http://localhost:4000/uploads/${imageUrl}`
                        : URL.createObjectURL(imageUrl); */
                  }
                  return (
                    <Box
                      key={index}
                      sx={{ position: "relative", width: "100px" }}
                    >
                      <img
                        src={fullImageUrl}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "rgba(255, 255, 255, 0.7)",
                        }}
                        onClick={() => handleRemoveImage(imageUrl)}
                      >
                        <PhotoCamera />
                      </IconButton>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={productData.thumbnail === imageUrl}
                            onChange={handleThumbnailChange}
                            value={imageUrl}
                          />
                        }
                        label="Set as Thumbnail"
                      />
                    </Box>
                  );
                })}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default EditProductPage;
