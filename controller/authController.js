const catchAsync = require('../utils/catchAsync')
const Users = require('../models/userModel')
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ApiError = require("../utils/apiError")
const { sign } = require("jsonwebtoken");
exports.register = catchAsync(async(req,res) => {
    const { name, email, age, password } = req.body; 
    const user = await Users.create({
        name,
        email,
        age,
        password,
      });
    
      res.json({
        success: true,
        data: user,
      });

})
exports.login =catchAsync(async(req,res) => {
  const { email, password } = req.body;
  const existedUser = await Users.findOne({ email });
  if (!existedUser) {
    // logger.error(new Error("email or password wrong"));
    throw new ApiError(403, "email or password wrong");
  }
  const isMatch = bcrypt.compareSync(password, existedUser.password);
  if (!isMatch) {
    // logger.error(new Error("email or password wrong"));
    throw new ApiError(403, "email or password wrong");
  } else {
    // req.user = existedUser;
    const token = sign(
      {
        email: existedUser.email,
        password: existedUser.password, //password hashed
        name: existedUser.name,
        // role: existedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      success: true,
      token: token,
      user: req.user,
    });
    // logger.info("Successfully");
  }

})