const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Acccount } = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtpas = require("../config");
const mongo = require('mongoose');

const app = express();

app.use(express.json());

const signupbody = zod.object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(6),
    gender: zod.string()
});

const signinbody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/signup", async (req, res) => {

    const session = await mongo.startSession();

    try {
        const validateInpit = signupbody.safeParse(req.body);
        if (!validateInpit.success || validateInpit.error) {
            return res.status(400).json({
                message: "Invalid input. Please try again!"
            })
        }

        await session.withTransaction(async () => {

            const existinUser = await User.findOne({ email: req.body.email });
            if (existinUser) throw new Error("user already exists");

            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const modavatar = req.body.gender == "male" ? `https://api.dicebear.com/9.x/pixel-art/svg?seed=${req.body.firstName}&hair=short01,short02,short03,short04,short05` : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${req.body.firstName}&hair=long01,long02,long03,long04,long05`;

            const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPwd,
                gender: req.body.gender,
                avatar: modavatar
            })
            if (!newUser) throw new Error("User not created. Please try again!");

            const newbalance = 1 + Math.floor(Math.random() * 10000);
            const newAcct = await Acccount.create({
                userId: newUser._id,
                balance: newbalance,
                walletId: newUser._id.toString().replace(/\D/g, ""),
                totalDeposited: newbalance
            })
            if (!newAcct) throw new Error("account not created");

            const token = await jwt.sign({ userId: newUser._id }, jwtpas);

            return res.status(200).json({
                message: "user account created successfully",
                user: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    _id: newUser._id,
                },
                balance: newAcct.balance,
                token: token
            })
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message
        })
    }
    finally {
        session.endSession();
    }
})

router.post("/signin", async (req, res) => {
    try {
        const validateInput = signinbody.safeParse(req.body);
        if (!validateInput.success || validateInput.error) {
            return res.status(400).json({
                message: "Invalid input. Please try again!"
            })
        }

        const existinUser = await User.findOne({
            email: req.body.email,
        });
        if (!existinUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const validatePwd = await bcrypt.compare(req.body.password, existinUser.password);
        if (!validatePwd) {
            return res.status(401).json({ message: "Invalid email/password. Please try again!" });
        }

        const token = await jwt.sign({ userId: existinUser._id }, jwtpas);

        return res.status(200).json({
            message: "user signed in successfully",
            user: {
                firstName: existinUser.firstName,
                lastName: existinUser.lastName,
                email: existinUser.email,
                avatar: existinUser.avatar,
                _id: existinUser._id,
            },
            token: token
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports = router;



