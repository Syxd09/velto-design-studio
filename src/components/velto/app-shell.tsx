import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  LayoutDashboard,
  LibraryBig,
  Menu,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { studio } from "@/data/mock";
import { Avatar, Button } from "@/components/velto/ui";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/projects", label: "Projects", icon: LayoutDashboard },
  { to: "/library", label: "Materials", icon: LibraryBig },
  { to: "/clients", label: "Clients", icon: Users },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-baseline gap-0.5", className)}>
      <span className="font-display text-2xl italic leading-none text-primary">V</span>
      <span className="font-display text-2xl tracking-tight text-foreground">elto</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Wordmark />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              className="hidden h-9 w-56 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm text-muted-foreground transition-colors hover:border-clay/40 lg:flex"
              onClick={() => toast.info("Search across projects, materials and clients — connect your backend to enable it.")}
            >
              <Search className="size-4" />
              Search the studio…
              <kbd className="ml-auto rounded border border-border bg-muted px-1.5 text-[10px]">⌘K</kbd>
            </button>
            <Button
              variant="clay"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => toast.success("New project draft created — demo only.")}
            >
              <Plus /> New project
            </Button>
            <button
              className="relative flex size-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => toast.info("3 notifications — Aisha approved a board, 2 samples arrived.")}
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </button>
            <Link
              to="/clients"
              className="hidden items-center gap-2.5 rounded-full border border-border bg-card py-1 pr-3 pl-1 transition-colors hover:border-clay/40 sm:flex"
            >
              <Avatar initials={studio.initials} />
              <span className="text-left leading-tight">
                <span className="block text-[13px] font-medium">{studio.member}</span>
                <span className="block text-[10px] text-muted-foreground">{studio.role}</span>
              </span>
            </Link>
            <button
              className="flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                  pathname.startsWith(item.to)
                    ? "bg-secondary font-medium"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
            <Button
              className="mt-2 w-full"
              size="sm"
              onClick={() => {
                setMenuOpen(false);
                toast.success("New project draft created — demo only.");
              }}
            >
              <Plus /> New project
            </Button>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/80 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-[13px] text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            Velto workspace · {studio.name} — <span className="italic font-display">every space, beautifully presented</span>
          </p>
          <p>UI preview · backend & AI ready to connect</p>
        </div>
      </footer>
    </div>
  );
}
