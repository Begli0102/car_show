import mongoose from 'mongoose'

export const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI as string)
    console.log('DB Connection Successful!')
  } catch (error) {
    console.log('DB Connection Failed!', error)
  }
}
