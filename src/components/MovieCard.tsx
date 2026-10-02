import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Clock, Heart, Play, Star } from "lucide-react";
import { posterUrl, type Movie } from "@/data/movies";
import { useLists } from "@/hooks/use-lists";
import { TrailerDialog } from "./TrailerDialog";
import { cn } from "@/lib/utils";

export function MovieCard({ movie, reasons, index = 0 }: { movie: Movie; reasons?: string[]; index?: number }) {
  const { has, toggle } = useLists();
  const [trailer, setTrailer] = useState(false);
  const fav = has("favorite", movie.id);
  const saved = has("watchlist", movie.id);

  return (
    <article className="animate-rise group relative flex flex-col" style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}>
      <div className="relative overflow-hidden rounded-xl bg-muted shadow-card">
        <Link to="/movie/$id" params={{ id: String(movie.id) }} aria-label={`${movie.title} details`}>
          <img
            src={posterUrl(movie)}
            alt={`Poster for ${movie.title} (${movie.year})`}
            loading="lazy"
            className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-overlay px-2 py-1 text-xs font-bold text-overlay-foreground backdrop-blur">
            <Star className="size-3 fill-primary text-primary" /> {movie.rating.toFixed(1)}
          </span>
        </div>
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          <IconBtn label={fav ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`} active={fav} onClick={() => toggle("favorite", movie.id, movie.title)} activeClass="bg-accent text-accent-foreground">
            <Heart className={cn("size-4", fav && "fill-current")} />
          </IconBtn>
          <IconBtn label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`} active={saved} onClick={() => toggle("watchlist", movie.id, movie.title)} activeClass="bg-primary text-primary-foreground">
            <Bookmark className={cn("size-4", saved && "fill-current")} />
          </IconBtn>
        </div>
        {movie.trailer && (
          <button
            onClick={() => setTrailer(true)}
            className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground opacity-100 shadow-lg transition-opacity sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
          >
            <Play className="size-3 fill-current" /> Trailer
          </button>
        )}
      </div>
      <div className="mt-3 flex-1">
        <Link to="/movie/$id" params={{ id: String(movie.id) }} className="font-display text-xl leading-tight hover:text-primary">
          {movie.title}
        </Link>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
          <span>{movie.year}</span><span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" />{movie.runtime} min</span><span aria-hidden>·</span>
          <span>{movie.genres.slice(0, 2).join(", ")}</span>
        </p>
        {reasons && reasons.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1" aria-label="Why we picked this">
            {reasons.map((r) => (
              <li key={r} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{r}</li>
            ))}
          </ul>
        )}
      </div>
      {movie.trailer && <TrailerDialog movie={movie} open={trailer} onOpenChange={setTrailer} />}
    </article>
  );
}

function IconBtn({ children, label, active, onClick, activeClass }: { children: React.ReactNode; label: string; active: boolean; onClick: () => void; activeClass: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "rounded-full p-2 backdrop-blur transition-all",
        active ? activeClass : "bg-overlay text-overlay-foreground sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
      )}
    >
      {children}
    </button>
  );
}

export function MovieGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}
