// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// // "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase/client"; // Ensure this path is correct
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";

"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  // Initialize Supabase Browser Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // --- STEP 1: STRICT LOGIN ---
        // This only works if the user already exists in Supabase
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          // Custom error message if they try to login without an account
          if (signInError.message.includes("Invalid login credentials")) {
            throw new Error("Account not found or invalid password. Please Sign Up first!");
          }
          throw signInError;
        }
        
        // Success! Send them to the dashboard
        router.push("/dashboard");
        router.refresh();

      } else {
        // --- STEP 2: STRICT SIGN UP ---
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match!");
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) throw signUpError;

        // SUCCESS LOGIC: 
        // We do NOT log them in yet. We force them to the Login tab.
        alert("Registration successful! Now, please use the 'Sign In' tab to enter your credentials.");
        setIsLogin(true); // Switches the UI back to Login mode
        setPassword("");  // Clears sensitive fields
        setConfirmPassword("");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 font-sans">
      <div className="w-full max-w-md space-y-6 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-white">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-zinc-400 text-sm text-balance">
            {isLogin ? "Enter your details to access your dashboard" : "Enter your details to get started with SmartPulse"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Sign Up"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}