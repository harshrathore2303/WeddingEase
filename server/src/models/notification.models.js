import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["booking", "review", "payment", "general"],
      default: "booking",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
