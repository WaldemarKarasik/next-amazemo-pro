import mongoose from "mongoose";
import CategorySchema from "../schemas/CategorySchema";
import ProductSchema from "../schemas/ProductSchema";

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
//   image: String,
//   price: Number,
//   rating: Number,
//   numReviews: Number,
//   countInStock: Number,
// });

// const CategorySchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }],
// });

export default async function database(req, res, next) {
  try {
    req.product = mongoose.model("Product");
  } catch {
    req.product = mongoose.model("Product", ProductSchema);
  }
  try {
    req.category = mongoose.model("Category");
  } catch {
    req.category = mongoose.model("Category", CategorySchema);
  }

  if (mongoose.connections[0].readyState) {
    return next();
  }
  mongoose.connect("mongodb://localhost:27017/next-amazemo", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return next();
}
