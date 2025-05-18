const express = require('express');
const router = express.Router();
const zod = require("zod");
const mongo = require("mongoose");

const { User, Acccount, Transaction } = require("../db");
const authmid = require('../authmid');

const amountbody = zod.object({
    amount: zod.number()
})

router.get("/balance", authmid, async (req, res) => {

    try {
        const acct = await Acccount.findOne({
            userId: req.userId
        });

        if (acct) {
            res.status(200).json({
                "current_balance": acct.balance,
                "walletId": acct.walletId,
            });
        }
        else {
            res.status(400).json({
                message: "account not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong. Please try again",
            error: err.message
        })
    }
})


router.get("/bulk", authmid, async (req, res) => {

    try {
        const searchValue = req.query.filter || "";

        const bulkUsers = await User.find({
            _id: {
                $ne: req.userId
            },
            $or: [
                {
                    firstName: {
                        '$regex': searchValue,
                        '$options': 'i'
                    }
                },
                {
                    lastName: {
                        '$regex': searchValue,
                        '$options': 'i'
                    }
                }
            ]
        }).select("firstName lastName avatar _id");

        if (bulkUsers.length > 0) {
            res.status(200).json({
                message: "user found",
                users: bulkUsers
            })
        }
        else {
            res.status(400).json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong. Please try again",
            error: err.message
        })
    }
})

router.post("/transfer", authmid, async (req, res) => {
    const session = await mongo.startSession();

    try {
        await session.withTransaction(async () => {
            const to = req.body.to;
            const amount = req.body.amount;

            const payer = await Acccount.findOne({
                userId: req.userId
            });
            if (!payer) throw new Error("payer not found");

            if (payer.balance < amount) throw new Error("insufficient balance");

            const receiver = await Acccount.findOne({
                userId: to
            })

            if (!receiver) throw new Error("receiver not found");

            const payerDeducted = await Acccount.findOneAndUpdate({
                userId: req.userId
            },
                {
                    $inc: {
                        balance: -amount, totalSent: amount
                    }
                },).session(session);

            if (!payerDeducted) throw new Error("Something went wrong while deducting mpney from payer");

            const receiverAdded = await Acccount.findOneAndUpdate({
                userId: to
            },
                {
                    $inc: {
                        balance: +amount, totalReceived: +amount
                    }
                }).session(session);

            if (!receiverAdded) throw new Error("Something went wrong while adding money to receiver");

            const transactionupdate = await Transaction.create([
                {
                    userId: req.userId,
                    counterParty: to,
                    amount: amount,
                    status: "sent",
                },
                {
                    userId: to,
                    counterParty: req.userId,
                    amount: amount,
                    status: "received",
                }
            ], { session, ordered: true })
            if (!transactionupdate) throw new Error("Something went wrong while creating transaction details");

            res.status(200).json({
                message: "transaction successful",
                currentBalance: payerDeducted.balance,
                sent: amount,
                totalSent: payerDeducted.totalSent,
                totalReceived: receiverAdded.totalReceived,
            })
        })
    }
    catch (err) {
        res.status(400).json({
            message: "transaction failed",
            error: err.message
        })
    }
    finally {
        session.endSession();
    }
})

router.get("/transhistory", authmid, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId })
            .sort({ date: -1 })
            .populate({
                path: 'counterParty',
                select: 'firstName lastName avatar',
            });
        if (!transactions) throw new Error("transaction history not found");

        res.status(200).json({
            message: "transaction history found",
            transactions: transactions.map((tx) => {
                return {
                    Name: `${tx.counterParty.firstName[0].toUpperCase() + tx.counterParty.firstName.slice(1,)} ${tx.counterParty.lastName[0].toUpperCase() + tx.counterParty.lastName.slice(1,)}`,
                    amount: tx.amount,
                    status: tx.status,
                    avatar: tx.counterParty.avatar,
                    date: tx.date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })
                }
            })
        })
    }
    catch (err) {
        res.status(400).json({
            message: "transaction history not found",
            error: err.message
        })
    }
})

router.get("/acctdetails", authmid, async (req, res) => {
    try {
        const acct = await Acccount.findOne({
            userId: req.userId
        });

        if (!acct) throw new Error("account not found");

        res.status(200).json({
            message: "account details found",
            account: {
                totalDeposited: acct.totalDeposited,
                totalReceived: acct.totalReceived,
                totalSent: acct.totalSent
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: "account details not found",
            error: err.message
        })
    }
})

module.exports = router;