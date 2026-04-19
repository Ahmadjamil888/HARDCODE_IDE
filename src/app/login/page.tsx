'use client';

import * as React from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Globe, ArrowRight, Fingerprint, Command, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOAuthLogin = async (provider: 'google') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white/10 selection:text-white font-sans overflow-hidden">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none app-grid"></div>

      <div className="relative z-10 w-full max-w-[420px] space-y-12">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-black rounded-lg">
               <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_white]" />
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl font-medium tracking-tight">Access Terminal</h1>
            <p className="text-[13px] text-white/30 uppercase tracking-[.2em] font-bold">HardCode AI // Authentication</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl noir-shadow space-y-8">
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Identity (Email)</label>
              <input
                type="email"
                placeholder="developer@hardcode.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-[13px] font-mono tracking-tight text-white outline-none focus:border-white/30 transition-all placeholder:text-white/5"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-1">Access Protocol (Password)</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3.5 text-[13px] font-mono tracking-tight text-white outline-none focus:border-white/30 transition-all placeholder:text-white/5"
                required
              />
            </div>

            {error && (
              <div className="text-[11px] text-red-400 border-l-2 border-red-500/40 pl-4 py-2 bg-red-500/5 font-mono">
                 E_LOG: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-white text-black text-[13px] font-bold tracking-widest uppercase hover:opacity-90 disabled:opacity-20 transition-all flex items-center justify-center gap-3 rounded-lg"
            >
              {loading ? 'Initializing...' : 'Authorize Session'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[.2em]">
              <span className="bg-[#0a0a0a] px-4 text-white/20">or secure link with</span>
            </div>
          </div>

          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="w-full h-14 flex items-center justify-center gap-3 border border-white/10 rounded-lg text-[13px] font-medium hover:bg-white/5 transition-all text-white group"
          >
            <Globe className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            Sign in with Google
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 py-4">
           <div className="flex items-center gap-2.5 text-[10px] tracking-widest text-white/10 uppercase font-mono">
              <ShieldCheck className="w-3.5 h-3.5 opacity-40" />
              Encryption: RSA_4KB // AES_256
           </div>
           <Link href="/" className="text-[11px] text-white/20 hover:text-white/40 transition-all font-mono">← Return to Root</Link>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
