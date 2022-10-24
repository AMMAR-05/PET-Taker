const multer = require("multer");
const uuid = require("uuid").v4;

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
      const { originalname } = file;
      // console.log(originalname, "ori");
      cb(null, `${uuid()}-${originalname}`);
    },

    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true);
      } else {
        // prevent upload
        cb({ message: "file format is unsupported" }, false);
      }
    },
  }),
});

module.exports = fileUpload;
