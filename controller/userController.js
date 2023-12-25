import user from "../models/userModel.js";
import bcrypt from "bcrypt"





export const registerController = async (req, res) => {

    try {
        // console.log(req.body);
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Plz fill all data :) "
            })
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: "user Already found ", success: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new user({ userName, email, password: hashedPassword });
        await newUser.save()
        return res.status(200).send({ message: "registered successfully ", success: true, newUser })

    } catch (error) {
        return res.status(401).send({ success: false, message: "Error in register api ", error })
    }
}







export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status().send({ success: false, message: "Plz provide field " })
        }
        const User = await user.findOne({ email });
        if (!User) {
            return res.status().send({ success: false, message: "email not found " })
        }
        const isMatch = await bcrypt.compare(password, User.password)
        if (!isMatch) {
            return res.status(401).send({ success: false, message: "Invalid credential " })
        }

        return res.status(200).send({ success: true, message: "Successfully login ", User })
    }
    catch (error) {
        return res.status(401).send({ success: false, message: "Error in Login api ", error })
    }
}






export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find({})
        return res.status(200).send({ message: "all users list ", users })
    } catch (error) {
        return res.status(401).send({ success: false, message: "Error in getAllUser api ", error })
    }
}