const mongo= require("mongoose");



mongo.connect("mongodb+srv://realiasms96:Catwriter%40123@cluster0.jpp2qsd.mongodb.net/rizzpay");

const UserSchema= new mongo.Schema({
    firstName:{type: String, required: true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    gender: {type: String, required: true},
    avatar: {type: String, required: true},
});

const acctSchema= new mongo.Schema({
    userId :{
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance:{
        type: Number,
        default: 0,
        required: true
    },
    walletId:{
        type: Number,
        required: true,
    },
    totalDeposited: { // Tracks total money deposited by the user
        type: Number,
        default: 0,
        required: true
    },
    totalReceived: { // Tracks total money received by the user
        type: Number,
        default: 0,
        required: true
    },
    totalSent: { // Tracks total money sent by the user
        type: Number,
        default: 0,
        required: true
    } 
});


const transactionSchema= new mongo.Schema({
    userId:{
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    counterParty:{
        type:mongo.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["sent", "received"],
        required:true  
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User= mongo.model("User", UserSchema);
const Acccount= mongo.model("Acccount", acctSchema);
const Transaction= mongo.model("Transaction", transactionSchema);



module.exports= {
    User, Acccount, Transaction
}