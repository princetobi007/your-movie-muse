import { createFileRoute, Link } from "@tanstack/react-router";
import { MOVIES } from "@/data/movies";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ReelMatch" },
      { name: "description", content: "ReelMatch matches movies to how you feel, so you spend tonight watching instead of scrolling." },
      { property: "og:title", content: "About — ReelMatch" },
      { property: "og:description", content: "ReelMatch matches movies to how you feel, so you spend tonight watching instead of scrolling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const POINTS = [
  ["The problem", "The average person spends close to twenty minutes scrolling before picking something to watch — and often gives up. Huge catalogs make choosing harder, not easier."],
  ["What we do", "ReelMatch starts with how you want to feel, then who's watching and how much time you have. In a few taps you get a short list of films that fit — each with a reason why."],
  ["How it works", `Every film in our collection of ${MOVIES.length}+ is tagged with moods, genres, length and audience. Your answers score each film, a little randomness keeps things fresh, and movies you've marked as watched are left out.`],
  ["Why it's different", "Movie databases tell you everything about a film. ReelMatch tells you which film is right for tonight. Hand-picked titles only — no filler, no paid placements."],
  ["Who it's for", "Couples who can't agree, families looking for something everyone will enjoy, and anyone who's tired of the streaming-menu shuffle."],
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-6xl">Less scrolling.<br /><span className="text-primary">More watching.</span></h1>
      <p className="mt-4 text-lg text-muted-foreground">ReelMatch helps you find a movie that matches how you feel and what you're in the mood to experience — in under a minute.</p>
      <div className="mt-12 space-y-8">
        {POINTS.map(([t, d]) => (
          <section key={t} className="border-l-2 border-primary pl-5">
            <h2 className="font-display text-2xl">{t}</h2>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </section>
        ))}
      </div>
      <Link to="/" className="mt-12 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110">Find my movie</Link>
    </div>
  );
}
