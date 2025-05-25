import express from 'express';
import zod from 'zod';
import { User, Acccount, Transaction } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import authmid from '../authmid.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const signupbody = zod.object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(6),
    gender: zod.string(),
});

const signinbody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

router.post('/signup', async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const validateInput = signupbody.safeParse(req.body);
        if (!validateInput.success || validateInput.error) {
            return res.status(400).json({
                message: 'Invalid input. Please try again!',
            });
        }

        await session.withTransaction(async () => {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) throw new Error('User already exists');

            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const modavatar =
                req.body.gender === 'male'
                    ? `https://api.dicebear.com/9.x/pixel-art/svg?seed=${req.body.firstName}&hair=short01,short02,short03,short04,short05`
                    : `https://api.dicebear.com/9.x/pixel-art/svg?seed=${req.body.firstName}&hair=long01,long02,long03,long04,long05`;

            const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPwd,
                gender: req.body.gender,
                avatar: modavatar,
            });
            if (!newUser) throw new Error('User not created. Please try again!');

            const newbalance = 1 + Math.floor(Math.random() * 10000);
            const newAcct = await Acccount.create({
                userId: newUser._id,
                balance: newbalance,
                walletId: newUser._id.toString().replace(/\D/g, ''),
                totalDeposited: newbalance,
            });
            if (!newAcct) throw new Error('Account not created');

            const token = await jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

            return res.status(200).json({
                message: 'User account created successfully',
                user: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    _id: newUser._id,
                },
                balance: newAcct.balance,
                token: token,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
        });
    } finally {
        session.endSession();
    }
});

router.post('/signin', async (req, res) => {
    try {
        const validateInput = signinbody.safeParse(req.body);
        if (!validateInput.success || validateInput.error) {
            return res.status(400).json({
                message: 'Invalid input. Please try again!',
            });
        }

        const existingUser = await User.findOne({
            email: req.body.email,
        });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validatePwd = await bcrypt.compare(req.body.password, existingUser.password);
        if (!validatePwd) {
            return res.status(401).json({ message: 'Invalid email/password. Please try again!' });
        }

        const token = await jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: 'User signed in successfully',
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                avatar: existingUser.avatar,
                _id: existingUser._id,
            },
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

router.delete('/delete', authmid, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId);
        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const deletedAcct = await Acccount.findOneAndDelete({ userId: req.userId });
        if (!deletedAcct) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }
        const deletedTrans = await Transaction.deleteMany({
            $or: [{ userId: req.userId }, { counterParty: req.userId }],
        });
        if (!deletedTrans) {
            return res.status(404).json({
                message: 'Transactions not found',
            });
        }
        return res.status(200).json({
            message: 'User account deleted successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

export default router;