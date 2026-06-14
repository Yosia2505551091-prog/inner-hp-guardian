import {
  Droplets, Pill, Apple, ShowerHead, Sparkles, PersonStanding,
  BookHeart, Heart, Wind, Brain, Smile, ListChecks,
  Footprints, Dumbbell, Sun, TreePine, Flower2,
  MessageCircle, Phone, Users, Gift,
  CheckCircle2, GraduationCap, ClipboardList, FileCheck,
  Music, Tv, BookOpen, Palette, Gamepad2,
  Bath, Salad, Carrot, Cookie, Soup, Sunrise, Sunset,
  Feather, Notebook, Star, Cloud, Compass,
  Bike, Mountain, Waves, Tent, Snowflake, Trees,
  HandHeart, Handshake, Coffee, Mail,
  Briefcase, Target, Calendar, Timer, Hammer, Code, PenTool,
  Camera, Film, Headphones, Puzzle, Drum, Pencil,
  PhoneOff, Smartphone, Lightbulb,
} from "lucide-react";
import type { HPMode } from "./hp-context";

export type QuestCategory =
  | "self-care"
  | "mental"
  | "physical"
  | "social"
  | "productivity"
  | "fun";

export type Difficulty = "easy" | "medium" | "hard";

export type Quest = {
  id: string;
  name: string;
  description: string;
  category: QuestCategory;
  difficulty: Difficulty;
  hp: number;
  xp: number;
  minutes: number;
  icon: any;
  tint: string;
};

export const CATEGORY_META: Record<QuestCategory, { label: string; tint: string; emoji: string }> = {
  "self-care":   { label: "Self Care",   tint: "var(--sky)",      emoji: "🌿" },
  "mental":      { label: "Mind & Soul", tint: "var(--lavender)", emoji: "✨" },
  "physical":    { label: "Body Quest",  tint: "var(--hp)",       emoji: "🏃" },
  "social":      { label: "Bonds",       tint: "var(--peach)",    emoji: "💬" },
  "productivity":{ label: "Focus",       tint: "var(--mint)",     emoji: "📜" },
  "fun":         { label: "Joy",         tint: "var(--lavender)", emoji: "🎵" },
};

