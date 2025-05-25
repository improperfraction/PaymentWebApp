import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtpass = process.env.JWT_SECRET;

function authmid(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "incorrect auth header"
            });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, jwtpass);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({
                message: "invalid token"
            });
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired"
            });
        }
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
}

export default authmid;