import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface antialiased">
      {/* TopNavBar */}
      <header className="bg-[#f7f9fb] sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-12">
            <Link className="text-xl font-bold tracking-tighter text-[#1e293b] uppercase" href="/">
              Smart Pulse
            </Link>
            <div className="hidden md:flex gap-8">
              <a className="text-[#10b981] font-semibold transition-colors duration-200 tracking-widest text-sm uppercase" href="#features">
                Features
              </a>
              <a className="text-[#1e293b] hover:text-[#10b981] transition-colors duration-200 tracking-widest text-sm uppercase" href="#cta">
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link className="text-[#1e293b] hover:text-[#10b981] transition-all duration-300 font-semibold tracking-widest text-sm uppercase" href="/auth">
              Login
            </Link>
            <Link href="/auth" className="bg-[#10b981] text-white px-5 py-2.5 rounded font-semibold text-sm active:opacity-80 active:scale-95 transition-all duration-200 shadow-sm">
              Get Started (Free)
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="mb-6 inline-block bg-surface-container-high px-3 py-1 rounded border border-outline-variant/20">
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Precision Financials</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-primary leading-[1.1] mb-6 tracking-tight font-headline">
                Command Your Freelance Cash Flow
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
                The digital atelier for modern professionals. A high-density, precision ledger designed to manage projects, automate invoicing, and master your financial architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth" className="bg-[#10b981] text-white px-8 py-4 rounded font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Get Started (Free)
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/auth" className="border border-outline-variant/30 text-primary px-8 py-4 rounded font-bold text-lg hover:bg-surface-container-low transition-all text-center">
                  View Demo
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-2xl rounded-lg overflow-hidden transform lg:translate-x-12">
                <img
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACVaUqKgYwC54DXMYLrglBdtPhVXaCSlWtVMT2Fove_mEnvuXOPnXg73cYqqxeV3Tl7lVC1ZbRjm4NdmltwT4RHz7XeK1qYspJkZjJXGMxx44B8dSRPPmpC3_4qyK82yqYKVQdKIAe329EX5e4drzt5bBptW9MHuoFsv5n0lgf86mFSEVd-Ft9jOphHLqg9Fm0g9ozvkH11RTQ0RGRqdTBweyMkfdeZf9yLgNp8j5iU63zXkAUI__tmvfiiPjlKu328oEBQx69Ig4"
                />
              </div>
              {/* Accent Decoration */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-4 border-b-4 border-[#10b981] -z-10 opacity-20" />
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-on-surface-variant uppercase mb-8">
              Trusted by over 15,000+ top-tier freelancers
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60">
              <img alt="Client Logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5cyhvtjiLySCTvQQqzIhnNdXdihkTZo5Nj2KlwXQpdMz0h39X_1VlEiIPx7waBi4LDr944KLqeQRSP2xZrbBXkk2M-CbxwScId1NrjyhXPjH0GhBXl32gXWGY9tDu_A3x1X9K00u1WC91jTIpBBbA2fEHW1AtGyPAjFFK0Di3H-zuakYBd0e6kGnjuwoKGL5GeldNS0XD4fvU65XI501VYOO-SeVzX7m4sIWxa2_grmm1XDVU8VmXA3EkLks4YtnpoOLwDrtTsg" />
              <img alt="Client Logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQMDAxZZ9qEjyYTvxLBArZRsDBF3HKdJY7hXPK1QiV6KFjz0WYE8rpJqK50I92i8JmQbXRB0tOlm64dJ6iJEKAadPu-fa1K1uiNeyBJTRhRQZzTMMYKcrokC2JSFrCccxJ1t9byNrfsMUnNOj3-OTQrAXSAl19Am6OCgfaFWzjVl5YPVf3GupgGhJBmRedBaW8G_6H-AqevKH1ceNG5dbBp3D3L0Fgzw2tspdNqLhtaA_KNu-8SWlDG-9PoS7XAw4BkGbfTwuccnU" />
              <img alt="Client Logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3UBNo2Y9z-DwUhpHxo0FBHoBNdVha5kzz-3rJrAECOnSbmdZIL0Z4EO6nmx7W4IVAfIovseepgdmxNIVjCOyWoV5etgp_k0UK31QQQHVjXlPtaoDQVE51GmIfFyZuMhLTERQ2_FXJwxOi-4YkNK1LbyU-HFq0eouaw7kqxNEOsHyvNP8CJqDVv9LCEanlJmozlQZl051hLSrVrC72ktKQelNg4vdVVhXuCFn7ld_Fqc1dS8XeAIm4yixtNbEijGf0kx2Ovw2f9fc" />
              <img alt="Client Logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKKqMYfxIBd8BJdP4_3rrXDyMYaST214hHb6SwFCCevLp-PHAs2YNFDq9wibvWFmIIFdBHEkWri5-QUJgiKEK-DiYWfKKJB2VNzhhPreJ1iApR0BfTfPMa9d6nUPA38Mhr2sH1zi6Pm_e54utI8FJiJYoQjs06MtpP8L3YdTS-NeoqEQZSIGO_BpBm1zS_HahuKL2c3A5Ik3V6BTjV7pL0e7FUBv2-q9mj9EhDxDCEul9ndPYFm1VkDtekMBCaGSuNJXIV3qRtawc" />
            </div>
          </div>
        </section>

        {/* Features (Asymmetric Bento Grid) */}
        <section id="features" className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 max-w-2xl">
              <h2 className="text-4xl font-bold text-primary mb-6 font-headline">Designed for Structural Clarity</h2>
              <p className="text-lg text-on-surface-variant">
                We&apos;ve replaced cluttered interfaces with an industrial ledger aesthetic. Every view is optimized for high-density data management without the noise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
              {/* Feature Card 1: Invoicing */}
              <div className="md:col-span-8 bg-surface-container-low p-10 rounded-lg group hover:bg-surface-container-high transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2">
                    <span className="material-symbols-outlined text-4xl text-[#10b981] mb-6 block">receipt_long</span>
                    <h3 className="text-2xl font-bold text-primary mb-4 font-headline">Precision Invoicing</h3>
                    <p className="text-on-surface-variant mb-6 leading-relaxed">
                      Generate architectural-grade invoices that reflect your professional standard. Automated follow-ups and real-time tracking built-in.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-medium text-primary">
                        <span className="material-symbols-outlined text-sm text-[#10b981]">check_circle</span>
                        Multi-currency support
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium text-primary">
                        <span className="material-symbols-outlined text-sm text-[#10b981]">check_circle</span>
                        Automated tax calculations
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-1/2">
                    <img
                      alt="Invoicing Interface"
                      className="rounded shadow-lg border border-outline-variant/10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmdsEPpjEBed9iYw1cSce4VxqCMUF9b1kI0ytKf9g8wwOURU49XYljd9kCNcqsApNbHPHhcr44zQjNWERRgapuS8VLEzU78BP7qO2fy1cPozGc-XYSCCcP9VXkpTOjzJ_DTc6uihr3e_UJHLHYlwG2aF0Ya6BklYuYW9ruIXoR9dpKi7IXZw0upvmUOEGt2o0VTHG0PNxEJ_W67Js6Hha3XH63hStmrI5KPDKGpI3USukcKcV4zuPyfO7YGAc0fuVOjBGgNYtv2WE"
                    />
                  </div>
                </div>
              </div>

              {/* Feature Card 2: Workspace */}
              <div className="md:col-span-4 bg-primary text-white p-10 rounded-lg relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-4xl text-[#10b981] mb-6 block">grid_view</span>
                  <h3 className="text-2xl font-bold mb-4 font-headline">Project Workspace</h3>
                  <p className="text-on-primary-container leading-relaxed mb-8">
                    Unified command center for every client project. Manage timelines, deliverables, and budgets in one high-contrast view.
                  </p>
                </div>
                <div className="mt-4 border-t border-primary-container pt-6">
                  <Link className="inline-flex items-center gap-2 font-bold text-[#10b981] hover:underline" href="/projects">
                    Explore Workspace <span className="material-symbols-outlined text-sm">north_east</span>
                  </Link>
                </div>
              </div>

              {/* Feature Card 3: Dashboard */}
              <div className="md:col-span-4 bg-surface-container-highest p-10 rounded-lg">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">monitoring</span>
                <h3 className="text-2xl font-bold text-primary mb-4 font-headline">Dynamic Dashboards</h3>
                <p className="text-on-surface-variant mb-6">
                  Real-time health scores of your freelance business. No fluff, just the metrics that matter for your growth.
                </p>
                <div className="bg-surface-container-lowest p-4 rounded border border-outline-variant/30 mt-4">
                  <div className="h-2 w-full bg-surface-container-high rounded-full mb-2">
                    <div className="h-full w-[75%] bg-[#10b981] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    <span>Monthly Goal</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>

              {/* Feature Card 4: Security */}
              <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/30 p-10 rounded-lg">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-primary mb-4 font-headline">Industrial Grade Security</h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Your data is stored in fortresses. Bank-level encryption and SOC2 compliance ensure your financial architecture remains private and secure.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-[#10b981] text-white p-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">lock</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-24 bg-primary text-white text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
          />
          <div className="max-w-4xl mx-auto px-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 font-headline">Ready to Professionalize Your Practice?</h2>
            <p className="text-xl text-on-primary-container mb-12 max-w-2xl mx-auto">
              Join thousands of high-performance freelancers who have transitioned to a more precise way of working.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth" className="bg-[#10b981] text-white px-10 py-5 rounded font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl">
                Get Started (Free)
              </Link>
              <Link href="/auth" className="bg-primary-container text-white px-10 py-5 rounded font-bold text-lg hover:bg-opacity-80 transition-all border border-outline-variant/10">
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f4f6] w-full py-12 border-t border-[#c5c6cd]/20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold text-[#1e293b] uppercase tracking-tighter">Smart Pulse</div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              The precision ledger for the modern architectural freelancer. Designed for performance.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex gap-8">
              <a className="text-slate-500 hover:text-[#10b981] transition-all duration-300 tracking-wider text-xs uppercase" href="#">Privacy Policy</a>
              <a className="text-slate-500 hover:text-[#10b981] transition-all duration-300 tracking-wider text-xs uppercase" href="#">Terms of Service</a>
              <a className="text-slate-500 hover:text-[#10b981] transition-all duration-300 tracking-wider text-xs uppercase" href="#">Contact</a>
            </div>
            <span className="text-slate-500 text-xs">© 2024 Smart Pulse. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
