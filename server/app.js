const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

// Imported Routes
const offersRoute = require("./routes/offersRoutes");
const UsersRoute = require("./routes/usersRoutes");
const LoginRoute = require("./routes/loginRoute");
const SignupRoute = require("./routes/signupRoute");

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  ),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
  next();
});

// Offer Routes
app.use("/api/v1/offers", offersRoute);
app.use("/api/v1/offers/:id", offersRoute);
app.use("/api/v1/offers/user/:id", offersRoute);
app.use("/api/v1/offers/useroffers/:creatorId", offersRoute);

// User Routes
app.use("/api/v1/users", UsersRoute);
app.use("/api/v1/users/:id", UsersRoute);

// Auth Routes
app.use("/api/v1/signup", SignupRoute);
app.use("/api/v1/login", LoginRoute);

// Default Error Middelware
app.use((error, req, res, next) => {
  if (res.headerSent) {
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occurred",
  });
});

// Unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: "Page not found",
  });
});

module.exports = app;
