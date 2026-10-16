import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { loginUser } from '../lib/api';

const demoAccounts = [
  { role: 'Donor', email: 'donor@foodbridge.local' },
  { role: 'Community NGO', email: 'ngo@foodbridge.local' },
  { role: 'Volunteer', email: 'volunteer@foodbridge.local' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginUser(form);
      navigate('/dashboard');
    } catch (loginError) {
      setError(
        loginError.response?.data?.error ||
          'Could not reach FoodBridge. Make sure the API is running, then try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-[calc(100vh-16rem)] overflow-hidden bg-[#f5f7f1]">
      <div className="pointer-events-none absolute -right-48 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-lime-200/30 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#10382b] p-8 text-white shadow-2xl shadow-emerald-950/15 sm:p-10 lg:min-h-[36rem] lg:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-4 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(circle,rgba(185,228,135,0.2),transparent_68%)]" />
          <div className="relative flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" /> Good to see you again
            </div>
            <h1 className="mt-8 max-w-lg text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Let’s get good food
              <span className="block text-[#b9e487]">where it belongs.</span>
            </h1>
            <p className="mt-5 max-w-md leading-7 text-emerald-50/75">
              Sign in to reconnect with your neighborhood, coordinate a pickup, or share food that deserves another day.
            </p>

            <div className="mt-9 space-y-4">
              {[
                'Coordinate trusted community pickups',
                'Keep track of your food rescue activity',
                'Make every surplus meal count',
              ].map((message) => (
                <div key={message} className="flex items-center gap-3 text-sm text-emerald-50/90">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b9e487]/15 text-[#b9e487]"><Check className="h-3.5 w-3.5" /></span>
                  {message}
                </div>
              ))}
            </div>

            <div className="mt-auto hidden rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur sm:block sm:mt-12">
              <p className="text-sm leading-6 text-emerald-50/85">“A small change in where food goes can make a big difference in who gets to eat.”</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#b9e487]">The FoodBridge community</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white bg-white/90 p-7 shadow-[0_24px_80px_rgba(20,63,46,0.08)] backdrop-blur sm:p-10">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900"><ShieldCheck className="h-6 w-6" /></div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Your FoodBridge</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#173d30]">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Use your email and password to continue.</p>
          </div>

          {error && (
            <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8faf7] px-4 py-3.5 transition focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10">
                <Mail className="h-4 w-4 text-emerald-800" />
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  required
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8faf7] px-4 py-3.5 transition focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10">
                <LockKeyhole className="h-4 w-4 text-emerald-800" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  required
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#173d30] px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? 'Signing you in…' : 'Sign in to FoodBridge'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to the network? <Link to="/signup" className="font-bold text-emerald-900 hover:underline">Create an account</Link>
          </p>

          {import.meta.env.DEV && (
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">Try the local demo</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Choose a demo role, then use the shared demo password below.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => setForm({ email: account.email, password: 'Password123!' })}
                    className="rounded-full border border-emerald-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-100"
                    aria-label={`Use ${account.role} demo account`}
                  >
                    {account.role}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">Demo password: <code className="rounded bg-white px-1.5 py-0.5 font-semibold text-emerald-950">Password123!</code></p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
