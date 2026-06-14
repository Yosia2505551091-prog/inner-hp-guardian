export type ObjectiveMetric =
  | "quests" | "checkins" | "streak" | "level" | "badges" | "recovered" | "hp70Days";

export type Objective = {
  id: string;
  label: string;
  metric: ObjectiveMetric;
  goal: number;
};

export type ChapterReward = {
  xp: number;
  badge?: string;
  avatar?: string;
  title?: string;
  label: string; // human-readable summary, e.g. "250 XP + Beginner Badge"
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  story: string;
  objectives: Objective[];
  rewards: ChapterReward;
};

export type MainQuestStats = {
  questsCompleted: number;
  checkinCount: number;
  streak: number;
  level: number;
  badgesUnlocked: number;
  recoveredFromEmergency: boolean;
  hp70Days: number;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "ch-1",
    number: 1,
    title: "The First Steps",
    story: "Your spirit stirs. Begin the path by tending to the smallest flames within.",
    objectives: [
      { id: "ch1-q",  label: "Complete 5 Daily Quests",  metric: "quests",   goal: 5 },
      { id: "ch1-c",  label: "Perform 3 Daily Check-Ins", metric: "checkins", goal: 3 },
    ],
    rewards: { xp: 250, badge: "first-quest", label: "250 XP + Beginner Badge" },
  },
  {
    id: "ch-2",
    number: 2,
    title: "Building Momentum",
    story: "The first sparks become a steady flame. Return to yourself, day after day.",
    objectives: [
      { id: "ch2-q",  label: "Complete 15 Daily Quests", metric: "quests", goal: 15 },
      { id: "ch2-s",  label: "Reach a 5-Day Streak",     metric: "streak", goal: 5 },
    ],
    rewards: { xp: 500, avatar: "artist", label: "500 XP + New Avatar" },
  },
  {
    id: "ch-3",
    number: 3,
    title: "Restoring Balance",
    story: "From the shadowed valley, you climb. Balance is found in steady breath.",
    objectives: [
      { id: "ch3-r",  label: "Recover from Sanctuary mode once", metric: "recovered", goal: 1 },
      { id: "ch3-hp", label: "Maintain HP above 70 for 5 days",  metric: "hp70Days",  goal: 5 },
    ],
    rewards: { xp: 750, badge: "from-emergency", label: "750 XP + Rare Badge" },
  },
  {
    id: "ch-4",
    number: 4,
    title: "Guardian of Wellness",
    story: "You stand as a quiet guardian — for yourself, and for the calm you've made.",
    objectives: [
      { id: "ch4-q",  label: "Complete 50 Total Quests", metric: "quests", goal: 50 },
      { id: "ch4-l",  label: "Reach Level 15",           metric: "level",  goal: 15 },
      { id: "ch4-b",  label: "Unlock 10 Badges",         metric: "badges", goal: 10 },
    ],
    rewards: { xp: 1000, avatar: "fairy", label: "1000 XP + Exclusive Avatar" },
  },
  {
    id: "ch-5",
    number: 5,
    title: "Keeper of InnerHP",
    story: "The final chapter. You become the keeper — a beacon for every spirit that follows.",
    objectives: [
      { id: "ch5-q",  label: "Complete 100 Total Quests", metric: "quests", goal: 100 },
      { id: "ch5-l",  label: "Reach Level 25",            metric: "level",  goal: 25 },
      { id: "ch5-s",  label: "Maintain a 14-Day Streak",  metric: "streak", goal: 14 },
    ],
    rewards: { xp: 2000, badge: "quest-master-p", title: "Keeper of InnerHP", label: "Legendary Badge + Title: Keeper of InnerHP" },
  },
];

function metricValue(metric: ObjectiveMetric, s: MainQuestStats): number {
  switch (metric) {
    case "quests":     return s.questsCompleted;
    case "checkins":   return s.checkinCount;
    case "streak":     return s.streak;
    case "level":      return s.level;
    case "badges":     return s.badgesUnlocked;
    case "recovered":  return s.recoveredFromEmergency ? 1 : 0;
    case "hp70Days":   return s.hp70Days;
  }
}

export function objectiveProgress(o: Objective, s: MainQuestStats) {
  const cur = metricValue(o.metric, s);
  const current = Math.min(cur, o.goal);
  const pct = Math.min(100, Math.round((cur / o.goal) * 100));
  return { current, pct, complete: cur >= o.goal };
}

export function chapterProgress(c: Chapter, s: MainQuestStats) {
  const items = c.objectives.map((o) => ({ objective: o, ...objectiveProgress(o, s) }));
  const sumPct = items.reduce((a, x) => a + x.pct, 0);
  const pct = Math.round(sumPct / items.length);
  const complete = items.every((x) => x.complete);
  return { items, pct, complete };
}

export function activeChapter(s: MainQuestStats): Chapter {
  for (const c of CHAPTERS) {
    if (!chapterProgress(c, s).complete) return c;
  }
  return CHAPTERS[CHAPTERS.length - 1];
}

export function chapterStatus(c: Chapter, s: MainQuestStats): "complete" | "active" | "locked" {
  const idx = CHAPTERS.findIndex((x) => x.id === c.id);
  const active = activeChapter(s);
  if (chapterProgress(c, s).complete) return "complete";
  if (c.id === active.id) return "active";
  // Locked if a previous chapter is the active one
  const activeIdx = CHAPTERS.findIndex((x) => x.id === active.id);
  return idx > activeIdx ? "locked" : "active";
}