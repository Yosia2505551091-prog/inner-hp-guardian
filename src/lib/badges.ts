export type BadgeCategory = "quest" | "streak" | "recovery" | "lifestyle" | "profile";

export type BadgeDef = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  category: BadgeCategory;
  description: string;
  requirement: string;
  goal: number;
  xp: number;
  // Reads current progress from state (0..goal)
  getProgress: (s: BadgeState) => number;
};

export type BadgeState = {
  questsCompleted: number;
  streak: number;
  hp: number;
  recoveredFromEmergency: boolean;
  reachedFullHpAgain: boolean;
  avatarsOwned: number;
  badgesUnlocked: number;
};

export const BADGE_CATEGORY_LABEL: Record<BadgeCategory, string> = {
  quest: "Quests",
  streak: "Streaks",
  recovery: "Recovery",
  lifestyle: "Lifestyle",
  profile: "Profile",
};

export const BADGES: BadgeDef[] = [
  // Quest achievements
  { id: "first-quest",   name: "First Quest",    emoji: "🗺️", color: "var(--mint)",     category: "quest", description: "Complete your very first quest.",        requirement: "Complete 1 quest",     goal: 1,   xp: 50,  getProgress: (s) => Math.min(s.questsCompleted, 1) },
  { id: "quests-50",     name: "Seasoned Hero",  emoji: "⚔️", color: "var(--sky)",      category: "quest", description: "Fifty quests behind you. Steady steps.", requirement: "Complete 50 quests",   goal: 50,  xp: 200, getProgress: (s) => Math.min(s.questsCompleted, 50) },
  { id: "quests-100",    name: "Quest Veteran",  emoji: "🏆", color: "var(--lavender)", category: "quest", description: "One hundred quests, one brave soul.",    requirement: "Complete 100 quests",  goal: 100, xp: 400, getProgress: (s) => Math.min(s.questsCompleted, 100) },
  { id: "quests-500",    name: "Quest Master",   emoji: "👑", color: "var(--peach)",    category: "quest", description: "A legend whispered across realms.",      requirement: "Complete 500 quests",  goal: 500, xp: 1500,getProgress: (s) => Math.min(s.questsCompleted, 500) },

  // Streak achievements
  { id: "streak-3",      name: "Spark",          emoji: "✨", color: "var(--peach)",    category: "streak", description: "Three days in a row. The flame catches.", requirement: "3-day streak",  goal: 3,   xp: 75,  getProgress: (s) => Math.min(s.streak, 3) },
  { id: "streak-7",      name: "Steady Flame",   emoji: "🔥", color: "var(--peach)",    category: "streak", description: "A full week. The fire holds.",            requirement: "7-day streak",  goal: 7,   xp: 150, getProgress: (s) => Math.min(s.streak, 7) },
  { id: "streak-30",     name: "Eternal Ember",  emoji: "🌟", color: "var(--lavender)", category: "streak", description: "A month of returning to yourself.",       requirement: "30-day streak", goal: 30,  xp: 500, getProgress: (s) => Math.min(s.streak, 30) },
  { id: "streak-100",    name: "Unbroken Vow",   emoji: "💎", color: "var(--sky)",      category: "streak", description: "One hundred days. A vow kept.",            requirement: "100-day streak",goal: 100, xp: 1200,getProgress: (s) => Math.min(s.streak, 100) },

  // Recovery
  { id: "from-emergency", name: "Returned from Shadow", emoji: "🌅", color: "var(--peach)",    category: "recovery", description: "Recovered from Sanctuary mode.",         requirement: "Leave Emergency mode", goal: 1, xp: 250, getProgress: (s) => (s.recoveredFromEmergency ? 1 : 0) },
  { id: "full-hp-again",  name: "Full Heart",           emoji: "💖", color: "var(--hp)",        category: "recovery", description: "Reach 100 HP after recovering.",         requirement: "Reach 100 HP again",   goal: 1, xp: 300, getProgress: (s) => (s.reachedFullHpAgain ? 1 : 0) },
  { id: "recovery-journey", name: "Recovery Journey",   emoji: "🛡️", color: "var(--lavender)", category: "recovery", description: "Complete the full recovery arc.",        requirement: "Recover + reach full HP", goal: 1, xp: 500, getProgress: (s) => (s.reachedFullHpAgain && s.recoveredFromEmergency ? 1 : 0) },

  // Lifestyle
  { id: "sleep-master",  name: "Sleep Master",    emoji: "🌙", color: "var(--lavender)", category: "lifestyle", description: "Treasure rest as a quest.",        requirement: "Complete 20 sleep quests",    goal: 20, xp: 250, getProgress: (s) => Math.min(s.questsCompleted, 20) },
  { id: "hydration-hero",name: "Hydration Hero",  emoji: "💧", color: "var(--sky)",      category: "lifestyle", description: "Drink to your own becoming.",      requirement: "Complete 15 hydration quests",goal: 15, xp: 200, getProgress: (s) => Math.min(s.questsCompleted, 15) },
  { id: "mindfulness",   name: "Mindfulness Apprentice", emoji: "🪷", color: "var(--mint)", category: "lifestyle", description: "Stillness is a kind of magic.", requirement: "Complete 10 mental quests", goal: 10, xp: 200, getProgress: (s) => Math.min(s.questsCompleted, 10) },
  { id: "social",        name: "Social Butterfly", emoji: "🦋", color: "var(--peach)",    category: "lifestyle", description: "Bonds keep us bright.",            requirement: "Complete 10 social quests",   goal: 10, xp: 200, getProgress: (s) => Math.min(s.questsCompleted, 10) },
  { id: "productivity",  name: "Productivity Champion", emoji: "📜", color: "var(--mint)", category: "lifestyle", description: "Slay one boss task, then rest.",   requirement: "Complete 25 focus quests",    goal: 25, xp: 300, getProgress: (s) => Math.min(s.questsCompleted, 25) },

  // Profile
  { id: "avatar-collector", name: "Avatar Collector", emoji: "🎭", color: "var(--lavender)", category: "profile", description: "Try on many faces of the self.", requirement: "Own 5 avatars",       goal: 5,  xp: 150, getProgress: (s) => Math.min(s.avatarsOwned, 5) },
  { id: "badge-hunter",     name: "Badge Hunter",     emoji: "🏅", color: "var(--peach)",    category: "profile", description: "Collector of small honors.",      requirement: "Unlock 10 badges",    goal: 10, xp: 300, getProgress: (s) => Math.min(s.badgesUnlocked, 10) },
  { id: "quest-master-p",   name: "Quest Master",     emoji: "⚜️", color: "var(--sky)",      category: "profile", description: "Master of the daily board.",      requirement: "Complete 250 quests", goal: 250, xp: 800, getProgress: (s) => Math.min(s.questsCompleted, 250) },
];

export function badgeStatus(b: BadgeDef, s: BadgeState) {
  const progress = b.getProgress(s);
  const pct = Math.min(100, Math.round((progress / b.goal) * 100));
  return { progress, pct, unlocked: progress >= b.goal };
}