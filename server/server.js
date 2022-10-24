const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app.js");

if (process.env.NODE_ENV === "development") {
  console.log("development environment");
  process.env.CLOUDINARY_IMAGE_STORAGE_OFFER = "pets_offer_imgs";
  process.env.CLOUDINARY_IMAGE_STORAGE_USER = "pets_user_imgs";
} else {
  console.log("production environment");
  process.env.CLOUDINARY_IMAGE_STORAGE_OFFER = "Pet_Taker_Offer_Img";
  process.env.CLOUDINARY_IMAGE_STORAGE_USER = "Pet_Taker_User_Img";
}

let DB;
// // connect to Database
if (process.env.NODE_ENV === "development") {
  DB = process.env.DATABASE;
} else {
  DB = process.env.DATABASE_PROD;
}
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("connection successful");
  });

// setting port
const port = process.env.PORT || 5000;

// CListen to server
app.listen(port, () => {
  console.log(`live on port ${port}`);
});
