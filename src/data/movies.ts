export type Mood = "thrilled" | "moved" | "laugh" | "think" | "escape" | "scared";

export interface Movie {
  title: string;
  year: number;
  genres: string[];
  moods: Mood[];
  rating: number; // IMDb-ish
  runtime: number; // minutes
  blurb: string;
  director: string;
  hue: number; // poster art hue
}

export const MOODS: { id: Mood; label: string; tagline: string }[] = [
  { id: "thrilled", label: "Thrilled", tagline: "Adrenaline & edge-of-seat tension" },
  { id: "moved", label: "Moved", tagline: "Stories that hit the heart" },
  { id: "laugh", label: "Laughing", tagline: "Comedy gold, zero thinking required" },
  { id: "think", label: "Thinking", tagline: "Mind-benders and slow burns" },
  { id: "escape", label: "Escaping", tagline: "Other worlds, grand adventures" },
  { id: "scared", label: "Scared", tagline: "Lights-on horror and dread" },
];

export const DECADES = ["Any era", "1970s–80s", "1990s", "2000s", "2010s", "2020s"] as const;

export const MOVIES: Movie[] = [
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Sci-Fi"], moods: ["thrilled", "escape"], rating: 8.1, runtime: 120, blurb: "A high-octane chase across a post-apocalyptic wasteland that never lets up.", director: "George Miller", hue: 25 },
  { title: "John Wick: Chapter 4", year: 2023, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 7.7, runtime: 169, blurb: "Balletic gun-fu taken to operatic extremes across Osaka, Berlin and Paris.", director: "Chad Stahelski", hue: 265 },
  { title: "Heat", year: 1995, genres: ["Crime", "Thriller"], moods: ["thrilled", "think"], rating: 8.3, runtime: 170, blurb: "De Niro and Pacino circle each other in Mann's cat-and-mouse crime epic.", director: "Michael Mann", hue: 210 },
  { title: "The Dark Knight", year: 2008, genres: ["Action", "Crime"], moods: ["thrilled", "think"], rating: 9.0, runtime: 152, blurb: "Ledger's Joker turns Gotham into a pressure cooker of chaos.", director: "Christopher Nolan", hue: 220 },
  { title: "Die Hard", year: 1988, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 8.2, runtime: 132, blurb: "One cop, one skyscraper, twelve terrorists. The blueprint for action cinema.", director: "John McTiernan", hue: 15 },
  { title: "The Shawshank Redemption", year: 1994, genres: ["Drama"], moods: ["moved", "think"], rating: 9.3, runtime: 142, blurb: "Hope, patience and friendship behind prison walls. The most beloved film ever made.", director: "Frank Darabont", hue: 35 },
  { title: "Forrest Gump", year: 1994, genres: ["Drama", "Romance"], moods: ["moved", "laugh"], rating: 8.8, runtime: 142, blurb: "One simple man's accidental journey through decades of American history.", director: "Robert Zemeckis", hue: 90 },
  { title: "Past Lives", year: 2023, genres: ["Romance", "Drama"], moods: ["moved"], rating: 7.8, runtime: 106, blurb: "Childhood sweethearts reconnect across oceans and decades in Celine Song's aching debut.", director: "Celine Song", hue: 340 },
  { title: "The Green Mile", year: 1999, genres: ["Drama", "Fantasy"], moods: ["moved"], rating: 8.6, runtime: 189, blurb: "A death row guard witnesses a miracle that changes everything he believes.", director: "Frank Darabont", hue: 130 },
  { title: "Cinema Paradiso", year: 1988, genres: ["Drama", "Romance"], moods: ["moved"], rating: 8.5, runtime: 155, blurb: "A filmmaker remembers the projectionist who gave him his love of movies.", director: "Giuseppe Tornatore", hue: 45 },
  { title: "Aftersun", year: 2022, genres: ["Drama"], moods: ["moved", "think"], rating: 7.7, runtime: 102, blurb: "A father-daughter holiday remembered twenty years later. Devastating and quiet.", director: "Charlotte Wells", hue: 190 },
  { title: "Superbad", year: 2007, genres: ["Comedy"], moods: ["laugh"], rating: 7.6, runtime: 113, blurb: "Two best friends, one fake ID, and the most chaotic night of high school.", director: "Greg Mottola", hue: 55 },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Comedy", "Drama"], moods: ["laugh", "escape"], rating: 8.1, runtime: 99, blurb: "Wes Anderson's confection of a concierge, a lobby boy and a stolen painting.", director: "Wes Anderson", hue: 350 },
  { title: "Airplane!", year: 1980, genres: ["Comedy"], moods: ["laugh"], rating: 7.7, runtime: 88, blurb: "The joke-per-minute record holder. Surely you can't be serious.", director: "Abrahams & Zucker", hue: 200 },
  { title: "Palm Springs", year: 2020, genres: ["Comedy", "Romance"], moods: ["laugh", "think"], rating: 7.4, runtime: 90, blurb: "A wedding guest relives the same day forever — and finds company in the loop.", director: "Max Barbakow", hue: 300 },
  { title: "Inception", year: 2010, genres: ["Sci-Fi", "Thriller"], moods: ["think", "escape", "thrilled"], rating: 8.8, runtime: 148, blurb: "Dreams within dreams within dreams, folded like Parisian streets.", director: "Christopher Nolan", hue: 230 },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Drama"], moods: ["think", "escape"], rating: 8.0, runtime: 164, blurb: "A replicant hunts a secret that could shatter the world. Visually peerless.", director: "Denis Villeneuve", hue: 20 },
  { title: "Primer", year: 2004, genres: ["Sci-Fi", "Thriller"], moods: ["think"], rating: 6.9, runtime: 77, blurb: "Two engineers accidentally build a time machine. Bring a flowchart.", director: "Shane Carruth", hue: 160 },
  { title: "Arrival", year: 2016, genres: ["Sci-Fi", "Drama"], moods: ["think", "moved"], rating: 7.9, runtime: 116, blurb: "A linguist deciphers an alien language — and rethinks time itself.", director: "Denis Villeneuve", hue: 260 },
  { title: "No Country for Old Men", year: 2007, genres: ["Crime", "Thriller"], moods: ["think", "thrilled"], rating: 8.2, runtime: 122, blurb: "A hunter finds two million dollars. Something relentless finds him.", director: "Coen Brothers", hue: 30 },
  { title: "Mulholland Drive", year: 2001, genres: ["Mystery", "Drama"], moods: ["think"], rating: 7.9, runtime: 147, blurb: "Lynch's Hollywood nightmare: identity, dreams and a blue key.", director: "David Lynch", hue: 280 },
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Fantasy"], moods: ["escape", "moved"], rating: 8.6, runtime: 125, blurb: "A girl wanders into a bathhouse for spirits. Miyazaki's masterpiece.", director: "Hayao Miyazaki", hue: 170 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, genres: ["Fantasy", "Adventure"], moods: ["escape", "moved"], rating: 8.9, runtime: 178, blurb: "Nine walkers set out from Rivendell. The journey that defined fantasy cinema.", director: "Peter Jackson", hue: 80 },
  { title: "Dune: Part Two", year: 2024, genres: ["Sci-Fi", "Adventure"], moods: ["escape", "thrilled"], rating: 8.5, runtime: 166, blurb: "Paul Atreides rides the worm and embraces a terrible destiny.", director: "Denis Villeneuve", hue: 40 },
  { title: "Raiders of the Lost Ark", year: 1981, genres: ["Adventure", "Action"], moods: ["escape", "thrilled"], rating: 8.4, runtime: 115, blurb: "Snakes, boulders, Nazis and the perfect adventure film.", director: "Steven Spielberg", hue: 35 },
  { title: "Everything Everywhere All at Once", year: 2022, genres: ["Sci-Fi", "Comedy", "Drama"], moods: ["escape", "laugh", "moved", "think"], rating: 7.8, runtime: 139, blurb: "A laundromat owner fights for her family across the multiverse.", director: "Daniels", hue: 310 },
  { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Adventure"], moods: ["escape", "moved", "think"], rating: 8.7, runtime: 169, blurb: "Love is the one thing that transcends time and space.", director: "Christopher Nolan", hue: 215 },
  { title: "Alien", year: 1979, genres: ["Horror", "Sci-Fi"], moods: ["scared", "thrilled"], rating: 8.5, runtime: 117, blurb: "In space, no one can hear you scream. Still the scariest haunted-house film.", director: "Ridley Scott", hue: 140 },
  { title: "The Shining", year: 1980, genres: ["Horror"], moods: ["scared", "think"], rating: 8.4, runtime: 146, blurb: "A writer, an empty hotel, and a long, long winter. Kubrick's nightmare.", director: "Stanley Kubrick", hue: 10 },
  { title: "Get Out", year: 2017, genres: ["Horror", "Mystery"], moods: ["scared", "think"], rating: 7.8, runtime: 104, blurb: "A weekend meeting the parents becomes something far more sinister.", director: "Jordan Peele", hue: 250 },
  { title: "Hereditary", year: 2018, genres: ["Horror", "Drama"], moods: ["scared"], rating: 7.3, runtime: 127, blurb: "Grief unspools into pure dread in Aster's relentless debut.", director: "Ari Aster", hue: 0 },
  { title: "The Thing", year: 1982, genres: ["Horror", "Sci-Fi"], moods: ["scared", "think"], rating: 8.2, runtime: 109, blurb: "Paranoia in Antarctica: any one of them could be the thing.", director: "John Carpenter", hue: 195 },
  { title: "Goodfellas", year: 1990, genres: ["Crime", "Drama"], moods: ["thrilled", "think"], rating: 8.7, runtime: 145, blurb: "As far back as I can remember, I always wanted to be a gangster.", director: "Martin Scorsese", hue: 355 },
  { title: "Parasite", year: 2019, genres: ["Thriller", "Drama", "Comedy"], moods: ["think", "thrilled", "laugh"], rating: 8.5, runtime: 132, blurb: "One family cons its way into another's home. Then the doorbell rings.", director: "Bong Joon Ho", hue: 100 },
  { title: "Whiplash", year: 2014, genres: ["Drama"], moods: ["thrilled", "moved"], rating: 8.5, runtime: 106, blurb: "Not quite my tempo. A drummer bleeds for greatness.", director: "Damien Chazelle", hue: 50 },
  { title: "The Silence of the Lambs", year: 1991, genres: ["Thriller", "Crime", "Horror"], moods: ["scared", "think", "thrilled"], rating: 8.6, runtime: 118, blurb: "Clarice Starling trades confidences with Hannibal Lecter.", director: "Jonathan Demme", hue: 270 },
  { title: "La La Land", year: 2016, genres: ["Romance", "Drama", "Comedy"], moods: ["moved", "laugh"], rating: 8.0, runtime: 128, blurb: "Two dreamers fall in love under the Los Angeles stars.", director: "Damien Chazelle", hue: 290 },
  { title: "Spirited comedy chaos in Bridesmaids", year: 2011, genres: ["Comedy"], moods: ["laugh"], rating: 6.8, runtime: 125, blurb: "A maid of honor unravels gloriously before her best friend's wedding.", director: "Paul Feig", hue: 320 },
];

function decadeMatch(year: number, decade: (typeof DECADES)[number]): boolean {
  switch (decade) {
    case "Any era": return true;
    case "1970s–80s": return year >= 1970 && year < 1990;
    case "1990s": return year >= 1990 && year < 2000;
    case "2000s": return year >= 2000 && year < 2010;
    case "2010s": return year >= 2010 && year < 2020;
    case "2020s": return year >= 2020;
  }
}

export function recommend(mood: Mood, genre: string | "Any genre", decade: (typeof DECADES)[number], count = 6): Movie[] {
  const scored = MOVIES
    .filter((m) => decadeMatch(m.year, decade))
    .map((m) => {
      let score = 0;
      if (m.moods[0] === mood) score += 3;
      else if (m.moods.includes(mood)) score += 2;
      if (genre !== "Any genre" && m.genres.includes(genre)) score += 2;
      score += m.rating / 10;
      return { m, score };
    })
    .filter((s) => s.score > 0.7)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.m);
}

export const ALL_GENRES = [...new Set(MOVIES.flatMap((m) => m.genres))].sort();
