import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// verifyToken / authentication
export const verifyToken = asyncHandler(async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(403).json({ message: "Invalid credential" });
    const token = cookies.split("=")[1];
    
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) return res.status(401).json({ message: error.message });
        req.body.userId = user.id;
        next();
    })
});

export const checkAuth = asyncHandler(async(req, res) => {
    const cookies = req.headers.cookie;
    if (!cookies) return res.send(false);
    const token = cookies.split("=")[1];
    
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) return res.send(false);
        res.send(true);
    });
})
