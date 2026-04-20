"use client";

import { useState, useMemo, JSX } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthPage(): JSX.Element {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  );

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setAuthError(null);
    setMessage(null);
    setLoading(true);

    if (isLogin) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setAuthError(error.message);
          return;
        }
        router.push("/dashboard");
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAuthError(err.message);
        } else {
          setAuthError("An unexpected error occurred during login.");
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setAuthError(error.message);
        return;
      }
      setMessage(
        "Sign-up successful! Please check your email to confirm your account."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAuthError(err.message);
      } else {
        setAuthError("An unexpected error occurred during sign-up.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (): void => {
    setIsLogin((prev) => !prev);
    setAuthError(null);
    setMessage(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {/* Stitch Login — Professional SaaS */}
      <main className="relative min-h-screen flex items-center justify-center p-6 bg-surface overflow-hidden">
        {/* Industrial Background Elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#c5c6cd 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
            opacity: 0.15,
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -skew-x-12 transform translate-x-1/3 pointer-events-none" />

        {/* Authentication Container */}
        <div className="relative w-full max-w-[1100px] grid md:grid-cols-12 bg-surface-container-lowest overflow-hidden shadow-none border border-outline-variant/20 rounded-lg">
          {/* Left Side: Editorial Content */}
          <div className="hidden md:flex md:col-span-6 flex-col justify-between p-12 bg-surface-container-low">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
                  <span
                    className="material-symbols-outlined text-on-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    token
                  </span>
                </div>
                <span className="text-lg font-bold tracking-tighter text-slate-900 uppercase font-headline">
                  Smart Pulse
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tighter font-headline text-primary leading-tight">
                THE PRECISION <br /> LEDGER FOR THE <br /> MODERN ATELIER.
              </h2>
              <p className="text-on-surface-variant max-w-sm leading-relaxed">
                Securely manage your financials, client projects, and time logs within a high-trust
                digital environment designed for architectural clarity.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-2xl font-bold font-headline text-primary">0.02s</div>
                <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                  Latency Floor
                </div>
              </div>
              <div className="w-px h-8 bg-outline-variant/30" />
              <div>
                <div className="text-2xl font-bold font-headline text-primary">AES-256</div>
                <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                  Encryption Grade
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:col-span-6 p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              {/* Form Header */}
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold tracking-tight font-headline text-primary mb-2">
                  {isLogin ? "Sign in to your Ledger" : "Create your Workspace"}
                </h1>
                <p className="text-on-surface-variant text-sm">
                  {isLogin
                    ? "Access your workspace and project intelligence."
                    : "Register to begin managing your digital atelier."}
                </p>
              </div>

              {/* Feedback Messages */}
              {authError && (
                <div className="mb-6 rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container border border-error/20">
                  {authError}
                </div>
              )}
              {message && (
                <div className="mb-6 rounded-lg bg-tertiary-fixed px-4 py-3 text-sm text-on-tertiary-fixed border border-on-tertiary-container/20">
                  {message}
                </div>
              )}

              {/* Social Login (Login only) */}
              {isLogin && (
                <>
                  <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-sm font-semibold text-primary hover:bg-surface-container-low transition-all duration-200">
                    <span className="material-symbols-outlined text-xl">login</span>
                    Continue with Google
                  </button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-outline-variant/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                      <span className="bg-surface-container-lowest px-4 text-on-surface-variant font-medium">
                        Or enter credentials
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Credential Form */}
              <form onSubmit={handleAuth} className="space-y-5" noValidate>
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 ml-1"
                    htmlFor="email"
                  >
                    Work Email
                  </label>
                  <input
                    className="block w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-sm text-primary placeholder:text-outline/50 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                    id="email"
                    name="email"
                    placeholder="name@atelier.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    {isLogin && (
                      <a
                        className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                      >
                        Forgot?
                      </a>
                    )}
                  </div>
                  <input
                    className="block w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-sm text-primary placeholder:text-outline/50 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    required
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {/* Confirm Password (Sign-up only) */}
                {!isLogin && (
                  <div>
                    <label
                      className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 ml-1"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="block w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-sm text-primary placeholder:text-outline/50 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center gap-2 py-1">
                    <input
                      className="w-4 h-4 text-primary border-outline-variant/40 rounded focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                      id="remember"
                      name="remember"
                      type="checkbox"
                    />
                    <label
                      className="text-xs text-on-surface-variant font-medium cursor-pointer"
                      htmlFor="remember"
                    >
                      Keep this session active for 30 days
                    </label>
                  </div>
                )}

                <button
                  className="w-full py-4 bg-primary-container text-on-primary text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-primary transition-all duration-300 transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      Processing...
                    </>
                  ) : isLogin ? (
                    "Establish Connection"
                  ) : (
                    "Create Workspace"
                  )}
                </button>
              </form>

              {/* Footer Help */}
              <div className="mt-10 text-center">
                <p className="text-xs text-on-surface-variant">
                  {isLogin ? "New to the Ledger? " : "Already have a workspace? "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary font-bold hover:underline underline-offset-4"
                  >
                    {isLogin ? "Request Workspace" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 right-8 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/40 select-none">
          © 2024 SMART PULSE DIGITAL ATELIER
        </div>
      </main>

      {/* Floating background blurs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-on-tertiary-container/5 rounded-full blur-3xl" />
      </div>
    </>
  );
}