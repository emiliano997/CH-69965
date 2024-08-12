import { Schema, model } from "mongoose";

const toySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const toyModel = model("toy", toySchema);
