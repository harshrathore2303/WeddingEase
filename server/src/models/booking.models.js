import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed"],
            default: "Confirmed"
        },
        purpose: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Booking = mongoose.model("Booking", bookingSchema);