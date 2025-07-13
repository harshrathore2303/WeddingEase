import mongoose, { Schema } from "mongoose";

const checklistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Checklist = mongoose.model("Checklist", checklistSchema);
