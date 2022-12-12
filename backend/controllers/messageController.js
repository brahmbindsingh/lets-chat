const catchAsyncError = require('../middleware/catchAsyncError');
const RoomMessage = require('../models/RoomMessage');
const Room = require('../models/Room');
const ErrorHandler = require('../utils/errorhandler');

exports.newMessage = catchAsyncError( async (req, res, next) => {
    const { message, roomId } = req.body;
    if(!message){
        return next(new ErrorHandler("Invalid data passed into request", 400));
    }
    const room = await Room.findById(roomId);
    if(!room){
        return next(new ErrorHandler("Room does not exits", 400));
    }
    const users = (await Room.findById(roomId)).users;
    if(!users.includes(req.user._id)){
        return next(new ErrorHandler("Please join the room to access this resource", 400));
    }
    let newMessage = await RoomMessage.create({
        roomId: roomId,
        from: req.user._id,
        msg: message
    })
    newMessage.from = req.user;
    res.status(201).json({ success: true, message: newMessage });
})

exports.getAllMessages = catchAsyncError( async (req, res, next) => {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    if(!room){
        return next(new ErrorHandler("Room does not exits", 400));
    }
    const users = (await Room.findById(roomId)).users;
    if(!users.includes(req.user._id)){
        return next(new ErrorHandler("Please join the room to access this resource", 400));
    }
    const messages = await RoomMessage.find({ roomId: roomId }).populate("from", "-password");
    res.status(200).json({ success: true, messages: messages });
})