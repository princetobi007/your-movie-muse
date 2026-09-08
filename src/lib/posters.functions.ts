import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  movies: z
    .array(z.object({ title: z.string(), year: z.number() }))
    .max(30),
});

export const getPosters = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env["TMDB_READ_TOKEN"];
    if (!token) return {} as Record<string, string | null>;

    const entries = await Promise.all(
      data.movies.map(async ({ title, year }) => {
        try {
          const url = new URL("https://api.themoviedb.org/3/search/movie");
          url.searchParams.set("query", title);
          url.searchParams.set("year", String(year));
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
          });
          if (!res.ok) return [title, null] as const;
          const json = (await res.json()) as { results?: { poster_path?: string | null }[] };
          const path = json.results?.[0]?.poster_path ?? null;
          return [title, path ? `https://image.tmdb.org/t/p/w500${path}` : null] as const;
        } catch {
          return [title, null] as const;
        }
      })
    );

    return Object.fromEntries(entries) as Record<string, string | null>;
  });
