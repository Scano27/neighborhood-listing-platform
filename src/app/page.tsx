export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Neighborhood Listing Platform - Updated!
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            A simple platform for discovering neighborhood properties,
            connecting with local sponsors, and getting helpful information
            through accessible voice assistance.
          </p>
        </header>

        <section
          aria-labelledby="features-heading"
          className="grid gap-6 md:grid-cols-3"
        >
          <h2 id="features-heading" className="sr-only">
            Platform Features
          </h2>

          <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Listings</h3>
            <p className="mt-3 leading-7 text-slate-700">
              Browse neighborhood property listings and find information
              about available properties.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Neighborhood Sponsors</h3>
            <p className="mt-3 leading-7 text-slate-700">
              Discover local businesses and organizations that support the
              neighborhoods they serve.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Voice Help</h3>
            <p className="mt-3 leading-7 text-slate-700">
              Provide accessible voice assistance to help users find
              neighborhood and property information.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}