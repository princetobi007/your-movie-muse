import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dices, RotateCcw, Sparkles } from "lucide-react";
import {
  ALL_GENRES, AUDIENCES, DECADES, MOODS, MOVIES, recommend, surpriseMe,
  type Audience, type Decade, type Mood, type Pick,
} from "@/data/movies";
import { MovieCard, MovieGrid } from "@/components/MovieCard";
import { useLists } from "@/hooks/use-lists";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReelMatch — Find your next favorite film" },
      { name: "description", content: `Answer a few quick questions and ReelMatch picks the right movie for tonight from ${MOVIES.length}+ hand-picked films.` },
      { property: "og:title", content: "ReelMatch — Find your next favorite film" },
      { property: "og:description", content: "Pick a mood, get the right movie for tonight. Trailers, watchlists and 750+ films." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const RUNTIMES = [
  { label: "Any length", value: null },
  { label: "Under 2 h", value: 120 },
  { label: "Under 100 min", value: 100 },
  { label: "Under 90 min", value: 90 },
] as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-muted-foreground/40"
      )}
    >
      {children}
    </button>
  );
}

function Index() {
  const { lists } = useLists();
  const [mood, setMood] = useState<Mood | null>(null);
  const [audience, setAudience] = useState<Audience>("any");
  const [genre, setGenre] = useState("Any genre");
  const [decade, setDecade] = useState<Decade>("Any era");
  const [minRating, setMinRating] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState<number | null>(null);
  const [gemsOnly, setGemsOnly] = useState(false);
  const [picks, setPicks] = useState<Pick[] | null>(null);
  const [lucky, setLucky] = useState(false);

  const genres = useMemo(() => ["Any genre", ...ALL_GENRES], []);
  const seen = useMemo(() => new Set(lists.watched), [lists.watched]);

  const run = () => {
    if (!mood) return;
    setLucky(false);
    setPicks(recommend({ mood, genre, decade, minRating, maxRuntime, audience, gemsOnly, exclude: seen, count: 8 }));
    requestAnimationFrame(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }));
  };
  const surprise = () => {
    setLucky(true);
    setPicks([{ movie: surpriseMe(seen), reasons: ["Highly rated", "Pure chance"] }]);
  };
  const reset = () => { setPicks(null); setLucky(false); setMood(null); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="animate-rise text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {MOVIES.length} hand-picked films · trailers included
        </p>
        <h1 className="font-display text-6xl text-balance sm:text-8xl">What should we <span className="text-primary">watch</span> tonight?</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">Tell us how you want to feel. We'll find the movie — no endless scrolling.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={surprise} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary">
            <Dices className="size-4 text-primary" /> Surprise me
          </button>
          <Link to="/browse" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary">
            Browse all films
          </Link>
        </div>
      </header>

      {!picks && (
        <section className="animate-rise mx-auto mt-12 max-w-4xl space-y-10" style={{ animationDelay: "120ms" }} aria-label="Movie finder">
          <div>
            <h2 className="font-display text-2xl text-primary">1 · How do you want to feel?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  aria-pressed={mood === m.id}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    mood === m.id ? "border-primary bg-primary/10 shadow-[0_0_24px_-6px_var(--color-primary)]" : "border-border bg-card hover:border-muted-foreground/40"
                  )}
                >
                  <span className="font-display text-lg">{m.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{m.tagline}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-primary">2 · Who's watching?</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {AUDIENCES.map((a) => <Chip key={a.id} active={audience === a.id} onClick={() => setAudience(a.id)}>{a.label}</Chip>)}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-primary">3 · Any genre or era?</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {genres.map((g) => <Chip key={g} active={genre === g} onClick={() => setGenre(g)}>{g}</Chip>)}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {DECADES.map((d) => <Chip key={d} active={decade === d} onClick={() => setDecade(d)}>{d}</Chip>)}
            </div>
          </div>

          <details className="rounded-xl border border-border bg-card p-6">
            <summary className="cursor-pointer font-display text-lg text-primary">More options</summary>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="rating" className="text-sm font-semibold">Minimum rating · {minRating === 0 ? "any" : minRating.toFixed(1)}</label>
                <input id="rating" type="range" min={0} max={8.5} step={0.5} value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-primary)]" />
              </div>
              <div>
                <span className="text-sm font-semibold">Max runtime</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {RUNTIMES.map((o) => <Chip key={o.label} active={maxRuntime === o.value} onClick={() => setMaxRuntime(o.value)}>{o.label}</Chip>)}
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={gemsOnly} onChange={(e) => setGemsOnly(e.target.checked)} className="mt-1 size-4 accent-[var(--color-primary)]" />
                <span><span className="font-semibold">Hidden gems only</span><span className="block text-muted-foreground">Great films fewer people have seen</span></span>
              </label>
            </div>
          </details>

          <div className="flex justify-center">
            <button onClick={run} disabled={!mood} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-xl tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
              <Sparkles className="size-5" /> {mood ? "Find my movies" : "Pick a mood first"}
            </button>
          </div>
        </section>
      )}

      {picks && (
        <section id="results" className="mt-12 scroll-mt-24" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-3xl">{lucky ? "Feeling lucky" : "Tonight's picks"} <span className="text-primary">· {picks.length}</span></h2>
            <div className="flex gap-2">
              <button onClick={lucky ? surprise : run} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary">
                <RotateCcw className="size-4" /> {lucky ? "Roll again" : "Recommend others"}
              </button>
              <button onClick={reset} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110">Start over</button>
            </div>
          </div>
          {picks.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">Nothing matched that combo. Try "Any genre", a wider era, or turn off hidden gems.</p>
              <button onClick={() => setPicks(null)} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Adjust my answers</button>
            </div>
          ) : (
            <div className={cn("mt-8", lucky && "mx-auto max-w-xs")}>
              {lucky ? <MovieCard movie={picks[0]!.movie} reasons={picks[0]!.reasons} /> : (
                <MovieGrid>{picks.map((p, i) => <MovieCard key={p.movie.id} movie={p.movie} reasons={p.reasons} index={i} />)}</MovieGrid>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
