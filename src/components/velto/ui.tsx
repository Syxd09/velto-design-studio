import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { statusLabel, type ProjectStatus } from "@/data/mock";

/* ---------------------------------------------------------------- */
/* Button                                                            */
/* ---------------------------------------------------------------- */

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        clay: "bg-primary text-primary-foreground shadow-sm hover:bg-clay-deep hover:shadow-md active:scale-[0.98]",
        dark: "bg-espresso text-primary-foreground shadow-sm hover:bg-espresso/90 active:scale-[0.98]",
        outline: "border border-border bg-card/60 hover:border-clay/40 hover:bg-secondary",
        ghost: "hover:bg-secondary",
        soft: "bg-secondary text-secondary-foreground hover:bg-sand",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px]",
        default: "h-10 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "clay", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/* ---------------------------------------------------------------- */
/* Badge & status                                                    */
/* ---------------------------------------------------------------- */

export function Badge({
  className,
  tone = "neutral",
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "clay" | "sage" | "sand" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tone === "neutral" && "bg-muted text-muted-foreground",
        tone === "clay" && "bg-primary/10 text-clay-deep",
        tone === "sage" && "bg-accent text-accent-foreground",
        tone === "sand" && "bg-sand text-espresso",
        className,
      )}
      {...props}
    />
  );
}

const statusTone: Record<ProjectStatus, string> = {
  concept: "bg-sand text-espresso",
  "in-review": "bg-accent text-accent-foreground",
  approved: "bg-primary/10 text-clay-deep",
  delivered: "bg-muted text-muted-foreground",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase",
        statusTone[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {statusLabel[status]}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Progress                                                          */
/* ---------------------------------------------------------------- */

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full rounded-full bg-primary transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section headings                                                  */
/* ---------------------------------------------------------------- */

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-semibold tracking-[0.22em] uppercase text-clay-deep", className)}>
      {children}
    </p>
  );
}

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full border border-border bg-secondary text-[11px] font-semibold text-espresso",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({ people }: { people: string[] }) {
  return (
    <div className="flex -space-x-2">
      {people.map((p, i) => (
        <Avatar
          key={p + i}
          initials={p}
          className="ring-2 ring-card hover:translate-y-[-2px] transition-transform"
        />
      ))}
    </div>
  );
}
