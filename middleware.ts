export { default } from 'next-auth/middleware'

export const config = { matcher: ['/'] } // we need to add all pages which should be protected
