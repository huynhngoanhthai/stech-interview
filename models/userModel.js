const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "Must be at least 3 characters "],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Must be at least 6 character"],
      maxlength: [30, "Must be less than 30 character"],
    },

    
    age: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    file:{
      type:[String]
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    collection: "users",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    next();
  }
  next();
});


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
