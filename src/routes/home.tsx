import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HPBar } from "@/components/HPBar";
import heroAvatar from "@/assets/hero-avatar.png";
import { Bell, Flame, Trophy, Coffee, BookHeart, Wind, Droplets, Moon, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({ meta: [{ title: "Home — InnerHP" }, { name: "description", content: "Your daily mental HP dashboard." }] }),
});

const moods = [
  { e: "🌧️", label: "Low" },
  { e: "😐", label: "Meh" },
  { e: "🙂", label: "Okay" },
  { e: "😊", label: "Good" },
  { e: "✨", label: "Bright" },
];

const todayQuests = [
  { icon: Droplets, name: "Sip 6 glasses of water", hp: 5, tint: "var(--sky)", done: true },
  { icon: Wind, name: "3 min breathing", hp: 8, tint: "var(--mint)", done: false },
  { icon: BookHeart, name: "Journal one feeling", hp: 10, tint: "var(--lavender)", done: false },
];

function Home() {
  return (
    <MobileShell>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good evening,</p>
          <h1 className="font-display text-2xl font-bold">Aria 🌙</h1>
        </div>
        <button className="glass grid h-11 w-11 place-items-center rounded-full">
          <Bell className="h-5 w-5" />
        </button>
      </header>

      {/* HP Card */}
      <section className="glass relative mt-5 overflow-hidden rounded-3xl p-5">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--lavender)] opacity-40 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-[var(--mint)] blur-xl opacity-60" />
            <img src={heroAvatar} alt="Your companion" width={768} height={768} className="animate-float h-24 w-24 object-contain" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-[var(--mint)]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              <Flame className="h-3 w-3" /> Lvl 7 · Calm Wanderer
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Feeling balanced today</p>
          </div>
        </div>
        <div className="mt-4">
          <HPBar value={72} />
        </div>
      </section>

      {/* Mood quick row */}
      <section className="mt-5">
        <h3 className="mb-2 font-display text-sm font-semibold text-muted-foreground">How's your heart right now?</h3>
        <div className="glass-soft flex justify-between rounded-2xl p-2">
          {moods.map((m, i) => (
            <button key={i} className={`flex flex-col items-center rounded-xl px-2 py-1.5 transition-all hover:bg-white/60 ${i === 3 ? "bg-white/70 shadow-sm" : ""}`}>
              <span className="text-2xl">{m.e}</span>
              <span className="mt-0.5 text-[10px] text-muted-foreground">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--peach)]/60 to-[var(--lavender)]/60 p-5">
        <Coffee className="h-5 w-5 text-foreground/70" />
        <p className="mt-2 font-display text-base leading-snug">
          “You don't have to be a whole forest today. Be a single, soft leaf.”
        </p>
      </section>

      {/* Active quests */}
      <section className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Today's quests</h3>
          <Link to="/quests" className="flex items-center text-xs text-muted-foreground">
            All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {todayQuests.map((q, i) => {
            const I = q.icon;
            return (
              <div key={i} className="glass flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${q.tint} 60%, white)` }}>
                  <I className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${q.done ? "line-through text-muted-foreground" : ""}`}>{q.name}</p>
                  <p className="text-[11px] text-muted-foreground">+{q.hp} HP · easy</p>
                </div>
                <div className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${q.done ? "bg-[var(--hp)] text-white" : "border-2 border-dashed border-muted-foreground/40"}`}>
                  {q.done ? "✓" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 grid grid-cols-3 gap-2">
        {[
          { i: Flame, label: "Streak", v: "7d", t: "var(--peach)" },
          { i: Trophy, label: "Badges", v: "12", t: "var(--lavender)" },
          { i: Moon, label: "Sleep", v: "7h", t: "var(--sky)" },
        ].map(({ i: Ic, label, v, t }, k) => (
          <div key={k} className="glass-soft rounded-2xl p-3 text-center">
            <Ic className="mx-auto h-4 w-4" style={{ color: t }} />
            <p className="mt-1 font-display text-lg font-bold">{v}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <Link to="/emergency" className="mt-5 block text-center text-[11px] text-muted-foreground underline-offset-4 hover:underline">
        Feeling overwhelmed? Tap for a calm space →
      </Link>
    </MobileShell>
  );
}