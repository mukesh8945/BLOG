import express from "express";
import { getAllUsers, loginController, registerController } from "../controller/userController.js";
// import { getAllUsers } from 
const router = express.Router();


router.get("/get-all-users", getAllUsers)
router.post('/login', loginController);
router.post("/register", registerController);


export default router