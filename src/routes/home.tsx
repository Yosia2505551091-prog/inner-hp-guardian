import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HPBar } from "@/components/HPBar";
import { Flame, Trophy, Coffee, ChevronRight, Settings, Compass, Sparkles } from "lucide-react";
import { useHP, MODE_META } from "@/lib/hp-context";
import { pickDailyQuests } from "@/lib/quests";
import { dailyQuote, recoveryQuote, emergencyQuote } from "@/lib/quotes";
import { useState } from "react";
import { avatarById } from "@/lib/avatars";
import { titleForLevel, xpProgress, nextMilestone } from "@/lib/levels";
import { activeChapter, chapterProgress } from "@/lib/main-quests";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({ meta: [{ title: "Adventurer's Camp — InnerHP" }, { name: "description", content: "Your daily Mental HP camp." }] }),
});

function Home() {
  const { hp, xp, level, streak, badges, mode, avatar, questsCompleted, checkinCount, hp70Days, recoveredFromEmergency } = useHP();
  const meta = MODE_META[mode];
  const todayQuests = pickDailyQuests(undefined, mode).slice(0, 3);
  const av = avatarById(avatar);
  const title = titleForLevel(level);
  const xpInfo = xpProgress(xp, level);
  const nextTitleAt = nextMilestone(level);
  const mqStats = { questsCompleted, checkinCount, streak, level, badgesUnlocked: badges.length, recoveredFromEmergency, hp70Days };
  const mainQuest = activeChapter(mqStats);
  const mainProgress = chapterProgress(mainQuest, mqStats);
  const dayQuestsTotal = mode === "maintenance" ? 6 : mode === "recovery" ? 5 : 3;
  const completionRate = Math.round((Math.min(todayQuests.length, dayQuestsTotal) / dayQuestsTotal) * 100);
  const pickQuote = () =>
    mode === "emergency" ? emergencyQuote()
    : mode === "recovery" ? recoveryQuote()
    : dailyQuote();
  const [quote, setQuote] = useState<string>(() => pickQuote());

  return (
    <MobileShell>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Welcome back, hero</p>
          <h1 className="font-display text-2xl font-bold">Aria 🌙</h1>
        </div>
        <Link to="/settings" className="glass grid h-11 w-11 place-items-center rounded-full">
          <Settings className="h-5 w-5" />
        </Link>
      </header>

      {/* Mode banner */}
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
           style={{ background: `color-mix(in oklab, ${meta.tint} 35%, white)` }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.tint }} />
        {meta.label} mode · {meta.sub}
      </div>

      {/* HP Card */}
      <section className="glass relative mt-3 overflow-hidden rounded-3xl p-5">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-40 blur-2xl" style={{ background: meta.tint }} />
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full blur-xl opacity-60" style={{ background: av.tint }} />
            <div
              className="animate-float grid h-24 w-24 place-items-center rounded-full text-5xl shadow-inner"
              style={{ background: `radial-gradient(circle at 30% 30%, white, ${av.tint})` }}
              aria-label={av.name}
            >
              {av.emoji}
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-[var(--mint)]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              <Flame className="h-3 w-3" /> Lvl {level} · {title}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{meta.tagline}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>XP {xpInfo.into}/{xpInfo.needed}</span>
                <span>Next title · Lvl {nextTitleAt}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
                <div className="gradient-primary h-full rounded-full transition-all duration-700" style={{ width: `${xpInfo.pct}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <HPBar value={hp} />
        </div>
      </section>

      {/* Quote */}
      <button
        type="button"
        onClick={() => setQuote(pickQuote())}
        aria-label="New inspirational quote"
        className="mt-5 block w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--peach)]/60 to-[var(--lavender)]/60 p-5 text-left transition-transform active:scale-[0.99]"
      >
        <Coffee className="h-5 w-5 text-foreground/70" />
        <p className="mt-2 font-display text-base leading-snug">“{quote}”</p>
        <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">Tap for another</p>
      </button>

      {/* Main quest */}
      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Main quest</h3>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Long journey</span>
        </div>
        <div className="glass relative overflow-hidden rounded-3xl p-4">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl bg-[var(--lavender)]" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--lavender)]/40">
              <Compass className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Chapter {mainQuest.number}</p>
              <p className="font-display text-base font-semibold">{mainQuest.title}</p>
              <p className="text-[11px] text-muted-foreground">{mainQuest.story}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-sm font-bold">{mainProgress.pct}%</p>
              <p className="text-[10px] text-muted-foreground">+{mainQuest.rewards.xp} XP</p>
            </div>
          </div>
          <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-white/60">
            <div className="gradient-hp h-full rounded-full transition-all duration-700" style={{ width: `${mainProgress.pct}%` }} />
          </div>
        </div>
      </section>

      {/* Active quests */}
      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Today's quests</h3>
          <Link to="/quests" className="flex items-center text-xs text-muted-foreground">
            Quest board <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {todayQuests.map((q) => {
            const I = q.icon;
            return (
              <div key={q.id} className="glass flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${q.tint} 60%, white)` }}>
                  <I className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{q.name}</p>
                  <p className="text-[11px] text-muted-foreground">+{q.hp} HP · {q.difficulty} · {q.minutes}m</p>
                </div>
                <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-dashed border-muted-foreground/40 text-[10px] font-bold" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Adventure status (replaces Hours Slept card) */}
      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Current adventure status</h3>
          <Sparkles className="h-4 w-4 text-[var(--lavender)]" />
        </div>
        <div className="glass-soft grid grid-cols-2 gap-2 rounded-3xl p-3">
          <div className="rounded-2xl bg-white/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Mode</p>
            <p className="font-display text-base font-bold">{meta.label}</p>
          </div>
          <div className="rounded-2xl bg-white/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Level</p>
            <p className="font-display text-base font-bold">Lv {level}</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-white/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active chapter</p>
            <p className="font-display text-sm font-bold leading-tight">Ch {mainQuest.number} · {mainQuest.title}</p>
            <p className="text-[11px] text-muted-foreground">{mainProgress.pct}% complete</p>
          </div>
          <div className="rounded-2xl bg-white/40 p-3 text-center">
            <Trophy className="mx-auto h-4 w-4 text-[var(--lavender)]" />
            <p className="mt-1 font-display text-lg font-bold">{completionRate}%</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Quest rate</p>
          </div>
          <div className="rounded-2xl bg-white/40 p-3 text-center">
            <Flame className="mx-auto h-4 w-4 text-[var(--peach)]" />
            <p className="mt-1 font-display text-lg font-bold">{streak}d</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</p>
          </div>
        </div>
      </section>

      <Link to="/emergency" className="mt-5 block text-center text-[11px] text-muted-foreground underline-offset-4 hover:underline">
        Feeling overwhelmed? Tap for a calm sanctuary →
      </Link>
    </MobileShell>
  );
}