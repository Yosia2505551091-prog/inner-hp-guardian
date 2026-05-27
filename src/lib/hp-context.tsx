import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type HPMode = "maintenance" | "recovery" | "emergency";

export function modeFromHp(hp: number): HPMode {
  if (hp >= 70) return "maintenance";
  if (hp >= 40) return "recovery";
  return "emergency";
}

export const MODE_META: Record<HPMode, { label: string; tagline: string; tint: string; sub: string }> = {
  maintenance: { label: "Maintenance",  tagline: "Your spirit is thriving today.",                tint: "var(--hp)",       sub: "Lvl up — keep exploring." },
  recovery:    { label: "Recovery",     tagline: "Your energy is recovering. One step at a time.", tint: "var(--lavender)", sub: "Soft quests await." },
  emergency:   { label: "Sanctuary",    tagline: "Your spirit needs rest. Small wins only.",       tint: "var(--sky)",      sub: "Be very gentle today." },
};

type State = {
  hp: number;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  mode: HPMode;
  avatar: string;
  questsCompleted: number;
  recoveredFromEmergency: boolean;
  reachedFullHpAgain: boolean;
  addHP: (delta: number, reason?: string) => void;
  addXP: (delta: number) => void;
  unlockBadge: (id: string) => void;
  setHP: (n: number) => void;
  setAvatar: (id: string) => void;
  recordQuest: () => void;
};

const Ctx = createContext<State | null>(null);

const STORAGE_KEY = "innerhp.state.v1";

type Persist = {
  hp: number; xp: number; level: number; streak: number; badges: string[];
  avatar: string; questsCompleted: number;
  recoveredFromEmergency: boolean; reachedFullHpAgain: boolean;
};
const DEFAULT: Persist = {
  hp: 72, xp: 240, level: 7, streak: 7,
  badges: ["first-quest", "sleep-master", "streak-7"],
  avatar: "mage", questsCompleted: 12,
  recoveredFromEmergency: false, reachedFullHpAgain: false,
};

export function HPProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Persist>(DEFAULT);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      if (raw) setS({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
  }, [s]);

  const addHP = useCallback((delta: number) => {
    setS((p) => {
      const next = Math.max(0, Math.min(100, p.hp + delta));
      const wasEmergency = p.hp < 40;
      const recoveredFromEmergency = p.recoveredFromEmergency || (wasEmergency && next >= 40);
      const reachedFullHpAgain = p.reachedFullHpAgain || (recoveredFromEmergency && next >= 100);
      return { ...p, hp: next, recoveredFromEmergency, reachedFullHpAgain };
    });
  }, []);
  const addXP = useCallback((delta: number) => {
    setS((p) => {
      const xp = p.xp + delta;
      const level = Math.max(1, Math.floor(xp / 100) + 1);
      return { ...p, xp, level };
    });
  }, []);
  const unlockBadge = useCallback((id: string) => {
    setS((p) => (p.badges.includes(id) ? p : { ...p, badges: [...p.badges, id] }));
  }, []);
  const setHP = useCallback((n: number) => {
    setS((p) => ({ ...p, hp: Math.max(0, Math.min(100, n)) }));
  }, []);
  const setAvatar = useCallback((id: string) => {
    setS((p) => ({ ...p, avatar: id }));
  }, []);
  const recordQuest = useCallback(() => {
    setS((p) => ({ ...p, questsCompleted: p.questsCompleted + 1 }));
  }, []);

  const value: State = {
    ...s,
    mode: modeFromHp(s.hp),
    addHP, addXP, unlockBadge, setHP, setAvatar, recordQuest,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHP() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHP must be used inside HPProvider");
  return v;
}