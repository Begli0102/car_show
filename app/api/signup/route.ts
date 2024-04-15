import { mongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { name, email, password } = body

    await mongoDB()

    const userExist = await User.findOne({ email })
    if (userExist) {
      return NextResponse.json(
        { message: 'User is already exist' },
        { status: 401 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'User registered' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while signing up' },
      { status: 500 }
    )
  }
}
