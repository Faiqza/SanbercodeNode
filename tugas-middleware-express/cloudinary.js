const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dsjwhfmon",
  api_key: "592628252498899",
  api_secret: "",
});

module.exports = cloudinary;