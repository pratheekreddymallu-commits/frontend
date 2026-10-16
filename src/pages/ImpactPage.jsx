export default function ImpactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Impact</p>
        <h1 className="mt-3 text-4xl font-bold text-forest">Verified donation outcomes</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Active Listings', '32'],
          ['Completed Pickups', '216'],
          ['Meals Redirected', '4,280*'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-4 text-4xl font-black text-forest">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600">* Estimates are derived from completed verified donation records and should be treated as directional unless the underlying dataset is fully audited.</p>
    </div>
  );
}
