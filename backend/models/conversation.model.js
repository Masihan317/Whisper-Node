import mongoose from "mongoose"

const conversationCollection = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: []
  }]
}, { timestamps: true })

const Conversation = mongoose.model("Conversation", conversationCollection)

export default Conversation