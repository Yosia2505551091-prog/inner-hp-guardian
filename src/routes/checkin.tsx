import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

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
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(4);
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(6);
  const [productivity, setProductivity] = useState(5);

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
      </section>

      <button
        onClick={() => nav({ to: "/home" })}
        className="gradient-primary mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-semibold shadow-lg active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4" /> Save & restore +12 HP
      </button>
    </MobileShell>
  );
}