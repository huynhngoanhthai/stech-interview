const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/apiError");


// path file upload
//name file uploaded
const fileFilter = (req, file, cb) => {
  //checks extension before upload
  const allowExtension = [".jbg", ".png", ".gif", ".jpeg",".jpg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtension.join("|")})$`, "i");

  if (regex.test(fileExtension)) cb(null, true);
  else cb(new ApiError(400,"it isn't image"), false);

// cb(null,true)
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(path.join(__dirname, "/public/").path);
    cb(null, path.join(__dirname, "../public"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage, fileFilter,limits:{
  fileSize: 10 * 1024 * 1024 
}});
module.exports = upload;
