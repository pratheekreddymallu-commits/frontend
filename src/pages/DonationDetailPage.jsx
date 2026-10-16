import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { getDonation } from '../lib/api';

export default function DonationDetailPage() {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getDonation(id);
        setDonation(response.donation);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [id]);

  if (!donation) {
    return <div className="mx-auto max-w-5xl px-4 py-20 text-center text-slate-600">Loading donation details...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-soft">
          <img src={donation.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'} alt={donation.title} className="h-[420px] w-full rounded-[1.5rem] object-cover" />
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">{donation.category}</span>
            <h1 className="mt-4 text-3xl font-bold text-forest">{donation.title}</h1>
            <p className="mt-4 text-slate-600">{donation.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div><p className="text-slate-500">Available quantity</p><p className="mt-1 font-semibold text-forest">{donation.remainingQuantity} {donation.unit}</p></div>
              <div><p className="text-slate-500">Deadline</p><p className="mt-1 font-semibold text-forest">{new Date(donation.deadline).toLocaleDateString()}</p></div>
            </div>
            <button className="mt-6 w-full rounded-full bg-forest px-4 py-3 font-semibold text-white">Request Food</button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-forest">Pickup & safety</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-forest" /> {donation.pickupAddress}</li>
              <li className="flex gap-2"><Clock3 className="mt-0.5 h-4 w-4 text-forest" /> {donation.pickupWindow || 'Pickup window not specified'}</li>
              <li className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-forest" /> {donation.storageConditions || 'Storage information not provided'}</li>
              <li className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" /> Known allergens: {donation.allergens?.length ? donation.allergens.join(', ') : 'Not specified'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
