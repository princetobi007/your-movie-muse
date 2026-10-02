import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

export type ListName = "watchlist" | "favorite" | "watched";
type Lists = Record<ListName, number[]>;
const EMPTY: Lists = { watchlist: [], favorite: [], watched: [] };
const LOCAL_KEY = "reelmatch:lists";
const LABEL: Record<ListName, string> = { watchlist: "Watchlist", favorite: "Favorites", watched: "Watched" };

const ListsContext = createContext<{
  lists: Lists;
  has: (list: ListName, id: number) => boolean;
  toggle: (list: ListName, id: number, title?: string) => void;
}>({ lists: EMPTY, has: () => false, toggle: () => {} });

export function ListsProvider({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const [lists, setLists] = useState<Lists>(EMPTY);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        setLists(raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY);
      } catch { setLists(EMPTY); }
      return;
    }
    (async () => {
      // Move anything saved before signing in into the account
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (raw) {
          const local: Lists = { ...EMPTY, ...JSON.parse(raw) };
          const rows = (Object.keys(local) as ListName[]).flatMap((l) => local[l].map((movie_id) => ({ user_id: user.id, movie_id, list: l })));
          if (rows.length) await supabase.from("user_movies").upsert(rows, { onConflict: "user_id,movie_id,list", ignoreDuplicates: true });
          localStorage.removeItem(LOCAL_KEY);
        }
      } catch { /* ignore */ }
      const { data, error } = await supabase.from("user_movies").select("movie_id,list");
      if (error) { toast.error("Couldn't load your lists"); return; }
      const next: Lists = { watchlist: [], favorite: [], watched: [] };
      for (const r of data ?? []) next[r.list as ListName].push(r.movie_id);
      setLists(next);
    })();
  }, [user, ready]);

  const has = useCallback((l: ListName, id: number) => lists[l].includes(id), [lists]);

  const toggle = useCallback((l: ListName, id: number, title?: string) => {
    const on = lists[l].includes(id);
    const next = { ...lists, [l]: on ? lists[l].filter((x) => x !== id) : [...lists[l], id] };
    setLists(next);
    toast.success(`${title ?? "Movie"} ${on ? "removed from" : "added to"} ${LABEL[l]}`);
    if (!user) {
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return;
    }
    const req = on
      ? supabase.from("user_movies").delete().match({ user_id: user.id, movie_id: id, list: l })
      : supabase.from("user_movies").insert({ user_id: user.id, movie_id: id, list: l });
    req.then(({ error }) => {
      if (error) { toast.error("Couldn't save that change"); setLists(lists); }
    });
  }, [lists, user]);

  return <ListsContext.Provider value={{ lists, has, toggle }}>{children}</ListsContext.Provider>;
}

export const useLists = () => useContext(ListsContext);
