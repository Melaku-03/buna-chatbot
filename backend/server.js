import express from "express";
import db from "./config/db.js";
import errorhandler from "./middleware/errorHandler.js";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// environment variable
dotenv.config();

// initial server
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ************* api endpoints *************
//  http://localhost:3001/api/user/
app.use('/api/user', userRoute);

// http://localhost:3001/api/chat/
app.use('/api/chat', chatRoute);

// handling errors
app.use(errorhandler);

// database connection
db();
mongoose.connection.once('open', () => app.listen(PORT, () => console.log(`server on: http://localhost:${PORT}`)));
mongoose.connection.on('error', () => console.log("Something went wrong! / DBconnection"));
