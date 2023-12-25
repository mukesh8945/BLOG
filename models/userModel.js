import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "blogs"
        }
    ]
}, { timestamps: true })

const userModel = mongoose.model("blogUser", userSchema);

export default userModel;