import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useHP } from "@/lib/hp-context";
import { HPBar } from "@/components/HPBar";

export const Route = createFileRoute("/checkin")({
  component: CheckIn,
  head: () => ({ meta: [{ title: "Daily check-in — InnerHP" }, { name: "description", content: "Log mood, stress, sleep and energy." }] }),
});

const moodOpts = [
  { e: "🌧️", l: "Heavy" },
  { e: "😔", l: "Low" },
  { e: "😐", l: "Meh" },
  { e: "🙂", l: "Okay" },
  { e: "😊", l: "Good" },
  { e: "✨", l: "Glowing" },
];

function Slider({ label, value, set, gradient }: { label: string; value: number; set: (n: number) => void; gradient: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="font-display text-sm text-muted-foreground">{value}/10</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full appearance-none rounded-full"
        style={{
          height: 10,
          background: `linear-gradient(90deg, ${gradient} ${value * 10}%, color-mix(in oklab, white 70%, transparent) ${value * 10}%)`,
        }}
      />
    </div>
  );
}

function CheckIn() {
  const nav = useNavigate();
  const { addHP, hp, recordCheckin } = useHP();
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(4);
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(6);
  const [productivity, setProductivity] = useState(5);
  const [social, setSocial] = useState(5);
  const [result, setResult] = useState<{ delta: number; reasons: string[] } | null>(null);

  const compute = () => {
    let delta = 0;
    const reasons: string[] = [];
    const moodMap = [-8, -5, -1, +4, +8, +10];
    delta += moodMap[mood]; reasons.push(`Mood ${moodMap[mood] >= 0 ? "+" : ""}${moodMap[mood]}`);
    const stressD = Math.round(5 - stress * 1.5);
    delta += stressD; reasons.push(`Stress ${stressD >= 0 ? "+" : ""}${stressD}`);
    const sleepD = Math.round((sleep - 5) * 1.6);
    delta += sleepD; reasons.push(`Sleep ${sleepD >= 0 ? "+" : ""}${sleepD}`);
    const eD = Math.round((energy - 5) * 1.2);
    delta += eD; reasons.push(`Energy ${eD >= 0 ? "+" : ""}${eD}`);
    const pD = Math.round((productivity - 5) * 0.8);
    delta += pD; reasons.push(`Focus ${pD >= 0 ? "+" : ""}${pD}`);
    const sD = Math.round((social - 5) * 0.8);
    delta += sD; reasons.push(`Bonds ${sD >= 0 ? "+" : ""}${sD}`);
    delta = Math.max(-15, Math.min(15, delta));
    addHP(delta);
    recordCheckin();
    setResult({ delta, reasons });
  };

  return (
    <MobileShell>
      <header className="flex items-center gap-3">
        <button onClick={() => nav({ to: "/home" })} className="glass grid h-10 w-10 place-items-center rounded-full">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold">Daily check-in</h1>
          <p className="text-xs text-muted-foreground">A soft moment to listen inward.</p>
        </div>
      </header>

      <section className="glass mt-5 rounded-3xl p-5">
        <p className="text-sm font-semibold">How are you feeling?</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {moodOpts.map((m, i) => (
            <button
              key={i}
              onClick={() => setMood(i)}
              className={`flex flex-col items-center rounded-2xl p-2 transition-all ${
                mood === i ? "gradient-primary scale-105 shadow-md" : "bg-white/40 hover:bg-white/70"
              }`}
            >
              <span className="text-xl">{m.e}</span>
              <span className="mt-0.5 text-[9px] font-medium">{m.l}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="glass mt-4 space-y-5 rounded-3xl p-5">
        <Slider label="🔥 Stress level" value={stress} set={setStress} gradient="var(--peach), oklch(0.7 0.18 30)" />
        <Slider label="🌙 Sleep quality" value={sleep} set={setSleep} gradient="var(--sky), var(--lavender)" />
        <Slider label="⚡ Energy" value={energy} set={setEnergy} gradient="var(--mint), var(--hp)" />
        <Slider label="🎯 Productivity" value={productivity} set={setProductivity} gradient="var(--lavender), var(--primary)" />
        <Slider label="💬 Social interaction" value={social} set={setSocial} gradient="var(--peach), var(--lavender)" />
      </section>

      <button
        onClick={compute}
        className="gradient-primary mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-semibold shadow-lg active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4" /> Cast the daily reading
      </button>

      {result && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/30 px-6 backdrop-blur-sm">
          <div className="glass animate-magic-pop w-full max-w-sm rounded-3xl p-6 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-[var(--lavender)]" />
            <p className="mt-2 font-display text-3xl font-bold text-gradient">
              {result.delta >= 0 ? `+${result.delta}` : result.delta} HP
            </p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {result.delta >= 0 ? "Your spirit recovers" : "Your spirit feels heavy"}
            </p>
            <div className="mt-3"><HPBar value={hp} /></div>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {result.reasons.map((r, i) => (
                <span key={i} className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold">{r}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {result.delta >= 0
                ? "Beautifully done. Carry this calm forward."
                : "You seem tired today. Recovery quests will help restore your Mental HP."}
            </p>
            <button onClick={() => nav({ to: "/home" })} className="gradient-primary mt-4 w-full rounded-full py-3 text-sm font-semibold">
              Return to camp
            </button>
          </div>
        </div>
      )}
    </MobileShell>
  );
}