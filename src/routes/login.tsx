import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logoAsset from "@/assets/innerhp-logo.png.asset.json";
import { MagicParticles } from "@/components/MagicParticles";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — InnerHP" }, { name: "description", content: "Welcome back, hero." }] }),
});

function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-6 py-10">
      <MagicParticles />
      <div className="text-center">
        <img src={logoAsset.url} alt="InnerHP" className="mx-auto h-28 w-28 object-contain drop-shadow-xl" />
        <h1 className="mt-3 font-display text-3xl font-bold">Welcome back, hero</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your adventure journal is waiting.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/home" }); }} className="mt-8 space-y-3">
        <label className="glass-soft flex items-center gap-3 rounded-2xl px-4 py-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <input type="email" required defaultValue="adventurer@innerhp.com" placeholder="you@realm.com" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" />
        </label>
        <label className="glass-soft flex items-center gap-3 rounded-2xl px-4 py-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <input type={show ? "text" : "password"} required defaultValue="password123" placeholder="••••••••" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" />
          <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </label>
        <div className="flex items-center justify-between px-1 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-3.5 w-3.5 rounded" />
            Remember me
          </label>
          <Link to="/forgot" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="gradient-primary mt-2 w-full rounded-full py-3.5 font-display text-base font-semibold shadow-lg active:scale-[0.98]">
          Enter the realm
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or continue with <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-2">
        <button onClick={() => nav({ to: "/home" })} className="glass flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
          <span className="text-lg">🔮</span> Continue with Google
        </button>
        <button onClick={() => nav({ to: "/home" })} className="glass flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
          <span className="text-lg">📜</span> Continue with Facebook
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        New adventurer? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  );
}