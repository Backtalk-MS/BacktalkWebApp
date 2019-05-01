const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./clientUploads");
  }
});
