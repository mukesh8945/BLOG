import mongoose from "mongoose";




export const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BlogAPP", {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log("Successfully connected");
    }
    catch (error) {
        console.log(error)
    }
} 