import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Phone, Wind, BookHeart, Music } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  component: Emergency,
  head: () => ({ meta: [{ title: "Calm space — InnerHP" }, { name: "description", content: "A soft, dim place to breathe and recover." }] }),
});

function Emergency() {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [count, setCount] = useState(4);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhase((p) => (p === "in" ? "hold" : p === "hold" ? "out" : "in"));
        return 4;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.22_0.05_270)] via-[oklch(0.28_0.06_280)] to-[oklch(0.18_0.05_260)]" />
      <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "radial-gradient(600px 400px at 50% 30%, var(--lavender), transparent 70%)" }} />
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-6 py-8 text-white">
        <div className="flex items-center justify-between">
          <Link to="/home" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-white/60">Calm space</span>
          <div className="w-10" />
        </div>

        <div className="mt-2 text-center">
          <p className="text-xs text-white/60">Your HP feels low.</p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-tight">You're safe here. <br />Let's slow down together.</h1>
        </div>

        <div className="my-8 grid flex-1 place-items-center">
          <div className="relative grid place-items-center">
            <div
              className="absolute rounded-full bg-white/10 backdrop-blur transition-all duration-[4000ms] ease-in-out"
              style={{
                width: phase === "in" ? 280 : phase === "hold" ? 280 : 160,
                height: phase === "in" ? 280 : phase === "hold" ? 280 : 160,
              }}
            />
            <div
              className="absolute rounded-full transition-all duration-[4000ms] ease-in-out"
              style={{
                width: phase === "in" ? 240 : phase === "hold" ? 240 : 120,
                height: phase === "in" ? 240 : phase === "hold" ? 240 : 120,
                background: "radial-gradient(circle, color-mix(in oklab, var(--mint) 70%, transparent), transparent 70%)",
                boxShadow: "0 0 80px color-mix(in oklab, var(--mint) 60%, transparent)",
              }}
            />
            <div className="relative z-10 text-center">
              <p className="font-display text-3xl font-bold capitalize">{phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Release"}</p>
              <p className="mt-1 font-display text-6xl font-bold tabular-nums">{count}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { i: Wind, l: "Continue breathing (2 min)" },
            { i: BookHeart, l: "Write down what you feel" },
            { i: Music, l: "Play soft rain sounds" },
            { i: Phone, l: "Talk to someone who cares" },
          ].map(({ i: Ic, l }, k) => (
            <button key={k} className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-left backdrop-blur transition-all hover:bg-white/20">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                <Ic className="h-4 w-4" />
              </div>
              <span className="flex-1 text-sm font-medium">{l}</span>
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-white/50">
          You don't have to fix anything right now. <br />Just be here. That's enough.
        </p>
      </div>
    </div>
  );
}