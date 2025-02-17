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
        rating: {
            type: String,
        },
        tag: {
            type: String,
            enum: ["hall", "photographer", "caterer", "decorator", "musician", "dj", "makeup", "mehendi", "planner", "transport", "jewellery", "attire", "gifts", "invitations", "others"],
        },
        imageSet: [
            {
                type: String,
            }
        ]
    },
    { timestamps: true }
)

export const Service = mongoose.model("Service", serviceSchema);