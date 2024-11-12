import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div style={{ padding: "30px" }}>
      <Box sx={{ marginBottom: "20px" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/addProduct" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#001EB9",
              color: "white",
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            New Product
          </Button>
        </Link>

        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderColor: "#001EB9",
              color: "#001EB9",
              padding: "5px 10px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
            }}
          >
            <img
              src="src/assets/star.svg"
              alt="Star Icon"
              style={{
                width: "16px",
                height: "16px",
              }}
            />
          </Button>
        </Link>
      </Box>

      <h1>Main Page</h1>
    </div>
  );
}

export default MainPage;
