import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: true },
});

const acctSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    walletId: {
        type: Number,
        required: true,
    },
    totalDeposited: {
        type: Number,
        default: 0,
        required: true,
    },
    totalReceived: {
        type: Number,
        default: 0,
        required: true,
    },
    totalSent: {
        type: Number,
        default: 0,
        required: true,
    },
});

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    counterParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "received"],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", UserSchema);
const Acccount = mongoose.model("Acccount", acctSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

export { User, Acccount, Transaction };