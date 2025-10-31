import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (!code) {
      console.error('No code provided in callback')
      return NextResponse.redirect(`${origin}/login?error=no_code`)
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(error.message)}`
      )
    }

    if (!data.session) {
      console.error('No session created in callback')
      return NextResponse.redirect(`${origin}/login?error=no_session`)
    }

    console.log('✅ Auth callback successful for user:', data.user.id)

    // Determine redirect URL
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'

    let redirectUrl: string
    if (isLocalEnv) {
      redirectUrl = `${origin}${next}`
    } else if (forwardedHost) {
      redirectUrl = `https://${forwardedHost}${next}`
    } else {
      redirectUrl = `${origin}${next}`
    }

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Unexpected callback error:', error)
    const { origin } = new URL(request.url)
    return NextResponse.redirect(`${origin}/login?error=unexpected`)
  }
}