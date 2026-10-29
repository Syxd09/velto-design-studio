import { createFileRoute } from "@tanstack/react-router";
import { clients, formatINR, studio } from "@/data/mock";
import { AppShell } from "@/components/velto/app-shell";
import { Avatar, Badge, Eyebrow } from "@/components/velto/ui";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients · Velto" },
      {
        name: "description",
        content: "Your studio's clients, projects and proposal history in Velto.",
      },
      { property: "og:title", content: "Clients · Velto" },
      {
        property: "og:description",
        content: "Your studio's clients, projects and proposal history in Velto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientsPage,
});

const statusTone = {
  active: "sage",
  negotiating: "clay",
  past: "neutral",
} as const;

export function ClientsPage() {
  const totalValue = clients.reduce((s, c) => s + c.lifetimeValue, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Eyebrow>Relationships</Eyebrow>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Clients</h1>
        <p className="mt-3 text-muted-foreground">
          {clients.length} clients · {formatINR(totalValue, true)} lifetime value · signed
          in as {studio.name}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_24px_48px_-24px_color-mix(in_oklab,var(--color-espresso)_40%,transparent)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={c.initials} className="size-11 text-sm" />
                  <div>
                    <h2 className="font-medium leading-tight">{c.name}</h2>
                    <p className="text-[13px] text-muted-foreground">{c.company}</p>
                  </div>
                </div>
                <Badge tone={statusTone[c.status]}>{c.status}</Badge>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="font-display text-2xl text-primary">{c.projects}</p>
                  <p className="text-[12px] text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-primary">
                    {formatINR(c.lifetimeValue, true)}
                  </p>
                  <p className="text-[12px] text-muted-foreground">Lifetime value</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-primary">{c.city}</p>
                  <p className="text-[12px] text-muted-foreground">Client since {c.since}</p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-secondary px-4 py-2.5 text-[13px]">
                Last proposal: <span className="font-medium">{c.lastProposal}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default ClientsPage;
