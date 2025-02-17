import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  done_by: {
    type: Date,
  },
  created_at: { type: Date, default: Date.now },
},
{timestamps: true});


export const Task = mongoose.model("Task", taskSchema);