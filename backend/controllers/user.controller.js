import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
  try {
    const uid = req.user._id

    const users = await User.find({
      _id: { $ne: uid }
    }).select("-password")

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}