import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { projects, statusLabel, formatINR, type ProjectStatus } from "@/data/mock";
import { AppShell } from "@/components/velto/app-shell";
import { AvatarStack, Button, Progress, StatusPill } from "@/components/velto/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · Velto" },
      {
        name: "description",
        content: "All studio projects in Velto — boards, materials, quotations and proposals.",
      },
      { property: "og:title", content: "Projects · Velto" },
      {
        property: "og:description",
        content: "All studio projects in Velto — boards, materials, quotations and proposals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const filters: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Residential", value: "Residential" },
  { label: "Hospitality", value: "Hospitality" },
  { label: "Workplace", value: "Workplace" },
  { label: "In review", value: "in-review" },
  { label: "Approved", value: "approved" },
];

function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    return projects.filter((p) => {
      const matchFilter =
        filter === "all" ||
        p.type === filter ||
        p.status === (filter as ProjectStatus);
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [filter, query]);

  const inReview = projects.filter((p) => p.status === "in-review").length;
  const pipeline = projects.reduce((s, p) => s + p.value, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-clay-deep">
              Studio workspace
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              Projects
            </h1>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-display text-3xl text-primary">{projects.length}</p>
              <p className="text-muted-foreground">Active projects</p>
            </div>
            <div>
              <p className="font-display text-3xl text-primary">{inReview}</p>
              <p className="text-muted-foreground">Awaiting review</p>
            </div>
            <div>
              <p className="font-display text-3xl text-primary">{formatINR(pipeline, true)}</p>
              <p className="text-muted-foreground">Pipeline value</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors",
                  filter === f.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-clay/40 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="ml-auto flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm focus-within:border-clay/40">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, clients, cities…"
              className="w-44 bg-transparent outline-none placeholder:text-muted-foreground sm:w-56"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link
              key={p.id}
              to="/projects/$id"
              params={{ id: p.id }}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_28px_56px_-28px_color-mix(in_oklab,var(--color-espresso)_40%,transparent)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.name}
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <StatusPill status={p.status} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl leading-tight">{p.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <MapPin className="size-3.5" /> {p.client} · {p.location}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[12px] text-muted-foreground">
                    <span>{p.progress}% complete</span>
                    <span>{formatINR(p.value, true)}</span>
                  </div>
                  <Progress value={p.progress} className="mt-1.5" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <AvatarStack people={p.team} />
                  <span className="text-[12px] text-muted-foreground">Due {p.due}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="font-display text-2xl italic">No projects match that search.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <p className="mt-10 text-center text-[13px] text-muted-foreground">
          {statusLabel.approved} · {statusLabel["in-review"]} · {statusLabel.concept} ·{" "}
          {statusLabel.delivered} — sample studio data
        </p>
      </div>
    </AppShell>
  );
}
