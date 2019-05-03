const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

const uploadFilePath = "./clientUploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFilePath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now().toString()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  }
});

module.exports = upload = multer({ storage });
