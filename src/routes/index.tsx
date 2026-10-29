import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Palette,
  Send,
  Sparkles,
  Table2,
} from "lucide-react";
import { images, formatINR } from "@/data/mock";
import {
  Avatar,
  AvatarStack,
  Badge,
  ButtonLink,
  Eyebrow,
  Progress,
} from "@/components/velto/ui";
import { Wordmark } from "@/components/velto/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Velto — Client-ready interior design presentations",
      },
      {
        name: "description",
        content:
          "Velto turns design boards, material selections and quotations into polished client proposals for interior designers and architecture studios.",
      },
      { property: "og:title", content: "Velto — Client-ready interior design presentations" },
      {
        property: "og:description",
        content:
          "Design boards, materials, quotations and BOQ — assembled into proposals your clients approve faster.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Velto — Client-ready interior design presentations" },
      {
        name: "twitter:description",
        content:
          "Design boards, materials, quotations and BOQ — assembled into proposals your clients approve faster.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Layers,
    title: "Design boards",
    copy: "Mood, concept and material boards that carry one shared palette across every room — no more lost email attachments.",
  },
  {
    icon: Palette,
    title: "Materials & finishes",
    copy: "A living library of stones, fabrics, woods and metals with suppliers, finishes and live pricing on every spec.",
  },
  {
    icon: Table2,
    title: "Quotations & BOQ",
    copy: "Line-item quotations and room-wise bills of quantities that recalculate the moment a scope changes.",
  },
  {
    icon: FileText,
    title: "Client proposals",
    copy: "Boards, specs and commercials assembled into one client-ready link — password protected, view-tracked.",
  },
  {
    icon: Sparkles,
    title: "AI concept drafts",
    copy: "Describe the brief and get a first palette, board and material direction to refine — in minutes, not days.",
  },
  {
    icon: Clock,
    title: "Project tracking",
    copy: "Milestones, approvals and procurement status for every project, visible to the whole studio at a glance.",
  },
];

