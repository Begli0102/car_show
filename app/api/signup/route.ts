import { mongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json()

    await mongoDB()

    const userExist = await User.findOne({ email })
    if (userExist) {
      return NextResponse.json(
        { message: 'User is already exist' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'User registered' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while signing up' },
      { status: 500 }
    )
  }
}
