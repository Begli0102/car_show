import { mongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { IUser } from '@/app/interface'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize (credentials) {
        const { email, password } = credentials as IUser

        try {
          await mongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log('Error: ', error)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
