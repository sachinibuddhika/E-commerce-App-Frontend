import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function AppBarComponent() {
  return (
    <MuiAppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.0)",
        border: "none",
      }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }}></div>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Satoshi, sans-serif",
              marginRight: 1,
              color: "#000",
              fontWeight: "bold",
            }}
          >
            ADMIN
          </Typography>

          <ArrowDropDownIcon
            sx={{
              lineHeight: 1,
              marginRight: 3,
              fontSize: 28,
              verticalAlign: "top",
              color: "#000",
            }}
          />
          <img
            src="src/assets/userIcon.png"
            alt="User"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              marginRight: "75px",
            }}
          />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBarComponent;
