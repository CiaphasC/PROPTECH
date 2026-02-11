import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost" | "emerald" | "glass";

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-black shadow-lg shadow-zinc-900/20",
  outline: "border border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100",
  ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  emerald:
    "border border-emerald-500/50 bg-emerald-600 font-semibold tracking-wider text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]",
  glass: "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
};

export default function Button({
  children,
  className,
  icon: Icon,
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300",
        "disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
        buttonVariants[variant],
        className,
      )}
      {...rest}
    >
      {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
      {children}
    </button>
  );
}
