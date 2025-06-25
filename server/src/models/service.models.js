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
            enum: ["hall", "photographer", "caterer", "decorator", "musician", "dj", "makeup", "mehendi", "planner", "transport", "jewellery", "attire", "gifts", "invitations", "others"],
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