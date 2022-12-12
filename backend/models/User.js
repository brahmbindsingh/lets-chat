const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    minLength: [5, "name cannot be less than 5 characters"],
    maxLength: [30, "name cannot be more than 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"]
  },
  role: {
    type: String,
    default: "user",
  }
},
{
  timestamps: true
}
);


const User = mongoose.model("Users", userSchema);
module.exports = User;