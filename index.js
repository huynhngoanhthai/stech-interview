const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const authRouter = require('./router/authRouter')
const fileRouter = require('./router/fileRouter')

const Mongo = require('./config/db');
const upload = require('./middlewares/upload')
const catchError = require("./middlewares/catchError");
const catchAsync = require("./utils/catchAsync");
Mongo.connect();
/**
 * @swagger
 * name:book:
 * /api/v1/book:
 *  post:
 */
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use(express.static('public'))
app.use("/api/v1/file",fileRouter)
app.post("/test", upload.single("avatar"),catchAsync(async (req, res) => {
  //upload.array(,2)
  console.log(req.file);
  if (req.file)
    return res.status(200).json({
      success: true,
      message: "Upload successful",
    });


  res.json({
      success: false,
      message: "Upload error",
    });
}));

// console.log(["t","3","5"].push("t"));
app.use(catchError);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
  });