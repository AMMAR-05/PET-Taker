import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, CircularProgress, createTheme } from "@mui/material";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { AuthContext } from "../../shared/Context/authContext";

// Copy right
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      paddingTop={3}
      height="3.7rem"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">Pet Taker</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// User Schema
const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2)
    .max(20)
    .trim()
    .lowercase()
    .required(true, "please provide your first name"),
  lastName: yup
    .string()
    .min(2)
    .max(20)
    .trim()
    .lowercase()
    .required(true, "please provide your last name"),
  userName: yup
    .string()
    .min(2)
    .max(20)
    .trim()
    .lowercase()
    .required(true, "please provide your user name"),
  email: yup
    .string()
    .email("Invalid email format")
    .min(2)
    .max(50)
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
  // passwordConfirm: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Signup() {
  const [succeed, setSucceed] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const auth = useContext(AuthContext);

  // user navigate
  let navigate = useNavigate();

  // React hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  ////////// File Uplaod //////////
  const [image, setImage] = useState(null);

  // onSelectFilesHandler
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  //  onRemoveFilesHandler
  const onRemoveFile = (e) => {
    setImage(null);
  };

  // Send data to sign up a user
  const onSubmit = async (userData) => {
    // turn on loading spinner
    setIsloading(true);

    try {
      const finalUser = { ...userData, image };
      console.log(finalUser, "1");

      const formData = new FormData();
      formData.append("firstName", finalUser.firstName);
      formData.append("lastName", finalUser.lastName);
      formData.append("userName", finalUser.userName);
      formData.append("email", finalUser.email);
      formData.append("password", finalUser.password);
      formData.append("image", finalUser.image);

      console.log(formData, "2");
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
        method: "POST",
        body: formData,
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

      console.log(result, "result");
      // turn success alert
      setSucceed(true);

      // turn off success alert and redirect to home page
      setTimeout(() => {
        setSucceed(false);
        return navigate("/");
      }, 2000);

      // turn off loading spinner
      setIsloading(false);

      // Continue This
      // set user image
      auth.signup(result.image);
      // extract user id on signup
      auth.login(result._id, data.token, result.userName);
    } catch (err) {
      // turn off loading spinner
      setIsloading(false);
      // Show error message
      setError(err.message);
    }
    // reset form inputs
    reset();
  };

  // Them Provider
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    ThemeProvider: {
      backgroundColor: "#f4f4f4",
    },
  });

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
            Loading
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
            register went successfully
          </Typography>
        </Backdrop>
      )}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 5.1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box
              component="form"
              autoComplete="off"
              // noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("firstName")}
                  />
                  <Typography variant="span" color="crimson">
                    {errors.firstName?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    // name="lastName"
                    {...register("lastName")}
                  />
                  <Typography variant="span" color="crimson">
                    {errors.lastName?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    // name="UserName"
                    {...register("userName")}
                  />
                  <Typography variant="span" color="crimson">
                    {errors.userName?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    // name="email"
                    {...register("email")}
                  />
                  <Typography variant="span" color="crimson">
                    {errors.email?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    // name="password"
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password")}
                  />
                  <Typography variant="span" color="crimson">
                    {errors.password?.message}
                  </Typography>
                </Grid>

                {/* ********************** image Upload ************************ */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mr: "9.2rem" }}
                  >
                    Upload Image
                    <input
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg"
                      name="image"
                      id="image"
                      label="image"
                      type="file"
                      onChange={onSelectFile}
                    />
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    component="span"
                    onClick={onRemoveFile}
                    sx={{}}
                  >
                    Remove
                  </Button>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    overflow: "hidden",
                    fontSize: "16px",
                    background:
                      "linear-gradient(45deg, #30292F 40%, #3F4045 90%)",
                    fontWeight: "700",
                    ":hover": {
                      background:
                        "linear-gradient(45deg, #3F4045  40%, #30292F  90%)",
                    },
                    marginY: "1rem",
                    marginLeft: "1rem",
                  }}
                >
                  Sign Up
                </Button>
              </Grid>

              {/* error */}
              {error && (
                <Typography
                  variant="span"
                  sx={{ color: "red", textAlign: "center", mb: "1rem" }}
                >
                  {error}
                </Typography>
              )}

              {/* already have an account */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    <Typography sx={{ color: "#3c52b2", mt: "1rem" }}>
                      Already have an account? Login
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Copyright */}
          <Copyright sx={{}} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Signup;
