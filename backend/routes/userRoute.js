import express from "express";
import { login, signUp } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post('/sign-up', signUp);  // new user sign-up
userRoute.post('/login', login);  // user login

export default userRoute;
