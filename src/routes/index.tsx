import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Clapperboard, Clock, Dices, Heart, RotateCcw, Sparkles, Star } from "lucide-react";
import {
  ALL_GENRES,
  DECADES,
  MOODS,
  MOVIES,
  recommend,
  surpriseMe,
  type Mood,
  type Movie,
} from "@/data/movies";
import { getPosters } from "@/lib/posters.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReelMatch — Find your next favorite film" },
      {
        name: "description",
        content:
          "Answer a few quick questions and ReelMatch picks the perfect movie for tonight from a hand-curated collection.",
      },
      { property: "og:title", content: "ReelMatch — Find your next favorite film" },
      {
        property: "og:description",
        content:
          "Answer a few quick questions and ReelMatch picks the perfect movie for tonight from a hand-curated collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FAVORITES_KEY = "reelmatch:favorites";

function PosterArt({ movie, posterUrl }: { movie: Movie; posterUrl?: string | null }) {
  return (
    <div
      className="relative flex aspect-[2/3] w-full flex-col justify-between overflow-hidden rounded-xl p-4"
      style={{
        background: `linear-gradient(160deg, oklch(0.45 0.12 ${movie.hue}) 0%, oklch(0.18 0.06 ${movie.hue}) 70%, oklch(0.12 0.03 ${movie.hue + 40}) 100%)`,
      }}
    >
      {posterUrl && (
        <img
          src={posterUrl}
          alt={`Poster for ${movie.title} (${movie.year})`}
          loading="lazy"
          className="animate-rise absolute inset-0 size-full object-cover"
        />
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          posterUrl
            ? "bg-gradient-to-t from-black/85 via-black/25 to-black/40"
            : "opacity-30"
        )}
        style={
          posterUrl
            ? undefined
            : {
                background: `radial-gradient(circle at 80% 10%, oklch(0.75 0.15 ${movie.hue} / 0.5), transparent 55%)`,
              }
        }
      />
      <div className="relative flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white opacity-90">
        <span>{movie.year}</span>
        <span className="flex items-center gap-1">
          <Star className="size-3 fill-current" /> {movie.rating.toFixed(1)}
        </span>
      </div>
      <div className="relative text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-70">
          {movie.genres.slice(0, 2).join(" · ")}
        </p>
        <h3 className="font-display mt-1 text-2xl leading-none text-balance">{movie.title}</h3>
      </div>
    </div>
  );
}

function MovieCard({
  movie,
  index,
  isFavorite,
  posterUrl,
  onToggleFavorite,
}: {
  movie: Movie;
  index: number;
  isFavorite: boolean;
  posterUrl?: string | null | undefined;
  onToggleFavorite: (title: string) => void;
}) {
  return (
    <article className="animate-rise group relative" style={{ animationDelay: `${index * 90}ms` }}>
      <PosterArt movie={movie} posterUrl={posterUrl} />
      <button
        onClick={() => onToggleFavorite(movie.title)}
        aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Save ${movie.title} to favorites`}
        className={cn(
          "absolute top-2 right-2 rounded-full p-2 backdrop-blur-sm transition-all",
          isFavorite
            ? "bg-accent text-accent-foreground"
            : "bg-black/30 text-white opacity-0 group-hover:opacity-100 focus:opacity-100"
        )}
      >
        <Heart className={cn("size-4", isFavorite && "fill-current")} />
      </button>
      <div className="mt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.director}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {movie.runtime} min
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{movie.blurb}</p>
      </div>
    </article>
  );
}

const RUNTIME_OPTIONS = [
  { label: "Any length", value: null },
  { label: "Under 2 hours", value: 120 },
  { label: "Under 100 min", value: 100 },
  { label: "Under 90 min", value: 90 },
] as const;

function Index() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [genre, setGenre] = useState<string>("Any genre");
  const [decade, setDecade] = useState<(typeof DECADES)[number]>("Any era");
  const [minRating, setMinRating] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState<number | null>(null);
  const [results, setResults] = useState<Movie[] | null>(null);
  const [surprise, setSurprise] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFavorite = (title: string) => {
    setFavorites((prev) => {
      const next = prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const favoriteMovies = useMemo(
    () => MOVIES.filter((m) => favorites.includes(m.title)),
    [favorites]
  );

  const genres = useMemo(() => ["Any genre", ...ALL_GENRES], []);
  const canSearch = mood !== null;

  const handleRecommend = () => {
    if (!mood) return;
    setResults(recommend({ mood, genre, decade, minRating, maxRuntime }));
  };

  const handleSurprise = () => {
    setResults(null);
    setShowFavorites(false);
    setSurprise(surpriseMe());
  };

  const handleReset = () => {
    setMood(null);
    setGenre("Any genre");
    setDecade("Any era");
    setMinRating(0);
    setMaxRuntime(null);
    setResults(null);
    setSurprise(null);
    setShowFavorites(false);
  };

  const showingList = showFavorites ? favoriteMovies : results;

  const [posters, setPosters] = useState<Record<string, string | null>>({});
  const fetchPosters = useServerFn(getPosters);
  const visible = useMemo(
    () => (surprise ? [surprise] : (showingList ?? [])),
    [surprise, showingList]
  );

  const loadPosters = useCallback(async () => {
    const missing = visible.filter((m) => !(m.title in posters)).slice(0, 30);
    if (missing.length === 0) return;
    try {
      const res = await fetchPosters({
        data: { movies: missing.map((m) => ({ title: m.title, year: m.year })) },
      });
      setPosters((prev) => ({ ...prev, ...res }));
    } catch {
      /* keep the illustrated fallback posters */
    }
  }, [visible, posters, fetchPosters]);

  useEffect(() => {
    void loadPosters();
  }, [loadPosters]);

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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleSurprise}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-primary"
            >
              <Dices className="size-4 text-primary" />
              Surprise me
            </button>
            <button
              onClick={() => {
                setShowFavorites(true);
                setResults(null);
                setSurprise(null);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-accent"
            >
              <Heart className="size-4 text-accent" />
              My list ({favorites.length})
            </button>
          </div>
        </header>

        {!results && !surprise && !showFavorites && (
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

            <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
              <div>
                <label htmlFor="rating" className="font-display text-lg text-primary">
                  Minimum rating · {minRating === 0 ? "any" : minRating.toFixed(1)}
                </label>
                <input
                  id="rating"
                  type="range"
                  min={0}
                  max={9}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <span className="font-display text-lg text-primary">Max runtime</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {RUNTIME_OPTIONS.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => setMaxRuntime(o.value)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                        maxRuntime === o.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-muted-foreground/40"
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
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

        {(results || surprise || showFavorites) && (
          <section className="mt-12">
            <div className="animate-rise flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl">
                {showFavorites ? (
                  <>Your saved list <span className="text-accent">· {favoriteMovies.length}</span></>
                ) : surprise ? (
                  <>Feeling lucky <span className="text-primary">· 1</span></>
                ) : (
                  <>Tonight's picks <span className="text-primary">· {results?.length ?? 0}</span></>
                )}
              </h2>
              <div className="flex gap-2">
                {results && (
                  <button
                    onClick={handleRecommend}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary"
                  >
                    <RotateCcw className="size-4" /> Shuffle
                  </button>
                )}
                {surprise && (
                  <button
                    onClick={() => setSurprise(surpriseMe())}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary"
                  >
                    <Dices className="size-4" /> Roll again
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
                >
                  Start over
                </button>
              </div>
            </div>

            {showingList && showingList.length === 0 && !surprise ? (
              <p className="mt-8 text-center text-muted-foreground">
                {showFavorites
                  ? "Nothing saved yet — tap the heart on any movie to build your list."
                  : "Nothing matched that combo — try loosening the filters."}
              </p>
            ) : (
              <div
                className={cn(
                  "mt-8 grid gap-5",
                  surprise ? "mx-auto max-w-xs" : "grid-cols-2 sm:grid-cols-3"
                )}
              >
                {visible.map((m, i) => (
                  <MovieCard
                    key={m.title}
                    movie={m}
                    index={i}
                    posterUrl={posters[m.title]}
                    isFavorite={favorites.includes(m.title)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
