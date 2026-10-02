import { createFileRoute } from "@tanstack/react-router";

// TEMPORARY: one-off catalog builder. Delete after use.
export const Route = createFileRoute("/api/gen-catalog")({
  server: {
    handlers: {
      GET: async () => {
        const token = process.env["TMDB_READ_TOKEN"]!;
        const h = { Authorization: `Bearer ${token}`, accept: "application/json" };
        const get = async (path: string, params: Record<string, string> = {}) => {
          const u = new URL(`https://api.themoviedb.org/3${path}`);
          for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
          for (let i = 0; i < 3; i++) {
            const r = await fetch(u, { headers: h });
            if (r.ok) return r.json() as Promise<any>;
            await new Promise((res) => setTimeout(res, 500));
          }
          return null;
        };
        const ids = new Map<number, number>();
        const add = (list: any) => list?.results?.forEach((m: any) => { if (m.poster_path && m.overview) ids.set(m.id, 1); });
        for (let p = 1; p <= 15; p++) add(await get("/movie/top_rated", { page: String(p) }));
        for (let p = 1; p <= 5; p++) add(await get("/movie/popular", { page: String(p) }));
        const disc = (params: Record<string, string>, pages: number) =>
          Promise.all(Array.from({ length: pages }, (_, i) =>
            get("/discover/movie", { sort_by: "vote_count.desc", "vote_count.gte": "300", page: String(i + 1), ...params }).then(add)));
        await disc({ with_genres: "99" }, 2);
        await disc({ with_genres: "37" }, 2);
        await disc({ with_genres: "10752" }, 2);
        await disc({ with_genres: "27" }, 3);
        await disc({ with_genres: "16" }, 2);
        await disc({ with_genres: "10751" }, 2);
        await disc({ with_genres: "10749" }, 2);
        await disc({ with_genres: "35" }, 2);
        for (const lang of ["ko", "ja", "fr", "es", "hi", "it", "de", "zh", "pt", "fa", "sv", "da", "tr"]) await disc({ with_original_language: lang, "vote_count.gte": "150" }, 1);
        const all = [...ids.keys()];
        const out: any[] = [];
        const queue = [...all];
        await Promise.all(Array.from({ length: 12 }, async () => {
          while (queue.length) {
            const id = queue.shift()!;
            const d = await get(`/movie/${id}`, { append_to_response: "credits,videos,release_dates" });
            if (!d || !d.runtime) continue;
            const trailer = (d.videos?.results ?? []).filter((v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))
              .sort((a: any, b: any) => (b.type === "Trailer" ? 1 : 0) - (a.type === "Trailer" ? 1 : 0) || (b.official ? 1 : 0) - (a.official ? 1 : 0))[0];
            const us = d.release_dates?.results?.find((r: any) => r.iso_3166_1 === "US");
            const cert = us?.release_dates?.find((x: any) => x.certification)?.certification ?? null;
            out.push({
              id: d.id,
              title: d.title,
              originalTitle: d.original_title !== d.title ? d.original_title : undefined,
              year: Number((d.release_date ?? "0").slice(0, 4)),
              genres: d.genres.map((g: any) => g.name),
              runtime: d.runtime,
              rating: Math.round(d.vote_average * 10) / 10,
              votes: d.vote_count,
              overview: d.overview,
              tagline: d.tagline || undefined,
              director: d.credits?.crew?.find((c: any) => c.job === "Director")?.name ?? "Unknown",
              cast: (d.credits?.cast ?? []).slice(0, 5).map((c: any) => c.name),
              country: d.production_countries?.[0]?.name ?? "",
              language: d.spoken_languages?.find((l: any) => l.iso_639_1 === d.original_language)?.english_name ?? d.original_language,
              poster: d.poster_path,
              backdrop: d.backdrop_path ?? undefined,
              trailer: trailer?.key ?? undefined,
              cert: cert ?? undefined,
            });
          }
        }));
        return Response.json(out);
      },
    },
  },
});
