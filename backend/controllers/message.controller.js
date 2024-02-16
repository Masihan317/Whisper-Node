import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: rid } = req.params
    const sid = req.user._id

    let conversation = await Conversation.findOne({
      participants: { $all: [sid, rid] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sid, rid]
      })
    }

    const newMessage = new Message({
      sid,
      rid,
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    res.status(201).json(newMessage)
  } catch (err) {
    console.log("here")
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: rid } = req.params
    const sid = req.user._id

    const conversation = await Conversation.findOne({
      participants: { $all: [sid, rid] }
    }).populate("messages")

    if (!conversation) {
      return res.status(200).json([])
    }

    res.status(200).json(conversation.messages)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}