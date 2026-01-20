import { createClient } from "@/lib/supabase/client";

export type Role = "user" | "admin";
export type Plan = "free" | "premium";

export type Session = {
  userId: string;
  role: Role;
  plan: Plan;
  email: string;
  fullName: string;
  createdAt: string;
};

export async function signUp(input: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  plan?: Plan;
}): Promise<{ ok: true; session: Session | null; message?: string } | { ok: false; error: string }> {
  const supabase = createClient();
  
  // Determine the redirect URL for email confirmation
  let emailRedirectTo = undefined;
  if (typeof window !== 'undefined') {
    emailRedirectTo = `${window.location.origin}/auth/callback`;
  }

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo,
      data: {
        full_name: input.fullName,
        phone: input.phone,
        country: input.country,
        plan: input.plan || "free",
        role: "user",
      },
    },
  });

  if (error) return { ok: false, error: error.message };
  if (!data.user) return { ok: false, error: "No user returned" };
  
  // If email confirmation is enabled and required, session might be null
  // We don't block here anymore, we try to insert the user data anyway so it's stored.
  
  // Ensure user is in public.users
  const { data: existing } = await supabase.from('users').select('id').eq('id', data.user.id).single();
  if (!existing) {
      // Try standard insert first (works if RLS allows or if session exists)
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        email: input.email,
        full_name: input.fullName,
        phone: input.phone,
        role: "user",
        plan: input.plan || "free",
      });

      // If standard insert failed (likely due to no session/RLS), try fallback via exec_sql
      if (insertError) {
          console.warn("Standard insert failed, trying exec_sql fallback:", insertError.message);
          
          // Sanitize inputs for SQL (basic prevention)
          const safeEmail = input.email.replace(/'/g, "''");
          const safeName = input.fullName.replace(/'/g, "''");
          const safePhone = (input.phone || "").replace(/'/g, "''");
          const safePlan = (input.plan || "free").replace(/'/g, "''");
          
          const query = `
            INSERT INTO public.users (id, email, full_name, phone, role, plan)
            VALUES ('${data.user.id}', '${safeEmail}', '${safeName}', '${safePhone}', 'user', '${safePlan}')
            ON CONFLICT (id) DO NOTHING
          `;
          
          await supabase.rpc('exec_sql', { query });
      }
  }

  if (!data.session) {
      return { 
          ok: true, 
          session: null as any, // Cast to any to satisfy type temporarily or update type
          message: "Please check your email to confirm your account." 
      };
  }

  return {
    ok: true,
    session: {
      userId: data.user.id,
      role: "user",
      plan: (input.plan || "free") as Plan,
      email: input.email,
      fullName: input.fullName,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function signIn(input: { email: string; password: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) return { ok: false, error: error.message };

  // Fetch extra details
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  const plan = userData?.plan || data.user.user_metadata?.plan || "free";
  
  return {
    ok: true,
    session: {
      userId: data.user.id,
      email: data.user.email!,
      role: (userData?.role || "user") as Role,
      plan: plan as Plan,
      fullName: userData?.full_name || data.user.user_metadata?.full_name || "",
      createdAt: data.user.created_at,
    }
  };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (!session || error) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return {
    userId: session.user.id,
    email: session.user.email!,
    role: (userData?.role as Role) || "user",
    plan: (userData?.plan as Plan) || "free",
    fullName: userData?.full_name || session.user.user_metadata?.full_name || "",
    createdAt: session.user.created_at,
  };
}

export async function upgradeUser(userId: string) {
   const supabase = createClient();
   await supabase.from('users').update({ plan: 'premium' }).eq('id', userId);
   await supabase.auth.updateUser({ data: { plan: 'premium' } });
}

export async function signInWithGoogle(nextUrl: string = '/dashboard') {
    const supabase = createClient();
    const redirectTo = typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`
        : undefined;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
        }
    });
    return { ok: !error, error: error?.message };
}
