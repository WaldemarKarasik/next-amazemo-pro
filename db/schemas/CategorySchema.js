import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }],
});

export default CategorySchema;
