const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

module.exports = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "mini-be-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const filename = path.basename(file.originalname).trim();
      let newFilename = "";
      for (let value of filename) {
        if (value == "" || value === "_") {
          value = "-";
        }
        newFilename += value;
      }
      cb(null, `upload/${Date.now()}-${newFilename}`);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});