export const QUEST_POOL: Quest[] = [
  // SELF CARE
  { id: "sc-water",  name: "Hydration ritual",     description: "Drink 6 glasses of water today.",     category: "self-care", difficulty: "easy",   hp: 6,  xp: 10, minutes: 1,  icon: Droplets,   tint: "var(--sky)" },
  { id: "sc-meds",   name: "Take your potion",     description: "Take your medication on time.",       category: "self-care", difficulty: "easy",   hp: 8,  xp: 12, minutes: 1,  icon: Pill,       tint: "var(--lavender)" },
  { id: "sc-meal",   name: "Nourish the body",     description: "Eat one healthy meal mindfully.",     category: "self-care", difficulty: "medium", hp: 10, xp: 18, minutes: 20, icon: Apple,      tint: "var(--mint)" },
  { id: "sc-shower", name: "Cleansing waters",     description: "Take a warm shower.",                 category: "self-care", difficulty: "easy",   hp: 7,  xp: 10, minutes: 10, icon: ShowerHead, tint: "var(--sky)" },
  { id: "sc-clean",  name: "Tidy your sanctuary",  description: "Clear and organize your workspace.",  category: "self-care", difficulty: "medium", hp: 9,  xp: 16, minutes: 10, icon: Sparkles,   tint: "var(--peach)" },
  { id: "sc-stretch",name: "Loosen the limbs",     description: "Stretch your body for 5 minutes.",    category: "self-care", difficulty: "easy",   hp: 6,  xp: 10, minutes: 5,  icon: PersonStanding, tint: "var(--mint)" },
  { id: "sc-bath",   name: "Sacred soak",          description: "Take a long warm bath.",              category: "self-care", difficulty: "medium", hp: 11, xp: 18, minutes: 25, icon: Bath,       tint: "var(--sky)" },
  { id: "sc-salad",  name: "Garden plate",         description: "Make a fresh salad or fruit bowl.",   category: "self-care", difficulty: "medium", hp: 10, xp: 16, minutes: 15, icon: Salad,      tint: "var(--mint)" },
  { id: "sc-veggie", name: "Roots of strength",    description: "Eat 3 servings of vegetables today.", category: "self-care", difficulty: "medium", hp: 11, xp: 18, minutes: 5,  icon: Carrot,     tint: "var(--peach)" },
  { id: "sc-snack",  name: "Mindful snack",        description: "Eat a snack slowly, without screens.",category: "self-care", difficulty: "easy",   hp: 6,  xp: 10, minutes: 10, icon: Cookie,     tint: "var(--peach)" },
  { id: "sc-soup",   name: "Warm broth",           description: "Make a comforting warm soup or tea.", category: "self-care", difficulty: "easy",   hp: 8,  xp: 12, minutes: 15, icon: Soup,       tint: "var(--peach)" },
  { id: "sc-morn",   name: "Gentle morning",       description: "Wake up without snoozing.",           category: "self-care", difficulty: "medium", hp: 10, xp: 18, minutes: 5,  icon: Sunrise,    tint: "var(--peach)" },
  { id: "sc-night",  name: "Wind-down ritual",     description: "No screens 30 min before bed.",       category: "self-care", difficulty: "medium", hp: 12, xp: 20, minutes: 30, icon: Sunset,     tint: "var(--lavender)" },
  { id: "sc-routine",name: "Full self-care arc",   description: "Shower, skincare, and tidy room.",    category: "self-care", difficulty: "hard",   hp: 18, xp: 28, minutes: 45, icon: Sparkles,   tint: "var(--peach)" },

  // MENTAL WELLNESS
  { id: "mn-journal", name: "Heart pages",        description: "Journal one feeling today.",          category: "mental", difficulty: "easy",   hp: 10, xp: 15, minutes: 5,  icon: BookHeart, tint: "var(--lavender)" },
  { id: "mn-grat",    name: "Three blessings",    description: "Write 3 things you're grateful for.", category: "mental", difficulty: "easy",   hp: 8,  xp: 12, minutes: 3,  icon: Heart,     tint: "var(--peach)" },
  { id: "mn-breath",  name: "Breath of calm",     description: "3 minutes of box breathing.",         category: "mental", difficulty: "easy",   hp: 7,  xp: 10, minutes: 3,  icon: Wind,      tint: "var(--mint)" },
  { id: "mn-medit",   name: "Inner stillness",    description: "Meditate for 10 minutes.",            category: "mental", difficulty: "medium", hp: 12, xp: 20, minutes: 10, icon: Brain,     tint: "var(--lavender)" },
  { id: "mn-affirm",  name: "Speak the spell",    description: "Say one positive affirmation aloud.", category: "mental", difficulty: "easy",   hp: 6,  xp: 10, minutes: 1,  icon: Smile,     tint: "var(--peach)" },
  { id: "mn-reflect", name: "Day's reflection",   description: "List 3 small wins from today.",       category: "mental", difficulty: "medium", hp: 10, xp: 18, minutes: 5,  icon: ListChecks,tint: "var(--sky)" },
  { id: "mn-journal-long", name: "Long letter to self", description: "Journal for 10 minutes.",        category: "mental", difficulty: "medium", hp: 13, xp: 22, minutes: 10, icon: Notebook,  tint: "var(--lavender)" },
  { id: "mn-medit-long", name: "Deep stillness",   description: "Meditate for 20 minutes.",            category: "mental", difficulty: "hard",   hp: 18, xp: 30, minutes: 20, icon: Brain,     tint: "var(--lavender)" },
  { id: "mn-feather", name: "Soft notice",        description: "Notice 5 beautiful things around you.",category: "mental", difficulty: "easy",   hp: 7,  xp: 12, minutes: 3,  icon: Feather,   tint: "var(--mint)" },
  { id: "mn-star",    name: "Wish on stars",      description: "Write down 1 hope for tomorrow.",      category: "mental", difficulty: "easy",   hp: 6,  xp: 10, minutes: 2,  icon: Star,      tint: "var(--lavender)" },
  { id: "mn-cloud",   name: "Cloud watching",     description: "Watch the sky for 5 minutes.",         category: "mental", difficulty: "easy",   hp: 7,  xp: 10, minutes: 5,  icon: Cloud,     tint: "var(--sky)" },
  { id: "mn-compass", name: "Inner compass",      description: "Reflect: what matters most this week?",category: "mental", difficulty: "medium", hp: 11, xp: 20, minutes: 8,  icon: Compass,   tint: "var(--mint)" },
  { id: "mn-detox",   name: "Digital detox",      description: "No phone for 2 hours straight.",       category: "mental", difficulty: "hard",   hp: 20, xp: 35, minutes: 120,icon: PhoneOff,  tint: "var(--lavender)" },
  { id: "mn-detox-s", name: "Phone-free hour",    description: "Put your phone away for 1 hour.",      category: "mental", difficulty: "medium", hp: 12, xp: 22, minutes: 60, icon: Smartphone,tint: "var(--sky)" },
  { id: "mn-idea",    name: "Light a thought",    description: "Brainstorm one new idea.",             category: "mental", difficulty: "easy",   hp: 7,  xp: 12, minutes: 5,  icon: Lightbulb, tint: "var(--peach)" },

  // PHYSICAL
  { id: "ph-walk",   name: "Wandering steps",   description: "Walk for 15 minutes outside.",      category: "physical", difficulty: "medium", hp: 12, xp: 20, minutes: 15, icon: Footprints, tint: "var(--hp)" },
  { id: "ph-exer",   name: "Move your spirit",  description: "10 minutes of light exercise.",     category: "physical", difficulty: "medium", hp: 14, xp: 22, minutes: 10, icon: Dumbbell,   tint: "var(--peach)" },
  { id: "ph-out",    name: "Sunlight quest",    description: "Step outside for 10 min of light.", category: "physical", difficulty: "easy",   hp: 9,  xp: 14, minutes: 10, icon: Sun,        tint: "var(--peach)" },
  { id: "ph-nature", name: "Touch the green",   description: "Spend time near plants or trees.",  category: "physical", difficulty: "easy",   hp: 8,  xp: 12, minutes: 10, icon: TreePine,   tint: "var(--mint)" },
  { id: "ph-yoga",   name: "Flow of forms",     description: "15 minute yoga session.",           category: "physical", difficulty: "hard",   hp: 18, xp: 28, minutes: 15, icon: Flower2,    tint: "var(--lavender)" },
  { id: "ph-walk-long", name: "Long pilgrimage",description: "Walk 30 minutes outside.",          category: "physical", difficulty: "hard",   hp: 20, xp: 32, minutes: 30, icon: Footprints, tint: "var(--hp)" },
  { id: "ph-exer-30",   name: "Full forge",     description: "Exercise for 30 minutes.",          category: "physical", difficulty: "hard",   hp: 22, xp: 36, minutes: 30, icon: Dumbbell,   tint: "var(--peach)" },
  { id: "ph-bike",   name: "Wheels of wind",    description: "Bike or scoot for 20 minutes.",     category: "physical", difficulty: "hard",   hp: 19, xp: 30, minutes: 20, icon: Bike,       tint: "var(--mint)" },
  { id: "ph-climb",  name: "Conquer the hill",  description: "Take stairs instead of elevators.", category: "physical", difficulty: "easy",   hp: 8,  xp: 12, minutes: 5,  icon: Mountain,   tint: "var(--peach)" },
  { id: "ph-swim",   name: "Whisper of waves",  description: "Swim or stretch in water.",         category: "physical", difficulty: "hard",   hp: 20, xp: 32, minutes: 30, icon: Waves,      tint: "var(--sky)" },
  { id: "ph-camp",   name: "Outdoor pause",     description: "Sit outdoors for 15 minutes.",      category: "physical", difficulty: "easy",   hp: 8,  xp: 12, minutes: 15, icon: Tent,       tint: "var(--mint)" },
  { id: "ph-cold",   name: "Cool splash",       description: "End a shower with cold water.",     category: "physical", difficulty: "medium", hp: 10, xp: 18, minutes: 2,  icon: Snowflake,  tint: "var(--sky)" },
  { id: "ph-forest", name: "Forest bathing",    description: "Spend 30 min among trees.",         category: "physical", difficulty: "medium", hp: 14, xp: 24, minutes: 30, icon: Trees,      tint: "var(--mint)" },
  { id: "ph-stretch-long", name: "Long stretch", description: "20 minutes of full-body stretching.",category: "physical", difficulty: "medium", hp: 12, xp: 20, minutes: 20, icon: PersonStanding, tint: "var(--mint)" },

  // SOCIAL
  { id: "so-friend", name: "Call upon an ally",   description: "Talk to a friend today.",            category: "social", difficulty: "medium", hp: 12, xp: 18, minutes: 15, icon: MessageCircle, tint: "var(--peach)" },
  { id: "so-fam",    name: "Message of home",     description: "Reach out to a family member.",      category: "social", difficulty: "easy",   hp: 10, xp: 14, minutes: 5,  icon: Phone,         tint: "var(--lavender)" },
  { id: "so-comm",   name: "Gather the guild",    description: "Join a community activity.",         category: "social", difficulty: "hard",   hp: 18, xp: 28, minutes: 30, icon: Users,         tint: "var(--mint)" },
  { id: "so-thank",  name: "Words of gratitude",  description: "Tell someone you appreciate them.",  category: "social", difficulty: "easy",   hp: 8,  xp: 12, minutes: 2,  icon: Gift,          tint: "var(--peach)" },
  { id: "so-trust",  name: "Whisper to a trusted one", description: "Contact someone you trust.",     category: "social", difficulty: "easy",   hp: 9,  xp: 14, minutes: 5,  icon: HandHeart,     tint: "var(--peach)" },
  { id: "so-meet",   name: "Meet in the world",   description: "See a friend in person.",            category: "social", difficulty: "hard",   hp: 20, xp: 32, minutes: 60, icon: Handshake,     tint: "var(--lavender)" },
  { id: "so-coffee", name: "Tea & talk",          description: "Have a slow drink with someone.",    category: "social", difficulty: "medium", hp: 13, xp: 22, minutes: 30, icon: Coffee,        tint: "var(--peach)" },
  { id: "so-letter", name: "Send a small letter", description: "Send a thoughtful message.",         category: "social", difficulty: "easy",   hp: 8,  xp: 12, minutes: 5,  icon: Mail,          tint: "var(--sky)" },
  { id: "so-listen", name: "Listen deeply",       description: "Listen without offering advice.",    category: "social", difficulty: "medium", hp: 12, xp: 20, minutes: 15, icon: MessageCircle, tint: "var(--mint)" },

  // PRODUCTIVITY
  { id: "pr-task",   name: "Slay one boss task",  description: "Finish one important task.",         category: "productivity", difficulty: "medium", hp: 12, xp: 22, minutes: 30, icon: CheckCircle2, tint: "var(--mint)" },
  { id: "pr-study",  name: "Scholar's session",   description: "Study or learn for 20 minutes.",    category: "productivity", difficulty: "medium", hp: 11, xp: 20, minutes: 20, icon: GraduationCap,tint: "var(--sky)" },
  { id: "pr-plan",   name: "Map the day",         description: "Organize your task list.",           category: "productivity", difficulty: "easy",   hp: 7,  xp: 12, minutes: 5,  icon: ClipboardList,tint: "var(--lavender)" },
  { id: "pr-assn",   name: "Pending quest log",   description: "Finish a pending assignment.",       category: "productivity", difficulty: "hard",   hp: 18, xp: 30, minutes: 45, icon: FileCheck,    tint: "var(--peach)" },
  { id: "pr-focus",  name: "Forge of focus",      description: "45-minute deep focus session.",      category: "productivity", difficulty: "hard",   hp: 22, xp: 36, minutes: 45, icon: Timer,        tint: "var(--mint)" },
  { id: "pr-pomo",   name: "Twin pomodoros",      description: "Two 25-min focus blocks.",           category: "productivity", difficulty: "hard",   hp: 20, xp: 32, minutes: 55, icon: Timer,        tint: "var(--sky)" },
  { id: "pr-inbox",  name: "Clear the scrolls",   description: "Reach inbox zero or close.",         category: "productivity", difficulty: "medium", hp: 11, xp: 20, minutes: 20, icon: Briefcase,    tint: "var(--lavender)" },
  { id: "pr-goal",   name: "Mark the target",     description: "Set 1 clear goal for tomorrow.",     category: "productivity", difficulty: "easy",   hp: 6,  xp: 10, minutes: 3,  icon: Target,       tint: "var(--peach)" },
  { id: "pr-week",   name: "Weekly map",          description: "Plan the week ahead.",               category: "productivity", difficulty: "medium", hp: 12, xp: 22, minutes: 15, icon: Calendar,     tint: "var(--sky)" },
  { id: "pr-build",  name: "Craft something",     description: "Work on a personal project 30 min.", category: "productivity", difficulty: "hard",   hp: 19, xp: 30, minutes: 30, icon: Hammer,       tint: "var(--mint)" },
  { id: "pr-code",   name: "Learn a new spell",   description: "Practice a skill for 30 minutes.",   category: "productivity", difficulty: "hard",   hp: 19, xp: 30, minutes: 30, icon: Code,         tint: "var(--lavender)" },
  { id: "pr-write",  name: "Write 300 words",     description: "Write 300 words about anything.",    category: "productivity", difficulty: "medium", hp: 13, xp: 22, minutes: 20, icon: PenTool,      tint: "var(--peach)" },

  // FUN
  { id: "fn-music",  name: "Song of the heart",   description: "Listen to your favorite music.",     category: "fun", difficulty: "easy",   hp: 6,  xp: 10, minutes: 10, icon: Music,    tint: "var(--lavender)" },
  { id: "fn-watch",  name: "Tales by firelight",  description: "Watch something you enjoy.",         category: "fun", difficulty: "easy",   hp: 6,  xp: 10, minutes: 25, icon: Tv,       tint: "var(--sky)" },
  { id: "fn-read",   name: "Open the tome",       description: "Read a chapter of a book.",          category: "fun", difficulty: "easy",   hp: 8,  xp: 14, minutes: 20, icon: BookOpen, tint: "var(--peach)" },
  { id: "fn-create", name: "Spark of creation",   description: "Draw, paint, or make something.",    category: "fun", difficulty: "medium", hp: 12, xp: 20, minutes: 20, icon: Palette,  tint: "var(--mint)" },
  { id: "fn-game",   name: "Play a relaxing game",description: "Play something calming.",            category: "fun", difficulty: "easy",   hp: 6,  xp: 10, minutes: 15, icon: Gamepad2, tint: "var(--lavender)" },
  { id: "fn-read-long", name: "Read 20 pages",    description: "Read 20 pages of a book.",           category: "fun", difficulty: "hard",   hp: 18, xp: 28, minutes: 45, icon: BookOpen, tint: "var(--peach)" },
  { id: "fn-photo",  name: "Catch a moment",      description: "Take 3 photos of small joys.",       category: "fun", difficulty: "easy",   hp: 7,  xp: 12, minutes: 10, icon: Camera,   tint: "var(--peach)" },
  { id: "fn-film",   name: "Tale of two hours",   description: "Watch a full film mindfully.",       category: "fun", difficulty: "medium", hp: 12, xp: 20, minutes: 120,icon: Film,     tint: "var(--lavender)" },
  { id: "fn-podcast",name: "Whispers in the ear", description: "Listen to a podcast or audiobook.",  category: "fun", difficulty: "easy",   hp: 7,  xp: 10, minutes: 30, icon: Headphones,tint: "var(--sky)" },
  { id: "fn-puzzle", name: "Mind puzzle",         description: "Do a crossword or sudoku.",          category: "fun", difficulty: "easy",   hp: 7,  xp: 12, minutes: 15, icon: Puzzle,   tint: "var(--mint)" },
  { id: "fn-jam",    name: "Beat the drum",       description: "Sing, dance, or play music.",        category: "fun", difficulty: "medium", hp: 13, xp: 22, minutes: 15, icon: Drum,     tint: "var(--peach)" },
  { id: "fn-sketch", name: "Doodle session",      description: "Doodle freely for 10 minutes.",      category: "fun", difficulty: "easy",   hp: 7,  xp: 12, minutes: 10, icon: Pencil,   tint: "var(--lavender)" },
  { id: "fn-create-hard", name: "Finish a piece", description: "Complete a creative work today.",    category: "fun", difficulty: "hard",   hp: 20, xp: 32, minutes: 60, icon: Palette,  tint: "var(--mint)" },
];

