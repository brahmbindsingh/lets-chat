const catchAsyncError = require("../middleware/catchAsyncError");
const Room = require("../models/Room");
const RoomMessage = require('../models/RoomMessage');
const ErrorHandler = require("../utils/errorhandler");

exports.createRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findOne({ name: req.body.name });
  if (room) {
    return next(new ErrorHandler("Room already exists!"));
  }
  await Room.create({
    users: [req.user._id],
    name: req.body.name,
    roomAdmin: req.user._id,
  });
  res.status(201).json({
    success: true,
    roomId: req.body.name,
    message: "New Room Created Successfully",
  });
});

// join room
exports.joinRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findOne({ name: req.body.name });
  if (!room) {
    return next(new ErrorHandler("Room does not exist", 400));
  }
  if (room.users.includes(req.user._id)) {
    return next(new ErrorHandler("User already in the room", 400));
  }
  room.users = [...room.users, req.user._id];
  await Room.findByIdAndUpdate(room._id, room);
  room = await Room.findOne({ name: req.body.name })
    .populate("roomAdmin", "-password")
    .populate("users", "-password");
  res
    .status(200)
    .json({ success: true, room: room, message: "Joined Room Successfully" });
});

//  get room users list
// exports.getRoomUsers = catchAsyncError(async (req, res, next) => {
//   const room = await Room.findOne({ name: req.body.name });
//   if (!room) {
//     return next(new ErrorHandler("Room does not exist", 400));
//   }
//   if (!room.users.includes(req.user._id)) {
//     return next(
//       new ErrorHandler("Please join the room to access this resource", 400)
//     );
//   }
//   res.status(200).json({ users: room.users });
// });

exports.deleteRoom = catchAsyncError(async (req, res, next) => {
  // const room = await Room.findOne({ name: req.body.name });
  const room = await Room.findOne({ name: req.params.id });
  if (!room) {
    return next(new ErrorHandler("Room does not exist", 400));
  }
  if (room.roomAdmin.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("User does not have access to delete this room", 400)
    );
  }
  await Room.findByIdAndDelete(room._id);
  await RoomMessage.deleteMany({ roomId: room._id });
  res.status(200).json({ success: true, message: "Room deleted successfully" });
});

exports.exitRoom = catchAsyncError(async (req, res, next) => {
  // const room = await Room.findOne({ name: req.body.name });
  const room = await Room.findOne({ name: req.params.id });
  if (!room) {
    return next(new ErrorHandler("Room does not exist", 400));
  }
  if (!room.users.includes(req.user._id)) {
    return next(
      new ErrorHandler("Please join the room to access this resource", 400)
    );
  }
  room.users = room.users.filter((el) => {
    return el._id.toString() !== req.user._id.toString();
  });
  await Room.findByIdAndUpdate(room._id, room);
  res.status(200).json({ success: true, message: "Left the room" });
});

exports.getUserRooms = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword;
  const rooms = await Room.find({
    $and: [
      {users: { $elemMatch: { $eq: req.user._id } }},
      keyword ? {name: {$regex: keyword, $options: "i"}} : {}
    ]
  })
    .populate("users", "-password")
    .populate("roomAdmin", "-password");
  res.status(200).json({ success: true, rooms: rooms });
});

exports.getRoomInfo = catchAsyncError(async (req, res, next) => {
  const room = await Room.findOne({ name: req.params.id })
    .populate("users", "-password")
    .populate("roomAdmin", "-password");
    console.log(req.params.id);
  res.status(200).json({ success: true, room: room });
});
