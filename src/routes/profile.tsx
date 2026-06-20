import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HPBar } from "@/components/HPBar";
import { Settings, Moon, Bell, Shield, ChevronRight, Trophy, Lock, Check, X } from "lucide-react";
import { useHP, MODE_META } from "@/lib/hp-context";
import { AVATARS, CATEGORY_LABEL, avatarById, avatarUnlocked, AvatarCategory } from "@/lib/avatars";
import { BADGES, BADGE_CATEGORY_LABEL, BadgeCategory, badgeStatus, BadgeDef } from "@/lib/badges";
import { titleForLevel, xpProgress, nextMilestone } from "@/lib/levels";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — InnerHP" }, { name: "description", content: "Your character, avatars, and legendary badges." }] }),
});

function Profile() {
  const { hp, xp, level, streak, mode, avatar, setAvatar, questsCompleted, recoveredFromEmergency, reachedFullHpAgain, badges } = useHP();
  const meta = MODE_META[mode];
  const av = avatarById(avatar);
  const title = titleForLevel(level);
  const xpInfo = xpProgress(xp, level);
  const nextTitleAt = nextMilestone(level);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [tipBadge, setTipBadge] = useState<BadgeDef | null>(null);
  const [tipPos, setTipPos] = useState<{ left: number; top: number } | null>(null);

  const badgeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const ownedAvatars = useMemo(() => AVATARS.filter((a) => avatarUnlocked(a, level)).length, [level]);

  const badgeState = {
    questsCompleted,
    streak,
    hp,
    recoveredFromEmergency,
    reachedFullHpAgain,
    avatarsOwned: ownedAvatars,
    badgesUnlocked: badges.length,
  };
  const unlockedCount = BADGES.filter((b) => badgeStatus(b, badgeState).unlocked).length;

  const previewAvatar = preview ? avatarById(preview) : av;

  const grouped = (cat: BadgeCategory) => BADGES.filter((b) => b.category === cat);
  const avatarGrouped = (cat: AvatarCategory) => AVATARS.filter((a) => a.category === cat);

  const handleBadgeClick = useCallback((b: BadgeDef) => {
    const el = badgeRefs.current[b.id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const tipWidth = vw < 380 ? 200 : vw < 640 ? 216 : 224;
    const pad = 10;
    const centerX = Math.max(
      tipWidth / 2 + pad,
      Math.min(rect.left + rect.width / 2, vw - tipWidth / 2 - pad)
    );
    const topY = rect.top;
    if (tipBadge?.id === b.id) {
      setTipBadge(null);
      setTipPos(null);
    } else {
      setTipBadge(b);
      setTipPos({ left: centerX, top: topY });
    }
  }, [tipBadge]);

  useEffect(() => {
    if (!tipBadge) return;
    const onScroll = () => setTipBadge(null);
    const onResize = () => setTipBadge(null);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [tipBadge]);

  const tipStatus = tipBadge ? badgeStatus(tipBadge, badgeState) : null;

  return (
    <>
      <MobileShell>
        <header className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Hero profile</h1>
          <Link to="/settings" className="glass grid h-10 w-10 place-items-center rounded-full">
            <Settings className="h-4 w-4" />
          </Link>
        </header>

        <section className="glass mt-4 overflow-hidden rounded-3xl p-5 text-center">
          <button
            onClick={() => { setPreview(avatar); setGalleryOpen(true); }}
            className="relative mx-auto block w-fit"
            aria-label="Change avatar"
          >
            <div className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-60" style={{ background: av.tint }} />
            <div
              className="animate-float grid h-32 w-32 place-items-center rounded-full text-6xl shadow-inner"
              style={{ background: `radial-gradient(circle at 30% 30%, white, ${av.tint})` }}
            >
              {av.emoji}
            </div>
            <span className="glass-soft mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold">Tap to change</span>
          </button>
          <h2 className="mt-2 font-display text-2xl font-bold">{av.name}</h2>
          <p className="text-xs text-muted-foreground">{title} · Lvl {level} · {meta.label}</p>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>XP {xpInfo.into}/{xpInfo.needed}</span>
              <span>Next title · Lvl {nextTitleAt}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
              <div className="gradient-primary h-full rounded-full transition-all duration-700" style={{ width: `${xpInfo.pct}%` }} />
            </div>
          </div>

          <div className="mt-4">
            <HPBar value={hp} />
          </div>
          <div className="mt-3 flex justify-around text-center">
            <div><p className="font-display text-lg font-bold">{questsCompleted}</p><p className="text-[10px] uppercase text-muted-foreground">quests</p></div>
            <div><p className="font-display text-lg font-bold">{unlockedCount}</p><p className="text-[10px] uppercase text-muted-foreground">badges</p></div>
            <div><p className="font-display text-lg font-bold">{streak}</p><p className="text-[10px] uppercase text-muted-foreground">streak</p></div>
          </div>
        </section>

        {/* Avatar gallery preview */}
        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Avatar gallery</h3>
            <button onClick={() => { setPreview(avatar); setGalleryOpen(true); }} className="text-xs text-muted-foreground">
              View all <ChevronRight className="inline h-3 w-3" />
            </button>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
            {AVATARS.map((a) => {
              const unlocked = avatarUnlocked(a, level);
              const active = a.id === avatar;
              return (
                <button
                  key={a.id}
                  onClick={() => unlocked && setAvatar(a.id)}
                  className={`shrink-0 rounded-2xl p-2 transition-all ${active ? "glass shadow-md scale-105" : "glass-soft"} ${unlocked ? "" : "opacity-50"}`}
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full text-2xl"
                       style={{ background: `radial-gradient(circle at 30% 30%, white, ${a.tint})` }}>
                    {unlocked ? a.emoji : <Lock className="h-4 w-4 text-foreground/50" />}
                  </div>
                  <p className="mt-1 w-16 truncate text-center text-[10px] font-semibold">{a.name}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Legendary badges */}
        <section className="mt-5 pb-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Legendary badges</h3>
            <span className="text-xs text-muted-foreground"><Trophy className="mr-1 inline h-3 w-3" />{unlockedCount} / {BADGES.length}</span>
          </div>

          {(["quest", "streak", "recovery", "lifestyle", "profile"] as BadgeCategory[]).map((cat) => (
            <div key={cat} className="mt-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{BADGE_CATEGORY_LABEL[cat]}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {grouped(cat).map((b) => {
                  const status = badgeStatus(b, badgeState);
                  return (
                    <button
                      key={b.id}
                      ref={(el) => { badgeRefs.current[b.id] = el; }}
                      onClick={() => handleBadgeClick(b)}
                      onMouseEnter={() => {
                        const el = badgeRefs.current[b.id];
                        if (!el) return;
                        const rect = el.getBoundingClientRect();
                        const vw = window.innerWidth;
                        const tipWidth = vw < 380 ? 200 : vw < 640 ? 216 : 224;
                        const pad = 10;
                        const centerX = Math.max(
                          tipWidth / 2 + pad,
                          Math.min(rect.left + rect.width / 2, vw - tipWidth / 2 - pad)
                        );
                        setTipBadge(b);
                        setTipPos({ left: centerX, top: rect.top });
                      }}
                      onMouseLeave={() => {
                        setTipBadge(null);
                        setTipPos(null);
                      }}
                      className={`glass-soft relative grid place-items-center rounded-2xl p-3 text-center transition-all hover:scale-[1.03] ${status.unlocked ? "" : "opacity-60"}`}
                    >
                      <div
                        className="grid h-14 w-14 place-items-center rounded-full text-2xl shadow-inner"
                        style={{ background: `radial-gradient(circle at 30% 30%, white, ${b.color})` }}
                      >
                        {status.unlocked ? b.emoji : <Lock className="h-5 w-5 text-foreground/50" />}
                      </div>
                      <p className="mt-2 text-[11px] font-semibold leading-tight">{b.name}</p>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/60">
                        <div className="h-full rounded-full transition-all" style={{ width: `${status.pct}%`, background: b.color }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-5 space-y-2">
          {[
            { i: Bell, l: "Notifications", v: "Gentle" },
            { i: Moon, l: "Night mode", v: "Auto" },
            { i: Shield, l: "Privacy", v: "On-device" },
          ].map(({ i: Ic, l, v }, k) => (
            <button key={k} className="glass-soft flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left">
              <Ic className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">{l}</span>
              <span className="text-xs text-muted-foreground">{v}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
          <Link to="/emergency" className="glass-soft flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left">
            <span className="text-base">🌿</span>
            <span className="flex-1 text-sm font-medium">Calm space</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </section>

        {/* Avatar gallery modal */}
        {galleryOpen && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-3 backdrop-blur-sm sm:items-center">
            <div className="glass animate-magic-pop max-h-[85vh] w-full max-w-[420px] overflow-y-auto rounded-3xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Choose your hero</h3>
                <button onClick={() => setGalleryOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/70">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Preview */}
              <div className="glass-soft mb-4 flex items-center gap-4 rounded-2xl p-4">
                <div
                  className="grid h-20 w-20 place-items-center rounded-full text-4xl shadow-inner"
                  style={{ background: `radial-gradient(circle at 30% 30%, white, ${previewAvatar.tint})` }}
                >
                  {previewAvatar.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold">{previewAvatar.name}</p>
                  <p className="text-[11px] text-muted-foreground">{previewAvatar.title}</p>
                  {!avatarUnlocked(previewAvatar, level) && (
                    <p className="mt-1 text-[10px] font-semibold text-[var(--peach)]">🔒 {previewAvatar.unlockHint}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (preview && avatarUnlocked(previewAvatar, level)) {
                      setAvatar(preview);
                      setGalleryOpen(false);
                    }
                  }}
                  disabled={!avatarUnlocked(previewAvatar, level)}
                  className="gradient-primary grid h-10 w-10 place-items-center rounded-full shadow-md disabled:opacity-40"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>

              {(["adventurer", "casual", "creature"] as AvatarCategory[]).map((cat) => (
                <div key={cat} className="mb-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{CATEGORY_LABEL[cat]}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {avatarGrouped(cat).map((a) => {
                      const unlocked = avatarUnlocked(a, level);
                      const isPreview = preview === a.id;
                      return (
                        <button
                          key={a.id}
                          onClick={() => setPreview(a.id)}
                          className={`rounded-2xl p-2 transition-all ${isPreview ? "glass shadow-md scale-105" : "glass-soft"} ${unlocked ? "" : "opacity-50"}`}
                        >
                          <div className="grid h-14 w-14 place-items-center rounded-full text-2xl"
                               style={{ background: `radial-gradient(circle at 30% 30%, white, ${a.tint})` }}>
                            {unlocked ? a.emoji : <Lock className="h-4 w-4 text-foreground/50" />}
                          </div>
                          <p className="mt-1 truncate text-center text-[10px] font-semibold">{a.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </MobileShell>

      {/* Fixed badge tooltip — rendered outside all containers so it can never be clipped */}
      {tipBadge && tipPos && tipStatus && (
        <div
          className="pointer-events-none fixed z-[90] w-[200px] xs:w-[216px] sm:w-56 animate-in fade-in zoom-in-95 duration-200"
          style={{ left: tipPos.left, top: tipPos.top - 8, transform: "translate(-50%, -100%)" }}
        >
          <div
            className="rounded-2xl border border-white/20 bg-foreground/95 p-4 text-white shadow-2xl backdrop-blur-md"
            style={{ boxShadow: `0 12px 40px -8px color-mix(in oklab, ${tipBadge.color} 50%, black)` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{tipStatus.unlocked ? tipBadge.emoji : "🔒"}</span>
              <p className="font-display text-sm font-bold">{tipBadge.name}</p>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed opacity-80">{tipBadge.description}</p>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] uppercase tracking-wider opacity-60">Requirement</p>
              <p className="text-[11px]">{tipBadge.requirement}</p>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Progress</p>
              <p className="text-[11px]">{tipStatus.progress} / {tipBadge.goal} · {tipStatus.pct}%</p>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Reward</p>
              <p className="text-[11px]">+{tipBadge.xp} XP</p>
            </div>
          </div>
          {/* Little arrow pointing down to the badge */}
          <div
            className="mx-auto h-2 w-2 rotate-45 border-b border-r border-white/20 bg-foreground/95"
            style={{ marginTop: -5 }}
          />
        </div>
      )}
    </>
  );
}
