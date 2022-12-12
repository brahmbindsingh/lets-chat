const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    }
  ],
  name: {
    type: String,
    required: true,
    unique: true
  },
  roomAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
);

const Room = mongoose.model('room', roomSchema);
module.exports = Room;