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
  // ── Thrilled / Action / Crime ─────────────────────────────
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Sci-Fi"], moods: ["thrilled", "escape"], rating: 8.1, runtime: 120, blurb: "A high-octane chase across a post-apocalyptic wasteland that never lets up.", director: "George Miller", hue: 25 },
  { title: "John Wick: Chapter 4", year: 2023, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 7.7, runtime: 169, blurb: "Balletic gun-fu taken to operatic extremes across Osaka, Berlin and Paris.", director: "Chad Stahelski", hue: 265 },
  { title: "Heat", year: 1995, genres: ["Crime", "Thriller"], moods: ["thrilled", "think"], rating: 8.3, runtime: 170, blurb: "De Niro and Pacino circle each other in Mann's cat-and-mouse crime epic.", director: "Michael Mann", hue: 210 },
  { title: "The Dark Knight", year: 2008, genres: ["Action", "Crime"], moods: ["thrilled", "think"], rating: 9.0, runtime: 152, blurb: "Ledger's Joker turns Gotham into a pressure cooker of chaos.", director: "Christopher Nolan", hue: 220 },
  { title: "Die Hard", year: 1988, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 8.2, runtime: 132, blurb: "One cop, one skyscraper, twelve terrorists. The blueprint for action cinema.", director: "John McTiernan", hue: 15 },
  { title: "Goodfellas", year: 1990, genres: ["Crime", "Drama"], moods: ["thrilled", "think"], rating: 8.7, runtime: 145, blurb: "As far back as I can remember, I always wanted to be a gangster.", director: "Martin Scorsese", hue: 355 },
  { title: "Whiplash", year: 2014, genres: ["Drama"], moods: ["thrilled", "moved"], rating: 8.5, runtime: 106, blurb: "Not quite my tempo. A drummer bleeds for greatness.", director: "Damien Chazelle", hue: 50 },
  { title: "The Raid", year: 2011, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 7.6, runtime: 101, blurb: "A SWAT team fights floor by floor up a tenement of killers. Pure momentum.", director: "Gareth Evans", hue: 5 },
  { title: "Mission: Impossible – Fallout", year: 2018, genres: ["Action", "Thriller"], moods: ["thrilled", "escape"], rating: 7.7, runtime: 147, blurb: "Cruise jumps out of actual planes. The franchise at its vertiginous peak.", director: "Christopher McQuarrie", hue: 200 },
  { title: "Se7en", year: 1995, genres: ["Crime", "Mystery", "Thriller"], moods: ["thrilled", "scared", "think"], rating: 8.6, runtime: 127, blurb: "Two detectives hunt a killer preaching through the seven deadly sins.", director: "David Fincher", hue: 60 },
  { title: "Sicario", year: 2015, genres: ["Thriller", "Crime", "Drama"], moods: ["thrilled", "think"], rating: 7.7, runtime: 121, blurb: "An FBI agent is pulled into the cartel war's moral black hole.", director: "Denis Villeneuve", hue: 30 },
  { title: "The Bourne Identity", year: 2002, genres: ["Action", "Thriller"], moods: ["thrilled"], rating: 7.9, runtime: 119, blurb: "A man fished from the sea discovers he's very good at violence.", director: "Doug Liman", hue: 190 },
  { title: "Casino Royale", year: 2006, genres: ["Action", "Thriller"], moods: ["thrilled", "escape"], rating: 8.0, runtime: 144, blurb: "Bond earns his 00 status and loses the one thing he can't replace.", director: "Martin Campbell", hue: 230 },
  // ── Moved / Drama / Romance ───────────────────────────────
  { title: "The Shawshank Redemption", year: 1994, genres: ["Drama"], moods: ["moved", "think"], rating: 9.3, runtime: 142, blurb: "Hope, patience and friendship behind prison walls. The most beloved film ever made.", director: "Frank Darabont", hue: 35 },
  { title: "Forrest Gump", year: 1994, genres: ["Drama", "Romance"], moods: ["moved", "laugh"], rating: 8.8, runtime: 142, blurb: "One simple man's accidental journey through decades of American history.", director: "Robert Zemeckis", hue: 90 },
  { title: "Past Lives", year: 2023, genres: ["Romance", "Drama"], moods: ["moved"], rating: 7.8, runtime: 106, blurb: "Childhood sweethearts reconnect across oceans and decades in Celine Song's aching debut.", director: "Celine Song", hue: 340 },
  { title: "The Green Mile", year: 1999, genres: ["Drama", "Fantasy"], moods: ["moved"], rating: 8.6, runtime: 189, blurb: "A death row guard witnesses a miracle that changes everything he believes.", director: "Frank Darabont", hue: 130 },
  { title: "Cinema Paradiso", year: 1988, genres: ["Drama", "Romance"], moods: ["moved"], rating: 8.5, runtime: 155, blurb: "A filmmaker remembers the projectionist who gave him his love of movies.", director: "Giuseppe Tornatore", hue: 45 },
  { title: "Aftersun", year: 2022, genres: ["Drama"], moods: ["moved", "think"], rating: 7.7, runtime: 102, blurb: "A father-daughter holiday remembered twenty years later. Devastating and quiet.", director: "Charlotte Wells", hue: 190 },
  { title: "La La Land", year: 2016, genres: ["Romance", "Drama", "Comedy"], moods: ["moved", "laugh"], rating: 8.0, runtime: 128, blurb: "Two dreamers fall in love under the Los Angeles stars.", director: "Damien Chazelle", hue: 290 },
  { title: "Coco", year: 2017, genres: ["Animation", "Family", "Fantasy"], moods: ["moved", "escape"], rating: 8.4, runtime: 105, blurb: "A boy crosses into the Land of the Dead to find his family's music.", director: "Lee Unkrich", hue: 280 },
  { title: "Schindler's List", year: 1993, genres: ["Drama", "History"], moods: ["moved", "think"], rating: 9.0, runtime: 195, blurb: "One man's list becomes a lifeline in humanity's darkest hour.", director: "Steven Spielberg", hue: 0 },
  { title: "The Pursuit of Happyness", year: 2006, genres: ["Drama"], moods: ["moved"], rating: 8.0, runtime: 117, blurb: "A homeless father fights for his son and one unpaid internship.", director: "Gabriele Muccino", hue: 210 },
  { title: "Manchester by the Sea", year: 2016, genres: ["Drama"], moods: ["moved"], rating: 7.8, runtime: 137, blurb: "A janitor returns home to face a grief that won't be solved.", director: "Kenneth Lonergan", hue: 205 },
  { title: "Up", year: 2009, genres: ["Animation", "Adventure", "Family"], moods: ["moved", "escape", "laugh"], rating: 8.3, runtime: 96, blurb: "Ten minutes of married life, then a house carried away by balloons.", director: "Pete Docter", hue: 45 },
  // ── Laugh / Comedy ────────────────────────────────────────
  { title: "Superbad", year: 2007, genres: ["Comedy"], moods: ["laugh"], rating: 7.6, runtime: 113, blurb: "Two best friends, one fake ID, and the most chaotic night of high school.", director: "Greg Mottola", hue: 55 },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Comedy", "Drama"], moods: ["laugh", "escape"], rating: 8.1, runtime: 99, blurb: "Wes Anderson's confection of a concierge, a lobby boy and a stolen painting.", director: "Wes Anderson", hue: 350 },
  { title: "Airplane!", year: 1980, genres: ["Comedy"], moods: ["laugh"], rating: 7.7, runtime: 88, blurb: "The joke-per-minute record holder. Surely you can't be serious.", director: "Abrahams & Zucker", hue: 200 },
  { title: "Palm Springs", year: 2020, genres: ["Comedy", "Romance", "Sci-Fi"], moods: ["laugh", "think"], rating: 7.4, runtime: 90, blurb: "A wedding guest relives the same day forever — and finds company in the loop.", director: "Max Barbakow", hue: 300 },
  { title: "Bridesmaids", year: 2011, genres: ["Comedy"], moods: ["laugh"], rating: 6.8, runtime: 125, blurb: "A maid of honor unravels gloriously before her best friend's wedding.", director: "Paul Feig", hue: 320 },
  { title: "Monty Python and the Holy Grail", year: 1975, genres: ["Comedy", "Adventure", "Fantasy"], moods: ["laugh", "escape"], rating: 8.2, runtime: 91, blurb: "King Arthur quests for the Grail with coconuts for horses.", director: "Gilliam & Jones", hue: 70 },
  { title: "The Nice Guys", year: 2016, genres: ["Comedy", "Crime", "Mystery"], moods: ["laugh", "thrilled"], rating: 7.4, runtime: 116, blurb: "A bruiser and a deadbeat PI bumble through 1970s LA noir.", director: "Shane Black", hue: 25 },
  { title: "Groundhog Day", year: 1993, genres: ["Comedy", "Fantasy", "Romance"], moods: ["laugh", "moved"], rating: 8.0, runtime: 101, blurb: "A weatherman relives the same day until he gets it right.", director: "Harold Ramis", hue: 190 },
  { title: "Game Night", year: 2018, genres: ["Comedy", "Crime"], moods: ["laugh", "thrilled"], rating: 6.9, runtime: 100, blurb: "A couples' game night collides with a real kidnapping. Maybe.", director: "Daley & Goldstein", hue: 260 },
  // ── Think / Mind-benders ──────────────────────────────────
  { title: "Inception", year: 2010, genres: ["Sci-Fi", "Thriller"], moods: ["think", "escape", "thrilled"], rating: 8.8, runtime: 148, blurb: "Dreams within dreams within dreams, folded like Parisian streets.", director: "Christopher Nolan", hue: 230 },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Drama"], moods: ["think", "escape"], rating: 8.0, runtime: 164, blurb: "A replicant hunts a secret that could shatter the world. Visually peerless.", director: "Denis Villeneuve", hue: 20 },
  { title: "Primer", year: 2004, genres: ["Sci-Fi", "Thriller"], moods: ["think"], rating: 6.9, runtime: 77, blurb: "Two engineers accidentally build a time machine. Bring a flowchart.", director: "Shane Carruth", hue: 160 },
  { title: "Arrival", year: 2016, genres: ["Sci-Fi", "Drama"], moods: ["think", "moved"], rating: 7.9, runtime: 116, blurb: "A linguist deciphers an alien language — and rethinks time itself.", director: "Denis Villeneuve", hue: 260 },
  { title: "No Country for Old Men", year: 2007, genres: ["Crime", "Thriller"], moods: ["think", "thrilled"], rating: 8.2, runtime: 122, blurb: "A hunter finds two million dollars. Something relentless finds him.", director: "Coen Brothers", hue: 30 },
  { title: "Mulholland Drive", year: 2001, genres: ["Mystery", "Drama"], moods: ["think"], rating: 7.9, runtime: 147, blurb: "Lynch's Hollywood nightmare: identity, dreams and a blue key.", director: "David Lynch", hue: 280 },
  { title: "Parasite", year: 2019, genres: ["Thriller", "Drama", "Comedy"], moods: ["think", "thrilled", "laugh"], rating: 8.5, runtime: 132, blurb: "One family cons its way into another's home. Then the doorbell rings.", director: "Bong Joon Ho", hue: 100 },
  { title: "Memento", year: 2000, genres: ["Mystery", "Thriller"], moods: ["think"], rating: 8.4, runtime: 113, blurb: "A man without memory hunts his wife's killer in reverse.", director: "Christopher Nolan", hue: 215 },
  { title: "The Prestige", year: 2006, genres: ["Drama", "Mystery", "Sci-Fi"], moods: ["think", "thrilled"], rating: 8.5, runtime: 130, blurb: "Two magicians destroy each other over the perfect trick.", director: "Christopher Nolan", hue: 270 },
  { title: "2001: A Space Odyssey", year: 1968, genres: ["Sci-Fi"], moods: ["think", "escape"], rating: 8.3, runtime: 149, blurb: "Kubrick's monolith-to-Starchild journey beyond language.", director: "Stanley Kubrick", hue: 250 },
  { title: "Fight Club", year: 1999, genres: ["Drama", "Thriller"], moods: ["think", "thrilled"], rating: 8.8, runtime: 139, blurb: "The first rule is that you already know the first rule.", director: "David Fincher", hue: 10 },
  { title: "The Matrix", year: 1999, genres: ["Sci-Fi", "Action"], moods: ["think", "thrilled", "escape"], rating: 8.7, runtime: 136, blurb: "Take the red pill and see how deep the rabbit hole goes.", director: "The Wachowskis", hue: 120 },
  // ── Escape / Adventure / Fantasy ──────────────────────────
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Fantasy", "Family"], moods: ["escape", "moved"], rating: 8.6, runtime: 125, blurb: "A girl wanders into a bathhouse for spirits. Miyazaki's masterpiece.", director: "Hayao Miyazaki", hue: 170 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, genres: ["Fantasy", "Adventure"], moods: ["escape", "moved"], rating: 8.9, runtime: 178, blurb: "Nine walkers set out from Rivendell. The journey that defined fantasy cinema.", director: "Peter Jackson", hue: 80 },
  { title: "Dune: Part Two", year: 2024, genres: ["Sci-Fi", "Adventure"], moods: ["escape", "thrilled"], rating: 8.5, runtime: 166, blurb: "Paul Atreides rides the worm and embraces a terrible destiny.", director: "Denis Villeneuve", hue: 40 },
  { title: "Raiders of the Lost Ark", year: 1981, genres: ["Adventure", "Action"], moods: ["escape", "thrilled"], rating: 8.4, runtime: 115, blurb: "Snakes, boulders, Nazis and the perfect adventure film.", director: "Steven Spielberg", hue: 35 },
  { title: "Everything Everywhere All at Once", year: 2022, genres: ["Sci-Fi", "Comedy", "Drama"], moods: ["escape", "laugh", "moved", "think"], rating: 7.8, runtime: 139, blurb: "A laundromat owner fights for her family across the multiverse.", director: "Daniels", hue: 310 },
  { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Adventure"], moods: ["escape", "moved", "think"], rating: 8.7, runtime: 169, blurb: "Love is the one thing that transcends time and space.", director: "Christopher Nolan", hue: 215 },
  { title: "Star Wars: Episode V – The Empire Strikes Back", year: 1980, genres: ["Sci-Fi", "Adventure", "Fantasy"], moods: ["escape", "thrilled"], rating: 8.7, runtime: 124, blurb: "The dark middle chapter: ice planets, cloud cities, one revelation.", director: "Irvin Kershner", hue: 205 },
  { title: "Pirates of the Caribbean: The Curse of the Black Pearl", year: 2003, genres: ["Adventure", "Fantasy", "Action"], moods: ["escape", "laugh", "thrilled"], rating: 8.1, runtime: 143, blurb: "Captain Jack Sparrow arrives, staggering, into adventure-movie legend.", director: "Gore Verbinski", hue: 180 },
  { title: "The Princess Bride", year: 1987, genres: ["Adventure", "Fantasy", "Comedy", "Romance"], moods: ["escape", "laugh", "moved"], rating: 8.0, runtime: 98, blurb: "Fencing, fighting, torture, revenge, true love. As you wish.", director: "Rob Reiner", hue: 330 },
  { title: "Avatar: The Way of Water", year: 2022, genres: ["Sci-Fi", "Adventure"], moods: ["escape"], rating: 7.6, runtime: 192, blurb: "The Sully family finds refuge and war among Pandora's reefs.", director: "James Cameron", hue: 195 },
  { title: "Howl's Moving Castle", year: 2004, genres: ["Animation", "Fantasy", "Romance"], moods: ["escape", "moved"], rating: 8.2, runtime: 119, blurb: "A cursed girl finds refuge in a wizard's walking castle.", director: "Hayao Miyazaki", hue: 150 },
  { title: "Top Gun: Maverick", year: 2022, genres: ["Action", "Drama"], moods: ["thrilled", "escape", "moved"], rating: 8.2, runtime: 130, blurb: "Maverick returns to teach a mission no pilot should survive.", director: "Joseph Kosinski", hue: 200 },
  // ── Scared / Horror ───────────────────────────────────────
  { title: "Alien", year: 1979, genres: ["Horror", "Sci-Fi"], moods: ["scared", "thrilled"], rating: 8.5, runtime: 117, blurb: "In space, no one can hear you scream. Still the scariest haunted-house film.", director: "Ridley Scott", hue: 140 },
  { title: "The Shining", year: 1980, genres: ["Horror"], moods: ["scared", "think"], rating: 8.4, runtime: 146, blurb: "A writer, an empty hotel, and a long, long winter. Kubrick's nightmare.", director: "Stanley Kubrick", hue: 10 },
  { title: "Get Out", year: 2017, genres: ["Horror", "Mystery"], moods: ["scared", "think"], rating: 7.8, runtime: 104, blurb: "A weekend meeting the parents becomes something far more sinister.", director: "Jordan Peele", hue: 250 },
  { title: "Hereditary", year: 2018, genres: ["Horror", "Drama"], moods: ["scared"], rating: 7.3, runtime: 127, blurb: "Grief unspools into pure dread in Aster's relentless debut.", director: "Ari Aster", hue: 0 },
  { title: "The Thing", year: 1982, genres: ["Horror", "Sci-Fi"], moods: ["scared", "think"], rating: 8.2, runtime: 109, blurb: "Paranoia in Antarctica: any one of them could be the thing.", director: "John Carpenter", hue: 195 },
  { title: "The Silence of the Lambs", year: 1991, genres: ["Thriller", "Crime", "Horror"], moods: ["scared", "think", "thrilled"], rating: 8.6, runtime: 118, blurb: "Clarice Starling trades confidences with Hannibal Lecter.", director: "Jonathan Demme", hue: 270 },
  { title: "A Quiet Place", year: 2018, genres: ["Horror", "Sci-Fi", "Thriller"], moods: ["scared", "thrilled"], rating: 7.5, runtime: 90, blurb: "One family survives in silence — the monsters hunt by sound.", director: "John Krasinski", hue: 90 },
  { title: "The Exorcist", year: 1973, genres: ["Horror"], moods: ["scared"], rating: 8.1, runtime: 122, blurb: "The possession film that made audiences faint in 1973.", director: "William Friedkin", hue: 80 },
  { title: "Psycho", year: 1960, genres: ["Horror", "Mystery", "Thriller"], moods: ["scared", "think"], rating: 8.5, runtime: 109, blurb: "Hitchcock kills his star in the shower and changes cinema forever.", director: "Alfred Hitchcock", hue: 330 },
  { title: "The Conjuring", year: 2013, genres: ["Horror", "Mystery"], moods: ["scared"], rating: 7.5, runtime: 112, blurb: "The Warrens investigate a farmhouse that wants a family broken.", director: "James Wan", hue: 30 },
  // ── Extra variety: westerns, docs-style, war, mystery ─────
  { title: "The Good, the Bad and the Ugly", year: 1966, genres: ["Western", "Adventure"], moods: ["escape", "thrilled"], rating: 8.8, runtime: 161, blurb: "Three gunslingers, one buried fortune, the greatest score ever written.", director: "Sergio Leone", hue: 45 },
  { title: "Django Unchained", year: 2012, genres: ["Western", "Drama"], moods: ["thrilled", "think"], rating: 8.5, runtime: 165, blurb: "A freed slave hunts bounty and his wife across the antebellum South.", director: "Quentin Tarantino", hue: 15 },
  { title: "Saving Private Ryan", year: 1998, genres: ["War", "Drama", "History"], moods: ["moved", "thrilled"], rating: 8.6, runtime: 169, blurb: "Eight men walk into occupied France to bring one soldier home.", director: "Steven Spielberg", hue: 60 },
  { title: "1917", year: 2019, genres: ["War", "Drama", "History"], moods: ["thrilled", "moved"], rating: 8.2, runtime: 119, blurb: "Two runners, one continuous shot, a message that must arrive by dawn.", director: "Sam Mendes", hue: 75 },
  { title: "Knives Out", year: 2019, genres: ["Mystery", "Comedy", "Crime"], moods: ["think", "laugh"], rating: 7.8, runtime: 130, blurb: "Benoit Blanc peels a wealthy family's alibis like an onion.", director: "Rian Johnson", hue: 20 },
  { title: "Zodiac", year: 2007, genres: ["Crime", "Mystery", "Thriller"], moods: ["think", "scared"], rating: 7.7, runtime: 157, blurb: "The obsessive, unsolved hunt for the Zodiac killer.", director: "David Fincher", hue: 240 },
  { title: "The Godfather", year: 1972, genres: ["Crime", "Drama"], moods: ["think", "moved"], rating: 9.2, runtime: 175, blurb: "An offer you can't refuse: the Corleone family saga begins.", director: "Francis Ford Coppola", hue: 25 },
  { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], moods: ["think", "laugh", "thrilled"], rating: 8.9, runtime: 154, blurb: "Hitmen, a briefcase and a royale with cheese, gloriously out of order.", director: "Quentin Tarantino", hue: 350 },
  { title: "Toy Story", year: 1995, genres: ["Animation", "Comedy", "Family"], moods: ["laugh", "moved", "escape"], rating: 8.3, runtime: 81, blurb: "Woody meets Buzz and animation is never the same again.", director: "John Lasseter", hue: 205 },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018, genres: ["Animation", "Action", "Adventure"], moods: ["escape", "thrilled", "laugh"], rating: 8.4, runtime: 117, blurb: "Miles Morales meets every Spider-person in a comic book come alive.", director: "Persichetti, Ramsey & Rothman", hue: 330 },
  { title: "Ratatouille", year: 2007, genres: ["Animation", "Comedy", "Family"], moods: ["laugh", "moved"], rating: 8.1, runtime: 111, blurb: "A rat who can cook proves anyone can, in the kitchens of Paris.", director: "Brad Bird", hue: 20 },
  { title: "Oppenheimer", year: 2023, genres: ["Drama", "History", "Thriller"], moods: ["think", "thrilled"], rating: 8.3, runtime: 180, blurb: "The father of the atomic bomb counts the cost of becoming death.", director: "Christopher Nolan", hue: 35 },
  { title: "The Social Network", year: 2010, genres: ["Drama", "History"], moods: ["think"], rating: 7.8, runtime: 120, blurb: "Facebook's founding, scored like a thriller and twice as cold.", director: "David Fincher", hue: 220 },
  { title: "Amélie", year: 2001, genres: ["Comedy", "Romance"], moods: ["laugh", "moved", "escape"], rating: 8.3, runtime: 122, blurb: "A shy waitress secretly improves the lives of everyone in Montmartre.", director: "Jean-Pierre Jeunet", hue: 100 },
  { title: "Your Name", year: 2016, genres: ["Animation", "Romance", "Fantasy"], moods: ["moved", "escape"], rating: 8.4, runtime: 106, blurb: "Two teenagers swap bodies across time and a falling comet.", director: "Makoto Shinkai", hue: 310 },
  { title: "Back to the Future", year: 1985, genres: ["Sci-Fi", "Adventure", "Comedy"], moods: ["escape", "laugh", "thrilled"], rating: 8.5, runtime: 116, blurb: "Marty McFly, a DeLorean and 88 miles per hour of pure joy.", director: "Robert Zemeckis", hue: 25 },
  { title: "Jaws", year: 1975, genres: ["Thriller", "Adventure", "Horror"], moods: ["scared", "thrilled"], rating: 8.1, runtime: 124, blurb: "You're gonna need a bigger boat. The original summer blockbuster.", director: "Steven Spielberg", hue: 205 },
  { title: "WALL·E", year: 2008, genres: ["Animation", "Sci-Fi", "Romance"], moods: ["moved", "escape"], rating: 8.4, runtime: 98, blurb: "The last robot on Earth falls in love among the stars.", director: "Andrew Stanton", hue: 50 },
  { title: "Gladiator", year: 2000, genres: ["Action", "Adventure", "Drama"], moods: ["thrilled", "moved"], rating: 8.5, runtime: 155, blurb: "A general becomes a slave, a slave becomes a legend.", director: "Ridley Scott", hue: 40 },
];

