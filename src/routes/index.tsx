import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clapperboard, Clock, RotateCcw, Sparkles, Star } from "lucide-react";
import { ALL_GENRES, DECADES, MOODS, MOVIES, recommend, type Mood, type Movie } from "@/data/movies";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReelMatch — Find your next favorite film" },
      {
        name: "description",
        content:
          "Answer three quick questions and ReelMatch picks the perfect movie for tonight from a hand-curated collection.",
      },
      { property: "og:title", content: "ReelMatch — Find your next favorite film" },
      {
        property: "og:description",
        content:
          "Answer three quick questions and ReelMatch picks the perfect movie for tonight from a hand-curated collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function PosterArt({ movie, large }: { movie: Movie; large?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-4",
        large ? "aspect-[2/3]" : "aspect-[2/3]"
      )}
      style={{
        background: `linear-gradient(160deg, oklch(0.45 0.12 ${movie.hue}) 0%, oklch(0.18 0.06 ${movie.hue}) 70%, oklch(0.12 0.03 ${movie.hue + 40}) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 80% 10%, oklch(0.75 0.15 ${movie.hue} / 0.5), transparent 55%)`,
        }}
      />
      <div className="relative flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
        <span>{movie.year}</span>
        <span className="flex items-center gap-1">
          <Star className="size-3 fill-current" /> {movie.rating.toFixed(1)}
        </span>
      </div>
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-70">
          {movie.genres.join(" · ")}
        </p>
        <h3 className="font-display mt-1 text-2xl leading-none text-balance">{movie.title}</h3>
      </div>
    </div>
  );
}

function Index() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [genre, setGenre] = useState<string>("Any genre");
  const [decade, setDecade] = useState<(typeof DECADES)[number]>("Any era");
  const [results, setResults] = useState<Movie[] | null>(null);

  const genres = useMemo(() => ["Any genre", ...ALL_GENRES], []);

  const canSearch = mood !== null;

  const handleRecommend = () => {
    if (!mood) return;
    setResults(recommend(mood, genre, decade));
  };

  const handleReset = () => {
    setMood(null);
    setGenre("Any genre");
    setDecade("Any era");
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
        <header className="animate-rise text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Clapperboard className="size-3.5 text-primary" />
            {MOVIES.length} hand-picked films
          </div>
          <h1 className="font-display text-6xl text-balance sm:text-8xl">
            Reel<span className="text-primary">Match</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Three quick questions. One perfect movie night. No endless scrolling.
          </p>
        </header>

        {!results && (
          <section className="animate-rise mt-12 space-y-10" style={{ animationDelay: "120ms" }}>
            <div>
              <h2 className="font-display text-2xl text-primary">1 · How do you want to feel?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all",
                      mood === m.id
                        ? "border-primary bg-primary/10 shadow-[0_0_24px_-6px_var(--color-primary)]"
                        : "border-border bg-card hover:border-muted-foreground/40"
                    )}
                  >
                    <span className="font-display text-lg">{m.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{m.tagline}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-primary">2 · Any genre in mind?</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      genre === g
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-muted-foreground/40"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-primary">3 · Which era?</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {DECADES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDecade(d)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      decade === d
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-muted-foreground/40"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleRecommend}
                disabled={!canSearch}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-xl tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles className="size-5" />
                Find my movies
              </button>
            </div>
          </section>
        )}

        {results && (
          <section className="mt-12">
            <div className="animate-rise flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl">
                Tonight's picks <span className="text-primary">· {results.length}</span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleRecommend}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary"
                >
                  <RotateCcw className="size-4" /> Shuffle
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
                >
                  Start over
                </button>
              </div>
            </div>

            {results.length === 0 ? (
              <p className="mt-8 text-center text-muted-foreground">
                Nothing matched that combo — try widening the era or genre.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
                {results.map((m, i) => (
                  <article key={m.title} className="animate-rise" style={{ animationDelay: `${i * 90}ms` }}>
                    <PosterArt movie={m} />
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{m.director}</span>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" /> {m.runtime} min
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.blurb}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
