import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { locales } from './i18n'
import { localePrefix } from './navigation'
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

type CustomMiddleware = (req: NextRequest) => Promise<NextRequest>
const customMiddleware: CustomMiddleware = async req => {
  console.log('Custom middleware executed before next-intl')
  return req
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix
})

export async function middleware(
  req: NextRequest
): Promise<ReturnType<typeof intlMiddleware>> {
  await customMiddleware(req)
  return intlMiddleware(req)
}


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
      // console.log(request.nextUrl.pathname)
      // console.log(request.nextauth.token)

      if (request.nextUrl.pathname.startsWith("/about")
          && request.nextauth.token?.role !== "admin") {
          return NextResponse.rewrite(
              new URL("/denied", request.url)
          )
      }

      if (request.nextUrl.pathname.startsWith("/client")
          && request.nextauth.token?.role !== "admin"
          && request.nextauth.token?.role !== "manager") {
          return NextResponse.rewrite(
              new URL("/denied", request.url)
          )
      }
  },
  {
      callbacks: {
          authorized: ({ token }) => !!token
      },
  }
)
export const config = {
  matcher: ['/', '/(fr|en|ja|de|ru|es|fa|ar)/:path*', "/client", "/dashboard"]
}