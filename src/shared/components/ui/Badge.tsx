import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/cn";

type BadgeVariant =
  | "default"
  | "glass"
  | "emerald"
  | "emeraldLight"
  | "emeraldSolid"
  | "whiteGlass";

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-800",
  glass: "bg-white/90 text-zinc-900 backdrop-blur-md shadow-sm border-white/20",
  emerald: "bg-emerald-500 text-white border-transparent",
  emeraldLight: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-md",
  emeraldSolid: "bg-emerald-600 text-white border-none",
  whiteGlass: "bg-white/10 text-white border-white/20 backdrop-blur-sm",
};

export default function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
