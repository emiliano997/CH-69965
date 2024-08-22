import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("findOne", async function (next) {
  this.populate("products.product");
  next();
});

export const cartModel = model("cart", cartSchema);
