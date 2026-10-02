import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, LogOut, Menu, Search, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { SearchBox } from "./SearchBox";

const NAV = [
  { to: "/", label: "Find a movie" },
  { to: "/browse", label: "Browse" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-primary focus:px-3 focus:py-1 focus:text-primary-foreground">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="font-display text-3xl leading-none">Reel<span className="text-primary">Match</span></Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground bg-secondary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <SearchBox className="ml-auto hidden w-72 lg:block" />
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search" className="rounded-full p-2 hover:bg-secondary lg:hidden">
            <Search className="size-5" />
          </button>
          <Link to="/my-list" className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-secondary sm:inline-flex">
            <Bookmark className="size-4 text-primary" /> My lists
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Account menu" className="grid size-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                {(user.email ?? "U")[0]!.toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs">{user.email}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/my-list" })}><User className="mr-2 size-4" />Profile & lists</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 size-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110">Sign in</Link>
          )}
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger aria-label="Open menu" className="rounded-full p-2 hover:bg-secondary md:hidden"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {[...NAV, { to: "/my-list", label: "My lists" }, { to: "/contact", label: "Contact" }].map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 text-lg font-medium hover:bg-secondary" activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "text-primary" }}>
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t border-border px-4 py-3 lg:hidden">
          <SearchBox autoFocus onDone={() => setSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
