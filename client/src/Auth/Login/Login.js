import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress, createTheme } from "@mui/material";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../shared/Context/authContext";

// Styling
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

// Copyright
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">Pet Taker</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// login Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .min(2)
    .max(200)
    .trim()
    .lowercase()
    .required(true, "please provide your user name"),
  password: yup
    .string()
    .min(8)
    .max(150)
    .trim()
    .lowercase()
    .required(true, "please provide your a password"),
});

function Login(props) {
  const [succeed, setSucceed] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  // use navigate
  let navigate = useNavigate();

  const auth = useContext(AuthContext);

  // React hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // submit login
  const omSubmit = async (userData) => {
    // turn on loading spinner
    setIsloading(true);

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // get response from backend
      const data = await res.json();
      // if there is a 400 or 500 error code throw an error
      if (!res.ok) {
        throw new Error(data.message);
      }

      // if there is no errors
      // Extract retrived data
      const result = data.data.user;

      // turn success alert
      setSucceed(true);

      // turn off success alert and redirect to home page
      setTimeout(() => {
        setSucceed(false);
        return navigate("/");
      }, 2000);

      // turn off loading spinner
      setIsloading(false);
      auth.signup(result.image);
      // extract user id on login
      auth.login(result._id, data.token, result.userName);
    } catch (err) {
      // Show error message
      setError(err.message);

      // turn off loading spinner
      setIsloading(false);
    }
    // reset form inputs
    reset();
  };

  return (
    <>
      {/* Loading spinner */}
      {isLoading && (
        <Backdrop
          sx={{
            backgroundColor: "#000000be",
            color: "#ff4",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          open={true}
        >
          {/* loading icon */}
          <CircularProgress color="inherit" />

          <Typography sx={{ mt: "2rem", fontSize: "1.5rem" }}>
            Lodaing
          </Typography>
        </Backdrop>
      )}
      {/* success alert */}
      {succeed && (
        <Backdrop
          sx={{
            backgroundColor: "#000000be",
            color: "#00e676",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          open={true}
        >
          <DoneOutlineRoundedIcon sx={{ fontSize: "5rem" }} />
          <Typography sx={{ mt: "2rem", fontSize: "1.5rem" }}>
            loging in went successfully
          </Typography>
        </Backdrop>
      )}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 17.9,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(omSubmit)}
              autoComplete="off"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <Typography variant="span" color="crimson">
                {errors.email?.message}
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <Typography variant="span" color="crimson">
                {errors.password?.message}
              </Typography>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontSize: "16px",
                  background:
                    "linear-gradient(45deg, #30292F 40%, #3F4045 90%)",
                  fontWeight: "700",
                  ":hover": {
                    background:
                      "linear-gradient(45deg, #3F4045  40%, #30292F  90%)",
                  },
                  marginY: "1rem",
                }}
              >
                Login
              </Button>
              {error && (
                <Typography
                  variant="h6"
                  sx={{ paddingY: "1rem", color: "red", textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    <Typography sx={{ color: "#3c52b2", fontSize: "smaller" }}>
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    <Typography sx={{ color: "#3c52b2", fontSize: "smaller" }}>
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
