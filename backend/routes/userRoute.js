import express from "express";
import { login, signUp } from "../controllers/userController.js";
import { checkAuth } from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.post('/sign-up', signUp);  // new user sign-up
userRoute.post('/login', login);  // user login
userRoute.get('/auth/validate', checkAuth);  // return boolean helps for protected route front-end

export default userRoute;
