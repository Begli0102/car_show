import './globals.css'
import { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Poppins } from 'next/font/google'
import { AuthProvider } from './providers'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Car Market',
  description: 'The best cars are found here'
}

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider session={session}>
          <Navbar />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
