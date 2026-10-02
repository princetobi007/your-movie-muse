import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Film, Search, User, X } from "lucide-react";
import { suggest } from "@/data/movies";
import { cn } from "@/lib/utils";

const RECENT_KEY = "reelmatch:recent-searches";

export function SearchBox({ className, autoFocus, onDone }: { className?: string; autoFocus?: boolean; onDone?: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")); } catch { /* ignore */ }
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const items = q.trim().length >= 2 ? suggest(q) : recent.map((r) => ({ label: r, kind: "recent" as const }));

  const go = (term: string, movieId?: number) => {
    setOpen(false);
    setQ("");
    onDone?.();
    if (movieId) { navigate({ to: "/movie/$id", params: { id: String(movieId) } }); return; }
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r !== t)].slice(0, 5);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    navigate({ to: "/browse", search: { q: t } });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const it = items[active];
          if (it) go(it.label, "id" in it ? it.id : undefined); else go(q);
        }}
      >
        <label htmlFor="site-search" className="sr-only">Search movies, actors, directors</label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="site-search"
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search title, actor, director, year…"
          autoComplete="off"
          role="combobox"
          aria-expanded={open && items.length > 0}
          aria-controls="search-suggestions"
          className="h-10 w-full rounded-full border border-border bg-secondary pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        )}
      </form>
      {open && items.length > 0 && (
        <ul id="search-suggestions" role="listbox" className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-xl">
          {q.trim().length < 2 && <li className="px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Recent</li>}
          {items.map((it, i) => (
            <li key={it.label} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(it.label.replace(/ \(\d{4}\)$/, ""), "id" in it ? it.id : undefined)}
                className={cn("flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-secondary", i === active && "bg-secondary")}
              >
                {it.kind === "person" ? <User className="size-4 text-muted-foreground" /> : it.kind === "movie" ? <Film className="size-4 text-primary" /> : <Search className="size-4 text-muted-foreground" />}
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
