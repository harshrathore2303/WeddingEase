import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Budget = mongoose.model("Budget", budgetSchema);