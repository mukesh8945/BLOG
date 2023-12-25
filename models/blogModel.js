import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    user: {type: mongoose.Types.ObjectId,ref: "blogUser",require: [true, "user id is required"],
}
}, { timestamps: true })

const blogModal = mongoose.model("blogs", blogSchema);
export default blogModal