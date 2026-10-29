import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  libraryMaterials,
  materialCategories,
  formatINR,
} from "@/data/mock";
import { AppShell } from "@/components/velto/app-shell";
import { Badge, Button, Eyebrow } from "@/components/velto/ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Materials Library · Velto" },
      {
        name: "description",
        content:
          "Stones, fabrics, woods, metals and finishes with suppliers and live pricing — the Velto materials library.",
      },
      { property: "og:title", content: "Materials Library · Velto" },
      {
        property: "og:description",
        content:
          "Stones, fabrics, woods, metals and finishes with suppliers and live pricing — the Velto materials library.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return libraryMaterials.filter(
      (m) =>
        (category === "All" || m.category === category) &&
        (!q ||
          m.name.toLowerCase().includes(q) ||
          m.supplier.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Eyebrow>Studio resources</Eyebrow>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Materials <span className="italic text-primary">library</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Every finish your studio specifies, with suppliers, finishes and live pricing —
          ready to drop into any board or bill of quantities.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {materialCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-clay/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="ml-auto flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm focus-within:border-clay/40">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials or suppliers…"
              className="w-48 bg-transparent outline-none placeholder:text-muted-foreground sm:w-64"
            />
          </label>
        </div>

        <p className="mt-6 text-[13px] text-muted-foreground">
          {shown.length} of {libraryMaterials.length} materials
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((m) => (
            <div
              key={m.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_24px_48px_-24px_color-mix(in_oklab,var(--color-espresso)_40%,transparent)]"
            >
              <div
                className="relative aspect-[4/3]"
                style={{
                  backgroundColor: m.color,
                  backgroundImage:
                    "radial-gradient(color-mix(in oklab, black 12%, transparent) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              >
                {m.popular && (
                  <Badge tone="sand" className="absolute right-3 top-3 bg-card/80 backdrop-blur">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                    {m.category}
                  </p>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-sage" /> In stock
                  </span>
                </div>
                <h2 className="mt-1.5 font-medium leading-snug">{m.name}</h2>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  {m.supplier} · {m.finish}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {formatINR(m.price)}
                    <span className="text-[11px] font-normal text-muted-foreground">
                      {" "}
                      / {m.unit}
                    </span>
                  </p>
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() =>
                      toast.success(`${m.name} — sample requested from ${m.supplier}.`)
                    }
                  >
                    Request sample
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-display text-2xl italic text-muted-foreground">
              Nothing in the library matches that.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
