import mongoose, { models, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: { type: String, required: false, trim: true },
    email: {
      type: String,
      reqired: true,
      trim: true
    },
    password: { type: String, required: false, trim: true }
  },

  { timestamps: true }
)

const User = models.User || mongoose.model('User', UserSchema)

export default User
