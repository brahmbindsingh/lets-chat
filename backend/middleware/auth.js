const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError( async (req, res, next) => {
    // req.setHeader('Content-Type', 'application/json');
    // req.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    // req.setHeader('Access-Control-Allow-Credentials', 'true')
    const { token } = req.cookies;
    if(token==='j:null' || token == undefined){
        return next(new ErrorHandler("Please login to access this resource", 404));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.user.id).select("-password");
    next();
})


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };