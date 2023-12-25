import mongoose from "mongoose";
import blogModal from "../models/blogModel.js"
import userModel from "../models/userModel.js";







export const getAllBlogs = async (req, res) => {
    try {
        const blog = await blogModal.find({}).populate('user')
        if (!blog) {
            return res.status(200).send({ success: false, message: "Not found any blog " });
        }
        return res.status(200).send({ success: true, blogCount: blog.length, message: "all blogs", blog })
    }
    catch (error) {
        console.log(error);
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const newBlog = await blogModal.findById(id);

        if (!newBlog) {
            return res.status(404).send({ success: false, message: "blog not found" });
        }
        return res.status(200).send({ success: true, message: "found your blog ", newBlog })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ success: false, message: "Errror in finding single  blog ", error })
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide ALl fields",
            });
        }
        const exisitingUser = await userModel.findById(user);
        //validaton
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",
            });
        }

        const newBlog = new blogModal({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save(session);
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save(session);
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error WHile Creting blog",
            error,
        });
    }
}
export const updateBlog = async (req, res) => {
    try {

        const { id } = req.params;
        // const { title, description, image } = req.body;

        const newUpdatedBlog = await blogModal.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({ success: true, message: "successfully updated", newUpdatedBlog })

    } catch (error) {
        return res.status(400).send({ success: false, message: "Errror in updating  blog ", error })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await blogModal.findByIdAndDelete(req.params.id)
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({ success: true, message: "successfully deleted " });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ success: false, message: "Errror in deleting  blog ", error })
    }
}

export const userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(401).send({ success: false, message: "blog not found" })
        }

        return res.status(200).send({ success: true, message: "blog  found", userBlog })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ success: false, message: "Errror in userBlogController  blog ", error })
    }
}