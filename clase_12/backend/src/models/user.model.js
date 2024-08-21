import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  orders: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    default: [],
  },
});

export const userModel = model("user", userSchema);
