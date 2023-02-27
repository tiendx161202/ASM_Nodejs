const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    rpassword: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    numberphone: { type: Number, required: true },
    role_name: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
