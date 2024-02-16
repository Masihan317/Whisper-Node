import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utilities/generateToken.js"

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." })
    }

    const user = await User.findOne({username})
    if (user) {
      return res.status(400).json({ error: "Username already exists." })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? maleProfile : femaleProfile
    })

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture
      })
    } else {
      res.status(400).json({ error: "Invalid User Data." })
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isCorrectPassword = await bcrypt.compare(password, user?.password || "")

    if (!user || !isCorrectPassword) {
      return res.status(400).json({ error: "Invalid Username or Password." })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture
    })
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out Successfully." })
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}