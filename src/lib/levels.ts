export type LevelTitle = { min: number; title: string };

export const LEVEL_TITLES: LevelTitle[] = [
  { min: 1,   title: "New Adventurer" },
  { min: 5,   title: "Apprentice Explorer" },
  { min: 10,  title: "Rising Hero" },
  { min: 20,  title: "Experienced Guardian" },
  { min: 30,  title: "Master Wanderer" },
  { min: 50,  title: "Legendary Protector" },
  { min: 75,  title: "Mythic Champion" },
  { min: 100, title: "Keeper of InnerHP" },
];

export function titleForLevel(level: number): string {
  return [...LEVEL_TITLES].reverse().find((t) => level >= t.min)?.title ?? "New Adventurer";
}

// XP curve: 100 XP per level baseline (matches existing addXP math).
export const XP_PER_LEVEL = 100;

export function xpProgress(xp: number, level: number) {
  const base = (level - 1) * XP_PER_LEVEL;
  const into = Math.max(0, xp - base);
  return { into, needed: XP_PER_LEVEL, pct: Math.min(100, (into / XP_PER_LEVEL) * 100) };
}

export function nextMilestone(level: number): number {
  return LEVEL_TITLES.find((t) => t.min > level)?.min ?? 100;
}