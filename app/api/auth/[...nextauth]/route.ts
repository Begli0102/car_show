import { mongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { IUser } from '@/app/interface'
import GoogleProvider from 'next-auth/providers/google'
import { Account, User as AuthUser } from 'next-auth'

export const authOptions: any = {
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
          console.log(error)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      httpOptions: {
        timeout: 12000
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn ({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == 'credentials') {
        return true
      }
      if (account?.provider == 'google') {
        await mongoDB()
        try {
          const userExist = await User.findOne({ email: user.email })
          if (!userExist) {
            const newUser = new User({
              name: user.name,
              email: user.email
            })

            await newUser.save()
            return true
          }
          return true
        } catch (err) {
          console.log('Error saving user', err)
          return false
        }
      }
    }
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
