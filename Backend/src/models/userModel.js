import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: [true, "UserName Already Taken!"],
      required: [true, "UserName Must be Required!"],
    },
    email: {
      type: String,
      unique: [true, "Email Already in Use"],
      required: [true, "Email Must be Required!"],
    },
    password: {
      type: String,
      required: [true, "Password Must be Required!"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { id: this._id, userName: this.userName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};
export const userModel = mongoose.model("User", userSchema);
