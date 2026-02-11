import type { LucideIcon } from "lucide-react";

interface MetricItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export default function MetricItem({ icon: Icon, label, value }: MetricItemProps) {
  return (
    <div className="flex min-w-[100px] flex-1 flex-col items-center">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500">
        <Icon size={18} />
      </div>
      <span className="font-display text-xl font-bold text-zinc-900">{value}</span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </span>
    </div>
  );
}
