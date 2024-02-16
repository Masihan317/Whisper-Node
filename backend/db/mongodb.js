import mongoose from "mongoose"

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
  } catch (err) {

  }
}

export default mongodb