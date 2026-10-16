export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">How it works</p>
        <h1 className="mt-3 text-4xl font-bold text-forest">A transparent rescue flow for everyone</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['For donors', 'List surplus food with quantity, pickup details, and any storage or allergen notes.'],
          ['For NGOs & receivers', 'Browse nearby listings, request the quantity needed, and coordinate pickup.'],
          ['For volunteers', 'Accept pickup tasks, log collection progress, and confirm handover.'],
        ].map(([title, description], index) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">0{index + 1}</div>
            <h2 className="text-2xl font-semibold text-forest">{title}</h2>
            <p className="mt-4 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