const steps = [
  {
    n: "01",
    title: "Capture the brief",
    copy: "Client requirements, site notes and reference images gathered into one structured project.",
  },
  {
    n: "02",
    title: "Build the boards",
    copy: "Pull materials, finishes and references into concept boards. AI drafts the palette; you refine the story.",
  },
  {
    n: "03",
    title: "Send the proposal",
    copy: "Boards, quotations and BOQ assemble into a branded proposal your client approves from any device.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Wordmark />
          <nav className="hidden items-center gap-8 text-sm text-foreground/80 md:flex">
            <a href="#product" className="transition-colors hover:text-foreground">Product</a>
            <a href="#workflow" className="transition-colors hover:text-foreground">Workflow</a>
            <a href="#proposal" className="transition-colors hover:text-foreground">Proposals</a>
            <Link to="/library" className="transition-colors hover:text-foreground">Materials</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ButtonLink to="/projects" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Open workspace
            </ButtonLink>
            <ButtonLink to="/projects" size="sm">
              Try the demo <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
          <div>
            <Badge tone="clay" className="mb-6">
              <Sparkles className="size-3" /> For interior designers & studios
            </Badge>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.4rem]">
              Present like a studio{" "}
              <span className="italic text-primary">twice your size.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Velto turns your ideas, reference images and material selections into polished
              design boards, quotations and client-ready proposals — so every project looks
              as considered as the spaces you design.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink to="/projects" size="lg">
                Explore the workspace <ArrowRight />
              </ButtonLink>
              <ButtonLink to="/library" variant="outline" size="lg">
                Browse materials library
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <AvatarStack people={["AR", "NK", "JD"]} />
                {studio_line}
              </span>
              <span className="flex items-center gap-2">
                <Award className="size-4 text-primary" /> Trusted by 2,400+ designers
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="arch overflow-hidden border border-border/70 shadow-[0_40px_80px_-30px_color-mix(in_oklab,var(--color-espresso)_35%,transparent)]">
              <img
                src={images.heroLiving}
                alt="Sunlit living room designed in warm terracotta and sage"
                width={1920}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            {/* Floating product cards */}
            <div className="absolute -left-6 top-16 hidden w-60 rounded-2xl border border-border bg-card p-4 shadow-xl sm:block lg:-left-14">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium">Proposal sent</p>
                <Send className="size-3.5 text-primary" />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Malabar Hill Penthouse</p>
              <div className="mt-3 flex gap-1">
                {["#E8DCC8", "#C96F4A", "#7A8B6F", "#B08D4F", "#3F352C"].map((c) => (
                  <span
                    key={c}
                    className="h-6 flex-1 rounded-md border border-black/5"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-sage" /> Approved in 2 days
              </p>
            </div>

            <div className="absolute -right-4 bottom-10 hidden w-56 rounded-2xl border border-border bg-card p-4 shadow-xl sm:block lg:-right-10">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium">Quotation · v3</p>
                <FileText className="size-3.5 text-primary" />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Millwork</span><span>{formatINR(1240000)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Furniture</span><span>{formatINR(820000)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5 text-[12px] font-semibold text-foreground">
                  <span>Total incl. GST</span><span>{formatINR(4996120)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio strip */}
      <section className="border-y border-border/80 bg-card/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">In studios across</span>
          {["Mumbai", "Bengaluru", "Kolkata", "Goa", "Hyderabad", "Delhi NCR"].map((city) => (
            <span key={city} className="font-display text-lg italic text-foreground/70">
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="product" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>The workspace</Eyebrow>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              Everything between <span className="italic text-primary">the brief</span> and{" "}
              <span className="italic text-primary">the sign-off.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_24px_48px_-24px_color-mix(in_oklab,var(--color-clay)_45%,transparent)]"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-espresso py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                How studios use Velto
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                From first sketch to signed proposal, <span className="italic text-gold">in one thread.</span>
              </h2>
            </div>
            <div className="space-y-5">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <span className="font-display text-3xl italic text-gold">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/70">{s.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proposal showcase */}
      <section id="proposal" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>The client proposal</Eyebrow>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              A proposal clients read <span className="italic text-primary">to the last page.</span>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Boards, material specs, commercials and next steps assemble into a single
              branded document. Clients approve line items from their phone — and you see
              exactly what they viewed.
            </p>
            <ul className="mt-8 space-y-3.5 text-sm">
              {[
                "Branded cover with the project story",
                "Concept boards with live palettes",
                "Line-item quotation clients can accept individually",
                "Room-wise bill of quantities with running totals",
                "E-sign approval and PDF export",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ButtonLink to="/projects/malabar-hill-penthouse" className="mt-9" variant="dark">
              See a live proposal <ArrowUpRight />
            </ButtonLink>
          </div>

          {/* Proposal sheet mock */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-t-3xl border border-border bg-card p-8 shadow-[0_40px_70px_-30px_color-mix(in_oklab,var(--color-espresso)_40%,transparent)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-2xl italic text-primary">Velto</p>
                  <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Design proposal
                  </p>
                </div>
                <Badge tone="sage">Approved</Badge>
              </div>
              <h3 className="mt-6 font-display text-3xl leading-tight">
                Malabar Hill <span className="italic">Penthouse</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Aisha Kapoor · 4,200 sq ft · Mumbai
              </p>
              <img
                src={images.projectPenthouse}
                alt="Malabar Hill Penthouse concept"
                loading="lazy"
                width={1600}
                height={1008}
                className="mt-5 aspect-[16/10] w-full rounded-2xl object-cover"
              />
              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Design & visualization</span>
                  <span className="font-medium">{formatINR(530000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Furniture & millwork</span>
                  <span className="font-medium">{formatINR(2060000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials & lighting</span>
                  <span className="font-medium">{formatINR(1060000)}</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <span>Total incl. GST</span>
                  <span>{formatINR(4996120)}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-1.5">
                {["#E8DCC8", "#C96F4A", "#7A8B6F", "#B08D4F", "#3F352C"].map((c) => (
                  <span
                    key={c}
                    className="h-8 flex-1 rounded-lg border border-black/5"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-secondary px-4 py-3 text-center text-sm font-medium">
                Approved by Aisha Kapoor · 12 Apr 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-sand/60 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-3xl leading-snug italic text-foreground sm:text-4xl">
            “Our proposals used to take three days in PowerPoint. With Velto we send a
            branded link the same afternoon — and clients approve twice as fast.”
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Avatar initials="PK" className="size-11 text-sm" />
            <div className="text-left">
              <p className="text-sm font-semibold">Prerna Khanna</p>
              <p className="text-[13px] text-muted-foreground">Founder, Studio Terrafirma · Mumbai</p>
            </div>
          </div>
          <div className="mt-10 grid justify-center gap-6 text-sm sm:grid-cols-3">
            {[
              ["68%", "faster proposal turnaround"],
              ["2.1×", "more approvals per quarter"],
              ["12 hrs", "saved per project, on average"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-primary">{n}</p>
                <p className="mt-1 text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-8 py-16 text-center text-primary-foreground sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-clay/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-gold/20 blur-3xl" />
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
              Ready when you are
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl tracking-tight sm:text-5xl">
              Your next proposal is <span className="italic text-gold">one afternoon away.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
              Start with the sample studio workspace — five live projects, boards and
              proposals included. No setup required.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink to="/projects" size="lg" variant="clay">
                Open the workspace <ArrowRight />
              </ButtonLink>
              <ButtonLink to="/library" size="lg" variant="outline" className="border-white/20 bg-transparent text-primary-foreground hover:bg-white/10">
                Explore materials
              </ButtonLink>
            </div>
            <div className="mt-10 flex justify-center">
              <Progress value={72} className="max-w-xs bg-white/15" />
            </div>
            <p className="mt-3 text-xs text-primary-foreground/60">
              72% of studios finish their first proposal on day one
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/80 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Wordmark />
            <p className="text-[13px] text-muted-foreground">
              The presentation workspace for interior design professionals.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-muted-foreground">
            <Link to="/projects" className="hover:text-foreground">Workspace</Link>
            <Link to="/library" className="hover:text-foreground">Materials</Link>
            <Link to="/clients" className="hover:text-foreground">Clients</Link>
            <a href="#product" className="hover:text-foreground">Product</a>
          </nav>
          <p className="text-[13px] text-muted-foreground">© 2026 Velto</p>
        </div>
      </footer>
    </div>
  );
}

const studio_line = "Aarav's studio, running live inside Velto";
