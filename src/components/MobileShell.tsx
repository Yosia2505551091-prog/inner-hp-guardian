import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ClipboardCheck, Sword, BarChart3, User } from "lucide-react";
import { ReactNode } from "react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/checkin", label: "Check-in", icon: ClipboardCheck },
  { to: "/quests", label: "Quests", icon: Sword },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/profile", label: "Me", icon: User },
] as const;

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col px-4 pb-28 pt-6">
      <main className="flex-1">{children}</main>
      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[92%] max-w-[420px]">
          <div className="glass flex items-center justify-between rounded-full px-3 py-2">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = path === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[10px] font-medium transition-all ${
                    active ? "gradient-primary text-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}