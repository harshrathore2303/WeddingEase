import mongoose, { Schema } from "mongoose";

const checklistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export const Checklist = mongoose.model("Checklist", checklistSchema);