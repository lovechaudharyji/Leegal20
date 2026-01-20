import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Create user record if not exists (for OAuth signups)
      // Ideally this should be a trigger, but we can do a quick check here too
      // However, server client might not have permissions to insert into public.users if RLS relies on user being logged in
      // exchangeCodeForSession logs the user in, so subsequent calls are authenticated.
      
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
         const { data: existing } = await supabase.from('users').select('id').eq('id', user.id).single()
         if (!existing) {
             await supabase.from('users').insert({
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata.full_name || user.user_metadata.name || "",
                role: 'user',
                plan: user.user_metadata.plan || 'free',
            })
         }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=AuthCodeError`)
}
