const User = require('../models/User');
const catchAsyncErrors = require('../middleware/catchAsyncError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const ErrorHandler = require('../utils/errorhandler')
const { sendToken } = require('../utils/jwtToken')

// create user
exports.createUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if(user){
        return next(new ErrorHandler("User with this email already exists", 404));
    }
    const secPass = await bcrypt.hash(password, 10);
    user = await User.create({
        name: name,
        email: email,
        password: secPass,
    });
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, message: "Account Created" });
})

// login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if(!user){
        return next(new ErrorHandler("Invalid Credentials", 400));
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return next(new ErrorHandler("Invalid Credentials", 400));
    }
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    sendToken(user, authtoken, 200, res);
})

// logout
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Log Out Successful"
    })
})

// get user details --user
exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
})

exports.getAllUsers = catchAsyncErrors( async (req, res, next) => {
    const keyword = req.query.search
        ? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}},
            ]
        }
        : {};
    
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users);
})