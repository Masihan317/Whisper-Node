import mongoose from "mongoose"

const messageCollection = new mongoose.Schema({
  sid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Message = mongoose.model("Message", messageCollection)

export default Message