import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Check, Clock, Globe, Heart, Play, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { backdropUrl, getMovie, MOODS, posterUrl, similarMovies } from "@/data/movies";
import { MovieCard, MovieGrid } from "@/components/MovieCard";
import { useLists, type ListName } from "@/hooks/use-lists";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/movie/$id")({
  loader: ({ params }) => {
    const movie = getMovie(Number(params.id));
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Movie not found — ReelMatch" }, { name: "robots", content: "noindex" }] };
    const m = loaderData.movie;
    const title = `${m.title} (${m.year}) — ReelMatch`;
    const img = backdropUrl(m);
    return {
      meta: [
        { title },
        { name: "description", content: m.overview },
        { property: "og:title", content: title },
        { property: "og:description", content: m.overview },
        { property: "og:type", content: "video.movie" },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Movie not found</h1>
      <p className="mt-2 text-muted-foreground">It may not be in our collection yet.</p>
      <Link to="/browse" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Browse films</Link>
    </div>
  ),
  errorComponent: () => <p className="py-24 text-center text-muted-foreground">This movie couldn't load. Please refresh.</p>,
  component: MovieDetail,
});

function MovieDetail() {
  const { movie: m } = Route.useLoaderData();
  const { has, toggle } = useLists();
  const [playing, setPlaying] = useState(false);
  const similar = similarMovies(m, 8);
  const moodNames = m.moods.map((x) => MOODS.find((o) => o.id === x)!.label.toLowerCase());

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: m.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch { /* cancelled */ }
  };

  const ListBtn = ({ list, icon: Icon, on, off }: { list: ListName; icon: typeof Heart; on: string; off: string }) => {
    const active = has(list, m.id);
    return (
      <button onClick={() => toggle(list, m.id, m.title)} aria-pressed={active} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all", active ? "border-primary bg-primary/15 text-primary" : "border-border bg-card hover:border-primary")}>
        <Icon className={cn("size-4", active && list !== "watched" && "fill-current")} /> {active ? on : off}
      </button>
    );
  };

  return (
    <article>
      <div className="relative h-72 overflow-hidden sm:h-96">
        <img src={backdropUrl(m)} alt="" className="size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="mx-auto -mt-48 max-w-6xl px-4 sm:-mt-64">
        <div className="relative grid gap-8 md:grid-cols-[280px_1fr]">
          <img src={posterUrl(m, "w500")} alt={`Poster for ${m.title}`} className="mx-auto w-48 rounded-xl shadow-card md:w-full" />
          <div className="animate-rise">
            <p className="text-sm text-muted-foreground">{m.genres.join(" · ")}</p>
            <h1 className="font-display text-5xl leading-none sm:text-7xl">{m.title}</h1>
            {m.originalTitle && <p className="mt-1 text-sm text-muted-foreground">{m.originalTitle}</p>}
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1 font-bold"><Star className="size-4 fill-primary text-primary" />{m.rating.toFixed(1)}</span>
              <span>{m.year}</span>
              <span className="inline-flex items-center gap-1"><Clock className="size-4" />{Math.floor(m.runtime / 60)}h {m.runtime % 60}m</span>
              {m.cert && <span className="rounded border border-border px-1.5 text-xs">{m.cert}</span>}
              <span className="inline-flex items-center gap-1"><Globe className="size-4" />{m.language} · {m.country}</span>
            </p>
            {m.tagline && <p className="mt-4 italic text-muted-foreground">“{m.tagline}”</p>}
            <p className="mt-3 max-w-2xl leading-relaxed">{m.overview}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {m.trailer && (
                <button onClick={() => setPlaying(true)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110">
                  <Play className="size-4 fill-current" /> Watch trailer
                </button>
              )}
              <ListBtn list="watchlist" icon={Bookmark} on="On watchlist" off="Watchlist" />
              <ListBtn list="favorite" icon={Heart} on="Favorite" off="Favorite" />
              <ListBtn list="watched" icon={Check} on="Watched" off="Mark watched" />
              <button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary"><Share2 className="size-4" /> Share</button>
            </div>

            <dl className="mt-8 grid max-w-2xl gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Director</dt><dd className="mt-1"><Link to="/browse" search={{ q: m.director }} className="hover:text-primary">{m.director}</Link></dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Starring</dt><dd className="mt-1 flex flex-wrap gap-x-2">{m.cast.map((c) => <Link key={c} to="/browse" search={{ q: c }} className="hover:text-primary">{c}</Link>)}</dd></div>
            </dl>

            <div className="mt-8 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h2 className="font-display text-xl text-primary">Why ReelMatch recommends it</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick this when you want to feel {moodNames.join(" or ")}. It's {m.rating >= 8 ? "one of the highest-rated films in our collection" : "a well-loved"} {m.genres[0]?.toLowerCase()} film{m.runtime <= 100 ? " that won't eat your whole evening" : ""}.
              </p>
            </div>
          </div>
        </div>

        {playing && m.trailer && (
          <section className="mt-10" aria-label="Trailer">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${m.trailer}?autoplay=1&rel=0`} title={`${m.title} trailer`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            </div>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-display text-3xl">If you like this</h2>
          <div className="mt-6"><MovieGrid>{similar.map((s, i) => <MovieCard key={s.id} movie={s} index={i} />)}</MovieGrid></div>
        </section>
      </div>
    </article>
  );
}
