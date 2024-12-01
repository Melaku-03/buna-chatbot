import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// sign-up
export const signUp = asyncHandler(async (req, res) => {
    const Schema = Joi.object({
        username: Joi.string().min(3).lowercase().required(),
        password: Joi.string().min(6).required()
    })

    const { error, value } = Schema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    // check if user exists
    const user = await userModel.findOne({ username: value.username }).lean().exec();
    if (user) return res.status(409).json({ message: 'username taken use another' });

    // hashPassword
    const hashedPwd = await bcrypt.hash(value.password, 10);

    // create-new-user
    const result = await userModel.create({ username: value.username, password: hashedPwd });
    await result.save();

    res.status(200).json({ message: `${result.username} sign-up` });
});

// login
export const login = asyncHandler(async (req, res) => {
    const Schema = Joi.object({
        username: Joi.string().min(3).lowercase().required(),
        password: Joi.string().min(6).required()
    })

    const { error, value } = Schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await userModel.findOne({ username: value.username }).lean().exec();
    if (!user) return res.status(404).json({ message: 'Not found' });

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

    // clear cookie if exist
    res.clearCookie(String(user._id), { path: '/' });
    
    // create new cookie
    res.cookie(String(user._id), token, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60), httpOnly: true, sameSite: true })

    res.json({ message: user.username })
});
