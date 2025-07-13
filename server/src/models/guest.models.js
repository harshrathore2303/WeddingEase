import mongoose, { Schema } from "mongoose";

const guestSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    guests: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        event: []
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Guest = mongoose.model("Guest", guestSchema);
