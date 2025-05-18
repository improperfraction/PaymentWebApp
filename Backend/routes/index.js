const express=  require('express');
const router= express.Router();
const userRouter= require("./user");
const acctRouter= require("./account");

router.use("/user", userRouter);
router.use("/account", acctRouter);

module.exports= router;




