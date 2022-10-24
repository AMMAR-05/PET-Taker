import { Backdrop, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// Copy right
function Copyright(props) {
  return (
    <Typography variant="body2" {...props}>
      {"Copyright © "}
      <Link to="/">Pet Taker</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function UnhandledRoutes() {
  return (
    <Backdrop
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: "1",
        color: "#ff4",
        backgroundColor: "#000000be",
      }}
      open={true}
    >
      <Box sx={{ mt: "2rem", fontSize: "4rem" }}>
        Page not found
        <Link to="/">
          <Typography sx={{ fontSize: "1rem", color: "#fff" }}>Home</Typography>
        </Link>
      </Box>
      <Copyright sx={{ fontSize: "1rem", ml: "12rem" }} />
    </Backdrop>
  );
}

export default UnhandledRoutes;
