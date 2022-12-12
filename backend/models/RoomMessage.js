const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomMessageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const RoomMessage = mongoose.model("RoomMessages", roomMessageSchema);
module.exports = RoomMessage;