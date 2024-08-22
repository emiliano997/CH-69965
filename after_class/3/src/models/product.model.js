import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    stock: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

export const productModel = model("product", productSchema);
