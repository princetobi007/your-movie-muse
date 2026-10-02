import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl">Reel<span className="text-primary">Match</span></p>
          <p className="mt-2 text-sm text-muted-foreground">The right movie for how you feel — in under a minute.</p>
        </div>
        <FooterCol title="Discover" links={[["/", "Find a movie"], ["/browse", "Browse all films"], ["/my-list", "My lists"]]} />
        <FooterCol title="Reel Match" links={[["/about", "About"], ["/faq", "FAQ"], ["/contact", "Contact"]]} />
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Credits</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Movie data and images from{" "}
            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-foreground">TMDB</a>.
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Reel Match</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={to}><Link to={to} className="hover:text-primary">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
