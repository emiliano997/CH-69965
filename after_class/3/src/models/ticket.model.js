import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

ticketSchema.pre("findOne", async function (next) {
  this.populate("purchaser");
  next();
});

export const ticketModel = model("ticket", ticketSchema);
