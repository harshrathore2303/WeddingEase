import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    recipientId: {
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
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
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
