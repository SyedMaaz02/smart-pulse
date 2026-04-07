import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = await cookies();
    
    // Using '!' tells TypeScript: "I promise these variables exist in Vercel/Env"
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              void cookieStore.set({ name, value, ...options });
            } catch {
              // Safe to ignore in Server Actions/Routes
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              void cookieStore.set({ name, value: "", ...options });
            } catch {
              // Safe to ignore
            }
          },
        },
      }
    );
    
    const { error: authError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!authError) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Line 47: Ensuring we always return a valid Redirect response
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}