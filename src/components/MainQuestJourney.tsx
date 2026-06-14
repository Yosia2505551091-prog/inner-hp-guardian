import { useMemo, useState } from "react";
import { Check, Lock, Scroll, Sparkles, ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { CHAPTERS, activeChapter, chapterProgress, chapterStatus, type Chapter, type MainQuestStats } from "@/lib/main-quests";

function StatusBadge({ status }: { status: "complete" | "active" | "locked" }) {
  if (status === "complete") return <span className="inline-flex items-center gap-1 rounded-full bg-[var(--mint)]/70 px-2 py-0.5 text-[10px] font-bold uppercase">✓ Complete</span>;
  if (status === "active")   return <span className="inline-flex items-center gap-1 rounded-full bg-[var(--peach)]/80 px-2 py-0.5 text-[10px] font-bold uppercase">► In progress</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground"><Lock className="h-2.5 w-2.5" /> Locked</span>;
}

function ChapterCard({ chapter, stats, featured = false }: { chapter: Chapter; stats: MainQuestStats; featured?: boolean }) {
  const status = chapterStatus(chapter, stats);
  const prog = chapterProgress(chapter, stats);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 ${
        featured
          ? "border-2 border-[color:var(--peach)] bg-gradient-to-br from-[oklch(0.97_0.04_85)] via-[oklch(0.96_0.05_60)] to-[oklch(0.95_0.06_50)] shadow-[0_8px_30px_-8px_oklch(0.78_0.16_60/0.55)]"
          : "glass"
      }`}
    >
      {featured && (
        <>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--peach)]/40 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[var(--lavender)]/30 blur-2xl" />
        </>
      )}
      <div className="relative">
        <div className="flex items-start gap-3">
          <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${featured ? "bg-gradient-to-br from-[var(--peach)] to-[var(--lavender)] shadow-md" : "bg-white/60"}`}>
            <Scroll className="h-5 w-5 text-foreground/80" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Chapter {chapter.number}</span>
              <StatusBadge status={status} />
            </div>
            <h3 className="font-display text-lg font-bold leading-tight">{chapter.title}</h3>
            <p className="mt-0.5 text-[11px] italic leading-snug text-muted-foreground">{chapter.story}</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Overall completion</span>
            <span>{prog.pct}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--peach)] via-[var(--lavender)] to-[var(--sky)] transition-all duration-700"
              style={{ width: `${prog.pct}%` }}
            />
          </div>
        </div>

        {/* Objectives */}
        <ul className="mt-3 space-y-2">
          {prog.items.map(({ objective, current, pct, complete }) => (
            <li key={objective.id} className="rounded-2xl bg-white/55 p-2.5">
              <div className="flex items-center gap-2">
                <div className={`grid h-5 w-5 place-items-center rounded-full ${complete ? "bg-[var(--mint)]" : "border-2 border-dashed border-muted-foreground/40"}`}>
                  {complete && <Check className="h-3 w-3 text-foreground" />}
                </div>
                <p className={`flex-1 text-xs font-semibold ${complete ? "line-through opacity-70" : ""}`}>{objective.label}</p>
                <span className="font-display text-[11px] font-bold text-muted-foreground">{current}/{objective.goal}</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/70">
                <div className="h-full rounded-full bg-[var(--lavender)] transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </li>
          ))}
        </ul>

        {/* Reward */}
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[var(--peach)]/50 bg-white/50 p-2.5">
          <Trophy className="h-4 w-4 text-[oklch(0.7_0.16_60)]" />
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reward</p>
            <p className="font-display text-xs font-bold">{chapter.rewards.label}</p>
          </div>
          {status === "complete" && <Sparkles className="h-4 w-4 text-[var(--hp)]" />}
        </div>
      </div>
    </div>
  );
}

function Timeline({ stats, onPick }: { stats: MainQuestStats; onPick: (id: string) => void }) {
  const active = activeChapter(stats);
  return (
    <ol className="relative ml-2 border-l-2 border-dashed border-[var(--lavender)]/60 pl-4">
      {CHAPTERS.map((c) => {
        const status = chapterStatus(c, stats);
        const isActive = c.id === active.id;
        const dot =
          status === "complete" ? "bg-[var(--mint)] text-foreground"
          : status === "active" ? "bg-[var(--peach)] text-foreground animate-pulse"
          : "bg-white/60 text-muted-foreground";
        const icon = status === "complete" ? "✓" : status === "active" ? "►" : "🔒";
        return (
          <li key={c.id} className="relative mb-2 last:mb-0">
            <span className={`absolute -left-[22px] top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-[10px] font-bold ${dot}`}>{icon}</span>
            <button
              onClick={() => onPick(c.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-all hover:bg-white/60 ${isActive ? "bg-white/70" : ""}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ch {c.number}</span>
              <span className="flex-1 font-display text-xs font-semibold">{c.title}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function MainQuestJourney({ stats }: { stats: MainQuestStats }) {
  const active = useMemo(() => activeChapter(stats), [stats]);
  const [pickedId, setPickedId] = useState<string>(active.id);
  const [showTimeline, setShowTimeline] = useState(false);
  const picked = CHAPTERS.find((c) => c.id === pickedId) ?? active;

  return (
    <section className="mt-1">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Main Quest Journey</p>
          <h2 className="font-display text-lg font-bold">Path of the Keeper</h2>
        </div>
        <button
          onClick={() => setShowTimeline((v) => !v)}
          className="glass-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold"
        >
          {showTimeline ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          Timeline
        </button>
      </div>

      <ChapterCard chapter={picked} stats={stats} featured />

      {showTimeline && (
        <div className="glass mt-3 rounded-3xl p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Journey timeline</p>
          <Timeline stats={stats} onPick={(id) => setPickedId(id)} />
        </div>
      )}
    </section>
  );
}