import { Schema, model } from "mongoose";

const businessSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  products: {
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

export const businessModel = model("business", businessSchema);
