import { ArrowRight, BadgeCheck, Building2, Clock3, HeartHandshake, Leaf, MapPin, ShieldCheck, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDonations, getPublicImpact } from '../lib/api';

const chartData = [
  { name: 'Jan', donated: 28 },
  { name: 'Feb', donated: 34 },
  { name: 'Mar', donated: 41 },
  { name: 'Apr', donated: 46 },
  { name: 'May', donated: 52 },
  { name: 'Jun', donated: 58 },
];

export default function LandingPage() {
  const [impact, setImpact] = useState({ stats: { activeDonations: 0, completedDonations: 0, totalQuantity: 0 } });
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [impactResponse, donationsResponse] = await Promise.all([
          getPublicImpact(),
          getDonations(),
        ]);
        setImpact(impactResponse);
        setDonations((donationsResponse.donations || []).slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              <Leaf className="h-3.5 w-3.5" />
              Food rescue network
            </span>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-forest sm:text-5xl">Good Food Deserves a Second Chance.</h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">FoodBridge connects donors, communities, and volunteers so surplus food reaches people who need it while reducing waste with transparency and care.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 font-semibold text-white shadow-soft transition hover:-translate-y-0.5">Donate Food <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 font-semibold text-forest">Find Food</Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl font-extrabold text-forest">{impact.stats.completedDonations || 0}</p>
                <p className="text-sm text-slate-600">Completed rescues</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-forest">{impact.stats.totalQuantity || 0}</p>
                <p className="text-sm text-slate-600">Kg redirected</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-forest">{impact.stats.activeDonations || 0}</p>
                <p className="text-sm text-slate-600">Live listings</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-3 shadow-soft">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80" alt="Food donation volunteers" className="h-[520px] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-emerald-100">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-700"><HeartHandshake className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">This week</p>
                  <p className="text-lg font-bold text-forest">178 meals rescued</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-forest">From surplus to shared meals in four simple steps</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Leaf, title: 'List surplus food', text: 'Restaurants and households post food they can safely share.' },
            { icon: MapPin, title: 'Match nearby needs', text: 'NGOs and receivers browse food near them by category and timing.' },
            { icon: Truck, title: 'Coordinate pickup', text: 'Approved requests create a pickup plan with trusted volunteers.' },
            { icon: BadgeCheck, title: 'Measure impact', text: 'Completed rescues update verified impact and community outcomes.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-3 text-forest"><Icon className="h-6 w-6" /></div>
              <h3 className="mb-3 text-xl font-semibold text-forest">{title}</h3>
              <p className="text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Who it serves</p>
            <h2 className="mt-3 text-3xl font-bold text-forest">Built for recovery, access, and community care</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-ivory p-6">
              <Building2 className="mb-4 h-8 w-8 text-forest" />
              <h3 className="text-xl font-semibold text-forest">Donors</h3>
              <p className="mt-3 text-slate-600">Restaurants, hotels, supermarkets, and households can list food before it expires.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-ivory p-6">
              <Users className="mb-4 h-8 w-8 text-forest" />
              <h3 className="text-xl font-semibold text-forest">NGOs & Receivers</h3>
              <p className="mt-3 text-slate-600">Community kitchens, shelters, and neighborhood groups discover nearby donations.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-ivory p-6">
              <Clock3 className="mb-4 h-8 w-8 text-forest" />
              <h3 className="text-xl font-semibold text-forest">Volunteers</h3>
              <p className="mt-3 text-slate-600">Pickup coordinators confirm safe, timely handover from donor to receiver.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Featured listings</p>
            <h2 className="mt-2 text-3xl font-bold text-forest">Available in your area</h2>
          </div>
          <Link to="/explore" className="font-semibold text-forest">View all</Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((key) => (
              <div key={key} className="h-80 animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {donations.map((donation) => (
              <article key={donation._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img src={donation.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'} alt={donation.title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{donation.category}</span>
                    <span className="text-sm text-slate-500">{donation.remainingQuantity} left</span>
                  </div>
                  <h3 className="text-xl font-semibold text-forest">{donation.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{donation.pickupAddress}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span>Deadline: {new Date(donation.deadline).toLocaleDateString()}</span>
                    <span className="font-medium text-emerald-700">{donation.status}</span>
                  </div>
                  <Link to={`/donations/${donation._id}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">View Details <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-emerald-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Safety first</p>
            <h2 className="mt-3 text-3xl font-bold text-forest">Trusted food handling without shortcuts</h2>
            <ul className="mt-8 space-y-5">
              {[
                'Items are listed only when donors provide a realistic safe-use deadline.',
                'Pickup instructions and handling notes help volunteers and receivers avoid risk.',
                'Unverified or unsafe listings can be reviewed and hidden by the admin team.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <ShieldCheck className="mt-1 h-5 w-5 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-emerald-100">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-forest">Impact overview</h3>
              <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">2026</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donated" fill="#123b2a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Voices from the network</p>
          <h2 className="mt-3 text-3xl font-bold text-forest">Community stories</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { quote: 'FoodBridge helped us rescue meals before they were thrown away and getting them to families the same day.', name: 'Maya, Restaurant Owner' },
            { quote: 'The platform made it easier for our shelter to plan pickups, reduce waste, and serve more people.', name: 'Daniel, Shelter Lead' },
            { quote: 'I could support safe collection logistics without needing a huge coordination overhead.', name: 'Fatima, Volunteer' },
          ].map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg text-slate-700">“{item.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-forest">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-forest">Questions people ask</h2>
          </div>
          <div className="space-y-4">
            {[
              ['How does FoodBridge verify food safety?', 'The platform requires important handling details, pickup windows, and disclosure of known allergens. It does not certify food safety on its own.'],
              ['Who can request food?', 'Eligible NGOs, shelters, community kitchens, and authorized receivers can submit requests after creating an account.'],
              ['Can volunteers participate?', 'Yes. Volunteers can take pickup tasks and update status as a donation moves from donor to receiver.'],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-2xl border border-slate-200 bg-ivory p-5">
                <h3 className="font-semibold text-forest">{question}</h3>
                <p className="mt-2 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
