import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const productModel = model("product", productSchema);
