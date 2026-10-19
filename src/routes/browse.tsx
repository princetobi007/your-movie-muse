import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { ALL_GENRES, ALL_LANGUAGES, DECADES, MOVIES, inDecade, isHiddenGem, searchMovies, type Decade } from "@/data/movies";
import { MovieCard, MovieGrid } from "@/components/MovieCard";

const searchSchema = z.object({
  q: z.string().optional(),
  genre: z.string().optional(),
  decade: z.string().optional(),
  language: z.string().optional(),
  sort: z.enum(["rating", "newest", "oldest", "gems"]).optional(),
});

export const Route = createFileRoute("/browse")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Browse & search movies — ReelMatch" },
      { name: "description", content: "Search hundreds of hand-picked films by title, actor, director, year or genre." },
      { property: "og:title", content: "Browse & search movies — ReelMatch" },
      { property: "og:description", content: "Search hundreds of hand-picked films by title, actor, director, year or genre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Browse,
});

const PAGE = 24;
const sel = "h-10 rounded-full border border-border bg-card px-4 text-sm focus:border-primary focus:outline-none";

function Browse() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });
  const [limit, setLimit] = useState(PAGE);
  const set = (patch: Partial<z.infer<typeof searchSchema>>) => {
    setLimit(PAGE);
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  };

  const results = useMemo(() => {
    let list = s.q ? searchMovies(s.q) : [...MOVIES];
    if (s.genre) list = list.filter((m) => m.genres.includes(s.genre!));
    if (s.decade) list = list.filter((m) => inDecade(m.year, s.decade as Decade));
    if (s.language) list = list.filter((m) => m.language === s.language);
    if (s.sort === "gems") list = list.filter(isHiddenGem);
    if (!s.q || s.sort) {
      const sort = s.sort ?? "rating";
      list.sort((a, b) => sort === "newest" ? b.year - a.year : sort === "oldest" ? a.year - b.year : b.rating - a.rating);
    }
    return list;
  }, [s]);

  const hasFilters = !!(s.q || s.genre || s.decade || s.language || s.sort);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-5xl">{s.q ? <>Results for “<span className="text-primary">{s.q}</span>”</> : "Browse films"}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{results.length} movies</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="f-genre">Genre</label>
        <select id="f-genre" className={sel} value={s.genre ?? ""} onChange={(e) => set({ genre: e.target.value || undefined })}>
          <option value="">All genres</option>
          {ALL_GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <label className="sr-only" htmlFor="f-decade">Era</label>
        <select id="f-decade" className={sel} value={s.decade ?? ""} onChange={(e) => set({ decade: e.target.value || undefined })}>
          <option value="">All eras</option>
          {DECADES.slice(1).map((d) => <option key={d}>{d}</option>)}
        </select>
        <label className="sr-only" htmlFor="f-lang">Language</label>
        <select id="f-lang" className={sel} value={s.language ?? ""} onChange={(e) => set({ language: e.target.value || undefined })}>
          <option value="">All languages</option>
          {ALL_LANGUAGES.map((l) => <option key={l}>{l}</option>)}
        </select>
        <label className="sr-only" htmlFor="f-sort">Sort</label>
        <select id="f-sort" className={sel} value={s.sort ?? ""} onChange={(e) => set({ sort: (e.target.value || undefined) as never })}>
          <option value="">{s.q ? "Best match" : "Top rated"}</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="gems">Hidden gems</option>
        </select>
        {hasFilters && (
          <button onClick={() => navigate({ search: {}, replace: true })} className="inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">
            <X className="size-4" /> Clear all
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="font-display text-2xl">No movies found</p>
          <p className="mt-2 text-sm text-muted-foreground">Check the spelling, try an actor or director's name, or clear the filters. Missing a film? Suggest it on the Contact page.</p>
          <p className="mt-6 text-sm font-semibold">Popular right now</p>
          <div className="mx-auto mt-4 max-w-3xl">
            <MovieGrid>{[...MOVIES].sort((a, b) => b.votes - a.votes).slice(0, 4).map((m) => <MovieCard key={m.id} movie={m} />)}</MovieGrid>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8"><MovieGrid>{results.slice(0, limit).map((m, i) => <MovieCard key={m.id} movie={m} index={i % PAGE} />)}</MovieGrid></div>
          {limit < results.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setLimit((l) => l + PAGE)} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary">Show more ({results.length - limit} left)</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
