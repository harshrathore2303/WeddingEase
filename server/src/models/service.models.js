import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }, 
        location: {
            type: String,
            required: true,
        }, 
        dp: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            enum: ["Hall", "Photographer", "Caterer", "Decorator", "Musician", "Dj", "Makeup", "Mehendi", "Planner", "Transport", "Jewellery", "Attire", "Gifts", "Invitations", "Others"],
            required: true
        },
        imageSet: [
            {
                type: String,
                required: true
            }
        ],
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
)

export const Service = mongoose.model("Service", serviceSchema);