import catalog from "./catalog.json";

export type Mood = "thrilled" | "moved" | "laugh" | "think" | "escape" | "scared";

export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  year: number;
  genres: string[];
  moods: Mood[];
  runtime: number;
  rating: number;
  votes: number;
  overview: string;
  tagline?: string;
  director: string;
  cast: string[];
  country: string;
  language: string;
  poster: string;
  backdrop?: string;
  trailer?: string;
  cert?: string;
}

export const MOVIES = catalog as Movie[];
const BY_ID = new Map(MOVIES.map((m) => [m.id, m]));
export const getMovie = (id: number) => BY_ID.get(id);

export const posterUrl = (m: Movie, size: "w342" | "w500" | "w780" = "w342") =>
  `https://image.tmdb.org/t/p/${size}${m.poster}`;
export const backdropUrl = (m: Movie) =>
  m.backdrop ? `https://image.tmdb.org/t/p/w1280${m.backdrop}` : posterUrl(m, "w780");

export const MOODS: { id: Mood; label: string; tagline: string }[] = [
  { id: "thrilled", label: "Thrilled", tagline: "Adrenaline & edge-of-seat tension" },
  { id: "moved", label: "Moved", tagline: "Stories that hit the heart" },
  { id: "laugh", label: "Laughing", tagline: "Comedy gold, zero thinking required" },
  { id: "think", label: "Thinking", tagline: "Mind-benders and slow burns" },
  { id: "escape", label: "Escaping", tagline: "Other worlds, grand adventures" },
  { id: "scared", label: "Scared", tagline: "Lights-on horror and dread" },
];

export const DECADES = ["Any era", "Before 1970", "1970s–80s", "1990s", "2000s", "2010s", "2020s"] as const;
export type Decade = (typeof DECADES)[number];

export function inDecade(year: number, d: Decade) {
  switch (d) {
    case "Before 1970": return year < 1970;
    case "1970s–80s": return year >= 1970 && year < 1990;
    case "1990s": return year >= 1990 && year < 2000;
    case "2000s": return year >= 2000 && year < 2010;
    case "2010s": return year >= 2010 && year < 2020;
    case "2020s": return year >= 2020;
    default: return true;
  }
}

export const ALL_GENRES = [...new Set(MOVIES.flatMap((m) => m.genres))].sort();
export const ALL_LANGUAGES = [...new Set(MOVIES.map((m) => m.language))].sort();
export const isInternational = (m: Movie) => m.language !== "English";
export const isHiddenGem = (m: Movie) => m.votes < 4000 && m.rating >= 7.2;

export type Audience = "any" | "alone" | "date" | "friends" | "family";
export const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "any", label: "Doesn't matter" },
  { id: "alone", label: "Just me" },
  { id: "date", label: "Date night" },
  { id: "friends", label: "Friends" },
  { id: "family", label: "Family & kids" },
];

export interface RecommendOptions {
  mood: Mood;
  genre: string;
  decade: Decade;
  minRating: number;
  maxRuntime: number | null;
  audience: Audience;
  gemsOnly: boolean;
  exclude?: Set<number>;
  count?: number;
}

export interface Pick {
  movie: Movie;
  reasons: string[];
}

const FAMILY_SAFE = new Set(["G", "PG"]);
const moodLabel = (m: Mood) => MOODS.find((x) => x.id === m)!.label.toLowerCase();

