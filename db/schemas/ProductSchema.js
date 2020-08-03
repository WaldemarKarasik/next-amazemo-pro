import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  brand: String,
  image: String,
  price: Number,
  rating: Number,
  numReviews: Number,
  countInStock: Number,
});
export default ProductSchema;
