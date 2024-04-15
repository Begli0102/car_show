import { mongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { email } = body

    await mongoDB()

    const user = await User.findOne({ email })

    return NextResponse.json({ user })
  } catch (error) {
    console.log(error)
  }
}
