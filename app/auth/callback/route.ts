import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    // FIX 1: In Next.js 15+, cookies() must be awaited
    const cookieStore = await cookies(); 
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // FIX 2: Added try/catch because Middleware/Routes sometimes block .set()
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // The 'set' can be ignored if the response is already handling it
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch (error) {
              // The 'remove' can be ignored if the response is already handling it
            }
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirect to the dashboard on success
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page if the code exchange fails
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}