export function recommend(o: RecommendOptions): Pick[] {
  const scored: { movie: Movie; score: number; reasons: string[] }[] = [];
  for (const m of MOVIES) {
    if (o.exclude?.has(m.id)) continue;
    if (!m.moods.includes(o.mood)) continue;
    if (o.genre !== "Any genre" && !m.genres.includes(o.genre)) continue;
    if (!inDecade(m.year, o.decade)) continue;
    if (m.rating < o.minRating) continue;
    if (o.maxRuntime && m.runtime > o.maxRuntime) continue;
    if (o.audience === "family" && !(m.genres.includes("Family") || m.genres.includes("Animation") || FAMILY_SAFE.has(m.cert ?? ""))) continue;
    if (o.gemsOnly && !isHiddenGem(m)) continue;

    const reasons: string[] = [];
    let score = m.rating + Math.random() * 2.2;
    if (m.moods[0] === o.mood) { score += 1; }
    reasons.push(`Leaves you ${moodLabel(o.mood)}`);
    if (o.genre !== "Any genre") reasons.push(`${o.genre} as requested`);
    else reasons.push(m.genres.slice(0, 2).join(" + "));
    if (o.audience === "date" && m.genres.includes("Romance")) { score += 1.2; reasons.push("Great for a date"); }
    if (o.audience === "friends" && (m.genres.includes("Comedy") || m.genres.includes("Action") || m.genres.includes("Horror"))) { score += 1; reasons.push("Fun with a group"); }
    if (o.audience === "family") reasons.push("Family friendly");
    if (o.maxRuntime) reasons.push(`Only ${m.runtime} min`);
    if (isHiddenGem(m)) reasons.push("Hidden gem");
    else if (m.rating >= 8.2) reasons.push(`Rated ${m.rating.toFixed(1)}`);
    scored.push({ movie: m, score, reasons: reasons.slice(0, 3) });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, o.count ?? 6)
    .map(({ movie, reasons }) => ({ movie, reasons }));
}

export function surpriseMe(exclude?: Set<number>): Movie {
  const pool = MOVIES.filter((m) => m.rating >= 7.3 && !exclude?.has(m.id));
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function similarMovies(movie: Movie, n = 6): Movie[] {
  return MOVIES.filter((m) => m.id !== movie.id)
    .map((m) => {
      let s = m.genres.filter((g) => movie.genres.includes(g)).length * 2;
      s += m.moods.filter((x) => movie.moods.includes(x)).length;
      if (m.director === movie.director) s += 3;
      s += m.cast.filter((c) => movie.cast.includes(c)).length * 1.5;
      s -= Math.abs(m.year - movie.year) / 25;
      s += m.rating / 5;
      return { m, s };
    })
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.m);
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function searchMovies(q: string): Movie[] {
  const n = norm(q.trim());
  if (!n) return [];
  const year = /^\d{4}$/.test(n) ? Number(n) : null;
  return MOVIES.map((m) => {
    let s = 0;
    const t = norm(m.title);
    if (t === n) s += 100;
    else if (t.startsWith(n)) s += 60;
    else if (t.includes(n)) s += 40;
    if (m.originalTitle && norm(m.originalTitle).includes(n)) s += 30;
    if (year && m.year === year) s += 50;
    if (norm(m.director).includes(n)) s += 35;
    if (m.cast.some((c) => norm(c).includes(n))) s += 30;
    if (m.genres.some((g) => norm(g) === n)) s += 25;
    if (norm(m.language) === n || norm(m.country).includes(n)) s += 20;
    if (n.length > 3 && norm(m.overview).includes(n)) s += 10;
    return { m, s: s ? s + m.rating / 10 : 0 };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.m);
}

export function suggest(q: string): { label: string; kind: "movie" | "person"; id?: number }[] {
  const n = norm(q.trim());
  if (n.length < 2) return [];
  const out: { label: string; kind: "movie" | "person"; id?: number }[] = [];
  for (const m of searchMovies(q).slice(0, 5)) out.push({ label: `${m.title} (${m.year})`, kind: "movie", id: m.id });
  const people = new Set<string>();
  for (const m of MOVIES) {
    for (const p of [m.director, ...m.cast]) if (norm(p).includes(n)) people.add(p);
    if (people.size > 3) break;
  }
  for (const p of [...people].slice(0, 3)) out.push({ label: p, kind: "person" });
  return out;
}
