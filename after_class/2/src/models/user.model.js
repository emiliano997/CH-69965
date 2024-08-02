import { Schema, model } from "mongoose";
import { createHash } from "../utils/hashFunctions.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  // cartId: { type: Schema.Types.ObjectId, ref: "cart" },
});

// Middleware de mongoose
userSchema.pre("save", function (next) {
  if (this.email.includes("@") && this.email.includes(".")) {
    return next();
  }

  next(new Error("Email inválido"));
});

userSchema.pre("save", async function (next) {
  const newPassword = await createHash(this.password);

  this.password = newPassword;

  next();
});

export const userModel = model("user", userSchema);
