const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, "Please enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please enter a Valid Password"],
    minlength: [6, "Minimun password length must be 6 characters"],
  },

  register_date: {
    type: Data,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