const MODE_RULES: Record<HPMode, { count: number; difficulties: Difficulty[] }> = {
  maintenance: { count: 5, difficulties: ["easy", "medium", "hard"] },
  recovery:    { count: 6, difficulties: ["easy", "medium"] },
  emergency:   { count: 8, difficulties: ["easy"] },
};

export function questsForMode(mode: HPMode): Quest[] {
  const rules = MODE_RULES[mode];
  return QUEST_POOL.filter((q) => rules.difficulties.includes(q.difficulty));
}

export function pickDailyQuests(seed = new Date().toDateString(), countOrMode: number | HPMode = 5): Quest[] {
  let count: number;
  let pool: Quest[];
  if (typeof countOrMode === "string") {
    const rules = MODE_RULES[countOrMode];
    count = rules.count;
    pool = [...questsForMode(countOrMode)];
  } else {
    count = countOrMode;
    pool = [...QUEST_POOL];
  }
  // Deterministic seeded shuffle so daily quests stay stable per day
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out: Quest[] = [];
  while (out.length < count && pool.length) {
    h = (h * 1664525 + 1013904223) >>> 0;
    const idx = h % pool.length;
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

export function rerollQuest(current: Quest, exclude: string[]): Quest {
  const candidates = QUEST_POOL.filter(
    (q) =>
      q.difficulty === current.difficulty &&
      q.category === current.category &&
      q.id !== current.id &&
      !exclude.includes(q.id),
  );
  if (!candidates.length) {
    // Fall back to same difficulty if category is too narrow
    const wider = QUEST_POOL.filter(
      (q) => q.difficulty === current.difficulty && q.id !== current.id && !exclude.includes(q.id),
    );
    if (!wider.length) return current;
    return wider[Math.floor(Math.random() * wider.length)];
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}