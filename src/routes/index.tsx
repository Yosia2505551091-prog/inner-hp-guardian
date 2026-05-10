import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroAvatar from "@/assets/hero-avatar.png";
import { Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "InnerHP — Your Mental HP companion" },
      { name: "description", content: "A cozy RPG-inspired mental health tracker. Restore your Mental HP through self-care quests." },
    ],
  }),
});

function Index() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center justify-between px-6 py-12">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[var(--lavender)] to-[var(--sky)] blur-3xl opacity-60" />
          <img src={heroAvatar} alt="InnerHP companion" width={768} height={768} className="animate-float h-56 w-56 object-contain drop-shadow-2xl" />
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Your cozy companion
        </div>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
          Inner<span className="text-gradient">HP</span>
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          A gentle RPG world where your feelings have power. Care for yourself, restore your Mental HP, and level up your inner self.
        </p>
      </div>
      <div className="w-full space-y-3">
        <Link
          to="/onboarding"
          className="gradient-primary flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-semibold text-foreground shadow-lg transition-transform active:scale-[0.98]"
        >
          <Heart className="h-4 w-4 fill-[var(--hp)] text-[var(--hp)]" />
          Begin your journey
        </Link>
        <Link to="/home" className="block text-center text-xs text-muted-foreground hover:text-foreground">
          Skip intro →
        </Link>
      </div>
    </div>
  );
}
