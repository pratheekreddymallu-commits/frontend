import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownWideNarrow,
  ArrowRight,
  Clock3,
  Heart,
  MapPin,
  PackageCheck,
  Search,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { getDonations } from '../lib/api';

const categories = ['All food', 'Produce', 'Prepared Meals', 'Bakery', 'Dairy', 'Pantry'];
const fallbackImage =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85';

const formatDeadline = (deadline) => {
  if (!deadline) return 'Pickup time to be confirmed';
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return 'Pickup time to be confirmed';
  return `Collect by ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
};

export default function ExplorePage() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All food');
  const [sortOrder, setSortOrder] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDonations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getDonations();
      setDonations(response.donations || []);
    } catch (loadError) {
      setError(
        loadError.response?.data?.error ||
          'We couldn’t load the listings. Check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  const filteredDonations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return donations
      .filter((donation) => {
        const matchesCategory = category === 'All food' || donation.category === category;
        const searchableText = [
          donation.title,
          donation.description,
          donation.category,
          donation.pickupAddress,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return matchesCategory && (!query || searchableText.includes(query));
      })
      .sort((first, second) => {
        if (sortOrder === 'deadline') {
          return new Date(first.deadline || 0) - new Date(second.deadline || 0);
        }
        return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
      });
  }, [category, donations, search, sortOrder]);

  return (
    <div className="min-h-[70vh] overflow-hidden bg-[#f6f8f3]">
      <section className="relative isolate overflow-hidden bg-[#10382b] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_16%,rgba(147,197,104,0.28),transparent_34%),radial-gradient(ellipse_at_8%_90%,rgba(36,129,89,0.35),transparent_35%)]" />
        <div className="absolute -right-24 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-24 -z-10 h-[20rem] w-[20rem] rounded-full border border-white/10" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" />
              Community food exchange
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Good food is
              <span className="block text-[#b9e487]">too valuable to waste.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/75 sm:text-lg">
              Find fresh surplus from your neighborhood and help it reach the table—not the landfill.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white px-4 text-slate-500 shadow-xl shadow-black/10 focus-within:ring-4 focus-within:ring-emerald-300/25">
                <Search className="h-5 w-5 shrink-0 text-emerald-800" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try ‘fresh produce’ or ‘bakery’"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  aria-label="Search food donations"
                />
              </label>
              <Link
                to="/signup"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#b9e487] px-6 font-bold text-[#10382b] transition hover:-translate-y-0.5 hover:bg-[#c9f09a]"
              >
                Join the network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-emerald-50/75">
              <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4 text-[#b9e487]" /> Safe, clear listings</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#b9e487]" /> Local pickup</span>
              <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4 text-[#b9e487]" /> Community first</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-emerald-300/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
                alt="A colorful shared meal made with fresh ingredients"
                className="h-72 w-full rounded-[1.4rem] object-cover sm:h-80"
              />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/95 p-4 text-[#173d30] shadow-xl backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">A better kind of surplus</p>
                    <p className="mt-1 font-bold">Shared locally. Rescued together.</p>
                  </div>
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-900"><Utensils className="h-5 w-5" /></div>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 top-7 rounded-2xl bg-[#b9e487] px-4 py-3 text-[#10382b] shadow-lg sm:-right-7">
              <p className="text-xs font-semibold uppercase tracking-wider">Food with purpose</p>
              <p className="mt-0.5 text-lg font-black">Every meal matters</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6 border-b border-emerald-950/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">The neighborhood pantry</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#173d30] sm:text-4xl">Available near you</h2>
            <p className="mt-2 text-slate-600">Browse current offers and find the right pickup for your community.</p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-950/10 bg-white px-4 py-2 text-sm font-semibold text-[#173d30] sm:self-auto">
            <PackageCheck className="h-4 w-4 text-emerald-700" />
            {loading ? 'Finding food…' : `${filteredDonations.length} ${filteredDonations.length === 1 ? 'listing' : 'listings'}`}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? 'bg-[#173d30] text-white shadow-lg shadow-emerald-950/10'
                    : 'border border-emerald-950/10 bg-white text-slate-600 hover:border-emerald-700/30 hover:text-[#173d30]'
                }`}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-950/10 bg-white px-4 py-2.5 text-sm text-slate-600 lg:self-auto">
            <ArrowDownWideNarrow className="h-4 w-4 text-emerald-800" />
            <span className="sr-only">Sort listings</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="bg-transparent font-medium text-[#173d30] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="deadline">Pickup deadline</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="overflow-hidden rounded-[1.75rem] border border-emerald-950/5 bg-white shadow-sm">
                <div className="h-52 animate-pulse bg-emerald-950/5" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded-full bg-emerald-950/5" />
                  <div className="h-6 w-3/4 animate-pulse rounded-lg bg-emerald-950/5" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-emerald-950/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-[1.75rem] border border-amber-200 bg-amber-50 px-6 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm"><PackageCheck className="h-6 w-6" /></div>
            <h3 className="mt-4 text-xl font-bold text-[#173d30]">Listings are taking a little break</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{error}</p>
            <button type="button" onClick={loadDonations} className="mt-5 rounded-full bg-[#173d30] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900">Try again</button>
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-white">
            <div className="grid items-center gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">Fresh starts here</div>
                <h3 className="mt-4 text-2xl font-black text-[#173d30]">
                  {donations.length ? 'No matches this time.' : 'Your next great find is just around the corner.'}
                </h3>
                <p className="mt-2 max-w-xl leading-6 text-slate-600">
                  {donations.length
                    ? 'Try another search or category, or clear your filters to see every available offer.'
                    : 'There are no active donations right now. Check back soon—or join FoodBridge to share surplus with your community.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {donations.length > 0 && (
                    <button
                      type="button"
                      onClick={() => { setSearch(''); setCategory('All food'); }}
                      className="rounded-full border border-emerald-950/15 px-5 py-2.5 text-sm font-semibold text-[#173d30] hover:bg-emerald-50"
                    >
                      Clear filters
                    </button>
                  )}
                  <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#173d30] px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">
                    Become a food partner <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="hidden h-40 w-40 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 lg:flex">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-emerald-900/10 bg-white"><Utensils className="h-10 w-10" /></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDonations.map((donation) => (
              <article key={donation._id} className="group overflow-hidden rounded-[1.75rem] border border-emerald-950/5 bg-white shadow-[0_8px_30px_rgba(20,63,46,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,63,46,0.12)]">
                <div className="relative">
                  <img
                    src={donation.imageUrl || fallbackImage}
                    alt={donation.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    onError={(event) => { event.currentTarget.src = fallbackImage; }}
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-bold text-emerald-900 shadow-sm backdrop-blur">
                    {donation.category || 'Community food'}
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-[#173d30]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {donation.remainingQuantity ?? donation.quantity} {donation.unit || 'portions'} left
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold leading-snug text-[#173d30]">{donation.title}</h3>
                      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                        {donation.description || 'A local food partner has shared this donation with the community.'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-emerald-800" /><span className="line-clamp-1">{donation.pickupAddress || 'Pickup details shared after approval'}</span></p>
                    <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-emerald-800" />{formatDeadline(donation.deadline)}</p>
                  </div>
                  <Link
                    to={`/donations/${donation._id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#173d30] px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
                  >
                    View details & request <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
