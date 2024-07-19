import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
});

const userModel = model("user", userSchema);

export { userModel };

export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
}