function decadeMatch(year: number, decade: (typeof DECADES)[number]): boolean {
  switch (decade) {
    case "Any era": return true;
    case "1970s–80s": return year >= 1960 && year < 1990;
    case "1990s": return year >= 1990 && year < 2000;
    case "2000s": return year >= 2000 && year < 2010;
    case "2010s": return year >= 2010 && year < 2020;
    case "2020s": return year >= 2020;
  }
}

export interface RecommendOptions {
  mood: Mood;
  genre: string | "Any genre";
  decade: (typeof DECADES)[number];
  minRating: number;
  maxRuntime: number | null; // minutes, null = no limit
  count?: number;
}

export function recommend({ mood, genre, decade, minRating, maxRuntime, count = 6 }: RecommendOptions): Movie[] {
  const scored = MOVIES
    .filter((m) => decadeMatch(m.year, decade))
    .filter((m) => m.rating >= minRating)
    .filter((m) => maxRuntime === null || m.runtime <= maxRuntime)
    .map((m) => {
      let score = 0;
      if (m.moods[0] === mood) score += 3;
      else if (m.moods.includes(mood)) score += 2;
      if (genre !== "Any genre" && m.genres.includes(genre)) score += 2;
      score += m.rating / 10;
      // small deterministic jitter so shuffle reshuffles
      score += Math.random() * 0.25;
      return { m, score };
    })
    .filter((s) => s.score > 0.7)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.m);
}

export function surpriseMe(): Movie {
  return MOVIES[Math.floor(Math.random() * MOVIES.length)]!;
}

export const ALL_GENRES = [...new Set(MOVIES.flatMap((m) => m.genres))].sort();
