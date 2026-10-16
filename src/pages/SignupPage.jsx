import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, HeartHandshake, Mail, MapPin, ShieldCheck, Sparkles, User } from 'lucide-react';
import { registerUser } from '../lib/api';

const roleOptions = [
  { value: 'donor', label: 'Donor' },
  { value: 'receiver', label: 'Receiver' },
  { value: 'volunteer', label: 'Volunteer' },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receiver',
    phone: '',
    serviceArea: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 700);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to create your account right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-[calc(100vh-16rem)] overflow-hidden bg-[#f5f7f1]">
      <div className="pointer-events-none absolute -left-48 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#10382b] p-8 text-white shadow-2xl shadow-emerald-950/15 sm:p-10">
            <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full border border-white/10" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100"><Sparkles className="h-3.5 w-3.5" /> Join the movement</div>
              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight">Make more of what we have.</h1>
              <p className="mt-4 leading-7 text-emerald-50/75">Create your free profile to donate food, find community support, or help coordinate a safe pickup.</p>

              <div className="mt-9 space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm text-emerald-50/90"><ShieldCheck className="h-5 w-5 shrink-0 text-[#b9e487]" /> Safer, trusted community coordination</div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm text-emerald-50/90"><MapPin className="h-5 w-5 shrink-0 text-[#b9e487]" /> Local food matches that matter</div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm text-emerald-50/90"><HeartHandshake className="h-5 w-5 shrink-0 text-[#b9e487]" /> Real impact, made together</div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6 text-sm text-emerald-50/70">A few details to get started. No complicated setup.</div>
            </div>
          </div>

        <div className="rounded-[2rem] border border-white bg-white/90 p-7 shadow-[0_24px_80px_rgba(20,63,46,0.08)] backdrop-blur sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Create a profile</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#173d30]">Start your FoodBridge journey</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Choose how you’d like to contribute. You can update your details later.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Your account is ready — redirecting to dashboard.
              </div>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10">
                <User className="h-4 w-4 text-slate-500" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Morgan" className="w-full border-0 bg-transparent text-sm outline-none" required />
              </div>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full border-0 bg-transparent text-sm outline-none" required />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
                <input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" className="w-full rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 text-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10" />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Create password</span>
              <input type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 8 characters" className="w-full rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 text-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10" required minLength={8} />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 text-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10">
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Service area</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8faf7] px-3 py-3.5 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <input value={form.serviceArea} onChange={(e) => setForm({ ...form, serviceArea: e.target.value })} placeholder="City or region" className="w-full border-0 bg-transparent text-sm outline-none" />
                </div>
              </label>
            </div>

            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#173d30] px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-70">
              {loading ? 'Creating account...' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-forest">Log in</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
