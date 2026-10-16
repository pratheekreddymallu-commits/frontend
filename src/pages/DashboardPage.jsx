import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Bell, HeartHandshake, PackageSearch, ShieldCheck, Truck } from 'lucide-react';
import { getCurrentUser, getDashboardStats } from '../lib/api';

const statCards = [
  { key: 'donationsPosted', label: 'Donations posted', icon: PackageSearch },
  { key: 'activeListings', label: 'Active listings', icon: Activity },
  { key: 'completedPickups', label: 'Completed pickups', icon: Truck },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    donationsPosted: 0,
    activeListings: 0,
    completedPickups: 0,
    requestsMade: 0,
    approved: 0,
    pickupsCompleted: 0,
    totalUsers: 0,
    totalDonations: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const role = currentUser?.role || 'receiver';
        const nextStats = await getDashboardStats(role);
        setStats((prev) => ({ ...prev, ...nextStats }));
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member';
  const isReceiver = user?.role === 'receiver';

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-20 text-center text-slate-600">Loading dashboard...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[2rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Personal dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-forest">Welcome back, {user?.name || 'there'}.</h1>
          </div>
          {isReceiver && (
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-forest ring-1 ring-emerald-200">
              <div className="flex flex-col items-start gap-1 text-left">
                <span>{roleLabel} profile</span>
                <span className="text-xs text-slate-600">{user?.name || 'Receiver'} • {user?.phone || 'No phone'} • {user?.serviceArea || 'No area'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map(({ key, label, icon: Icon }) => (
          <div key={key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <div className="rounded-full bg-emerald-100 p-2 text-forest"><Icon className="h-5 w-5" /></div>
            </div>
            <p className="text-3xl font-black text-forest">{stats[key] ?? 0}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <HeartHandshake className="h-5 w-5 text-forest" />
            <h2 className="text-xl font-bold text-forest">Recent actions</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl bg-emerald-50 p-4">• Active food rescue requests are being matched with local partners.</div>
            <div className="rounded-2xl bg-slate-50 p-4">• Pickup windows are prioritized for freshness and community access.</div>
            <div className="rounded-2xl bg-slate-50 p-4">• Recent safety checks and donor confirmations are up to date.</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-forest" />
            <h2 className="text-xl font-bold text-forest">Operational status</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4">
              <span>Freshness compliance</span>
              <span className="font-semibold text-forest">Healthy</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Pickup coordination</span>
              <span className="font-semibold text-forest">On track</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Notifications</span>
              <span className="inline-flex items-center gap-2 font-semibold text-forest"><Bell className="h-4 w-4" /> 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
