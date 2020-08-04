import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  email: String,
  password: String,
});
export default ProductSchema;
