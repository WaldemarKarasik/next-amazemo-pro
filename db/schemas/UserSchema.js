import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});
export default ProductSchema;
