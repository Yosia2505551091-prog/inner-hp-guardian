import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { useEffect, useMemo, useState } from "react";
import { Sparkles, Check, RefreshCcw, Gem } from "lucide-react";
import { CATEGORY_META, Difficulty, Quest, pickDailyQuests, rerollQuest, QuestCategory } from "@/lib/quests";
import { useHP, MODE_META } from "@/lib/hp-context";
import { questCompleteQuote } from "@/lib/quotes";
import { MainQuestJourney } from "@/components/MainQuestJourney";

export const Route = createFileRoute("/quests")({
  component: Quests,
  head: () => ({ meta: [{ title: "Quest Board — InnerHP" }, { name: "description", content: "Daily self-care quests to restore your HP." }] }),
});

const diffColor: Record<Difficulty, string> = {
  easy: "bg-[var(--mint)]/70",
  medium: "bg-[var(--sky)]/70",
  hard: "bg-[var(--peach)]/80",
};

function Quests() {
  const { addHP, addXP, recordQuest, mode, questsCompleted, checkinCount, streak, level, badges, hp70Days, recoveredFromEmergency } = useHP();
  const mqStats = {
    questsCompleted, checkinCount, streak, level,
    badgesUnlocked: badges.length, recoveredFromEmergency, hp70Days,
  };
  const [active, setActive] = useState<Quest[]>(() => pickDailyQuests(undefined, mode));
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [rerolling, setRerolling] = useState<string | null>(null);
  const [filter, setFilter] = useState<QuestCategory | "all">("all");
  const [reward, setReward] = useState<{ hp: number; xp: number; quote: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [rerolledIds, setRerolledIds] = useState<string[]>([]);

  // When the user's HP mode changes (e.g. recovers), refresh the daily set
  useEffect(() => {
    setActive(pickDailyQuests(undefined, mode));
    setDone({});
    setRerolledIds([]);
  }, [mode]);

  const visible = useMemo(
    () => active.filter((q) => filter === "all" || q.category === filter),
    [active, filter],
  );

  const totalHP = active.reduce((a, q) => a + (done[q.id] ? q.hp : 0), 0);

  const complete = (q: Quest) => {
    if (done[q.id]) return;
    setDone((p) => ({ ...p, [q.id]: true }));
    addHP(q.hp);
    addXP(q.xp);
    recordQuest();
    setReward({ hp: q.hp, xp: q.xp, quote: questCompleteQuote() });
    setTimeout(() => setReward(null), 2200);
  };

  const refresh = (q: Quest) => {
    setRerolling(q.id);
    setTimeout(() => {
      const exclude = [...active.map((x) => x.id), ...rerolledIds];
      const next = rerollQuest(q, exclude);
      setActive((prev) => prev.map((x) => (x.id === q.id ? next : x)));
      setRerolledIds((prev) => [...prev, q.id].slice(-20));
      setRerolling(null);
      setToast("A new quest has appeared in your Quest Board.");
      setTimeout(() => setToast(null), 2400);
    }, 700);
  };

  const categories: (QuestCategory | "all")[] = ["all", "self-care", "mental", "physical", "social", "productivity", "fun"];

  return (
    <MobileShell>
      <header>
        <h1 className="font-display text-3xl font-bold">Quest board</h1>
        <p className="text-xs text-muted-foreground">
          {MODE_META[mode].label} mode · {active.length} quests today
        </p>
      </header>

      <MainQuestJourney stats={mqStats} />

      <div className="mt-5 flex items-center gap-2">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Daily quests</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="glass mt-4 flex items-center justify-between rounded-3xl p-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Earned today</p>
          <p className="font-display text-2xl font-bold">+{totalHP} HP</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Completed</p>
          <p className="font-display text-2xl font-bold">{Object.values(done).filter(Boolean).length}/{active.length}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Reroll</p>
          <p className="flex items-center justify-end gap-1 font-display text-sm font-bold">
            <Gem className="h-3 w-3 text-[var(--lavender)]" />
            Unlimited
          </p>
        </div>
      </div>

      <div className="mt-4 -mx-1 flex gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => {
          const meta = c === "all" ? { label: "All", emoji: "🗺️" } : CATEGORY_META[c];
          const on = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                on ? "gradient-primary shadow-md" : "glass-soft text-muted-foreground"
              }`}
            >
              <span className="mr-1">{meta.emoji}</span>{meta.label}
            </button>
          );
        })}
      </div>

      <section className="mt-4 space-y-3">
        {visible.map((q) => {
          const I = q.icon;
          const isDone = !!done[q.id];
          const isReroll = rerolling === q.id;
          return (
            <div key={q.id} className={`glass relative overflow-hidden rounded-3xl p-4 transition-all ${isDone ? "opacity-70" : ""}`}>
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-30 blur-2xl" style={{ background: q.tint }} />
              <div className="relative flex items-center gap-3">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl shadow-inner ${isReroll ? "animate-reroll" : ""}`}
                     style={{ background: `color-mix(in oklab, ${q.tint} 70%, white)` }}>
                  <I className="h-6 w-6 text-foreground/80" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="font-display text-base font-semibold">{q.name}</p>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="rounded-full bg-white/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground">
                      {CATEGORY_META[q.category].emoji} {CATEGORY_META[q.category].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{q.description}</p>
                  <p className="mt-1 text-[11px] font-semibold">
                    <span className="text-[color:var(--hp)]">+{q.hp} HP</span>
                    <span className="text-muted-foreground"> · +{q.xp} XP · {q.minutes}m</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => complete(q)}
                    disabled={isDone}
                    aria-label="Complete quest"
                    className={`grid h-10 w-10 place-items-center rounded-full transition-all ${
                      isDone ? "bg-[var(--hp)] text-white" : "gradient-primary text-foreground shadow-md active:scale-95"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => refresh(q)}
                    disabled={isDone || isReroll}
                    aria-label="Reroll quest"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/50 backdrop-blur transition-all hover:bg-white active:scale-95 disabled:opacity-40"
                  >
                    <RefreshCcw className={`h-4 w-4 ${isReroll ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {toast && (
        <div className="fixed inset-x-0 bottom-24 z-[55] flex justify-center px-6">
          <div className="glass animate-magic-pop rounded-full px-4 py-2 text-xs font-semibold shadow-lg">
            ✨ {toast}
          </div>
        </div>
      )}

      {reward && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/30 backdrop-blur-sm">
          <div className="glass animate-magic-pop rounded-3xl px-8 py-6 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-[var(--hp)]" />
            <p className="mt-2 font-display text-3xl font-bold text-gradient">+{reward.hp} HP</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">+{reward.xp} XP</p>
            <p className="mt-2 max-w-[18rem] text-sm text-muted-foreground">{reward.quote}</p>
          </div>
        </div>
      )}
    </MobileShell>
  );
}