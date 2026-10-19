import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ReelMatch" },
      { name: "description", content: "Answers about how ReelMatch picks movies, accounts, trailers, ratings and more." },
      { property: "og:title", content: "FAQ — ReelMatch" },
      { property: "og:description", content: "Answers about how ReelMatch picks movies, accounts, trailers, ratings and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

const FAQS: [string, string][] = [
  ["What is ReelMatch?", "A movie finder that starts with your mood. Answer a few quick questions and get a short list of films that fit tonight."],
  ["How does ReelMatch recommend movies?", "Each film is tagged with moods, genres, length and audience. We score every film against your answers, add a little variety, skip movies you've marked as watched, and show the reasons behind each pick."],
  ["Do I need an account?", "No. You can find, search, watch trailers and save movies without one — they're kept on your device. Sign in to keep your lists safe and see them on any device."],
  ["Is ReelMatch free?", "Yes, completely free."],
  ["How do I save movies?", "Tap the heart (Favorites) or bookmark (Watchlist) on any movie, or use the buttons on its page. Find everything under My lists."],
  ["Where do the ratings come from?", "Ratings, posters and cast details come from The Movie Database (TMDB), a community-built movie database."],
  ["How do I change the website language?", "The site is in English for now. More languages are on the way."],
  ["Why isn't a specific movie available?", "Our collection is hand-picked rather than everything ever made. If you think a film belongs here, suggest it."],
  ["How can I suggest a movie?", "Use the Contact page and choose “Movie suggestion”."],
  ["How do trailers work?", "Press Trailer on a card or Watch trailer on a movie's page. Trailers play from YouTube right inside ReelMatch and only load when you ask for them."],
  ["How can I contact ReelMatch?", "Through the Contact page — we read every message."],
];

function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-6xl">Questions, <span className="text-primary">answered</span></h1>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map(([q, a], i) => (
          <AccordionItem key={q} value={`q${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-10 text-sm text-muted-foreground">Still stuck? <Link to="/contact" className="text-primary underline">Get in touch</Link>.</p>
    </div>
  );
}
