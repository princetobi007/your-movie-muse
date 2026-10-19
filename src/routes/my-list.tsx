import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getMovie, type Movie } from "@/data/movies";
import { MovieCard, MovieGrid } from "@/components/MovieCard";
import { useLists, type ListName } from "@/hooks/use-lists";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

// Public on purpose: lists work on this device without an account, and sync once signed in.
export const Route = createFileRoute("/my-list")({
  head: () => ({
    meta: [
      { title: "My lists — ReelMatch" },
      { name: "description", content: "Your ReelMatch watchlist, favorites and watched movies." },
      { property: "og:title", content: "My lists — ReelMatch" },
      { property: "og:description", content: "Your ReelMatch watchlist, favorites and watched movies." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyList,
});

const TABS: { id: ListName; label: string; empty: string }[] = [
  { id: "watchlist", label: "Watchlist", empty: "Tap the bookmark on any movie to save it for later." },
  { id: "favorite", label: "Favorites", empty: "Tap the heart on movies you love." },
  { id: "watched", label: "Watched", empty: "Mark movies as watched on their page — we'll stop recommending them." },
];

function MyList() {
  const { lists } = useLists();
  const { user } = useAuth();
  const [tab, setTab] = useState<ListName>("watchlist");
  const movies = lists[tab].map(getMovie).filter(Boolean).reverse() as Movie[];
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl">My lists</h1>
      {user ? (
        <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email} — your lists are saved to your account.</p>
      ) : (
        <p className="mt-2 rounded-lg border border-border bg-card p-4 text-sm">
          Saved on this device only. <Link to="/auth" className="font-semibold text-primary underline">Sign in</Link> to keep your lists on every device.
        </p>
      )}
      <div role="tablist" className="mt-8 flex gap-2">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold", tab === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card")}>
            {t.label} · {lists[t.id].length}
          </button>
        ))}
      </div>
      {movies.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">{current.empty}</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Find a movie</Link>
        </div>
      ) : (
        <div className="mt-8"><MovieGrid>{movies.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}</MovieGrid></div>
      )}
    </div>
  );
}
