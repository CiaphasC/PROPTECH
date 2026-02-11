import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { SelectOption } from "@/entities/property/model/types";

type SelectVariant = "dark" | "light";

interface CustomSelectProps<TValue extends string> {
  value: TValue;
  onChange: (value: TValue) => void;
  options: ReadonlyArray<SelectOption<TValue>>;
  placeholder?: string;
  variant?: SelectVariant;
  className?: string;
}

export default function CustomSelect<TValue extends string>({
  value,
  onChange,
  options,
  placeholder = "Seleccionar",
  variant = "dark",
  className,
}: CustomSelectProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selectRef.current) {
        return;
      }

      if (!selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label ?? placeholder,
    [options, placeholder, value],
  );

  const triggerStyles =
    variant === "dark"
      ? isOpen
        ? "border-emerald-500 bg-zinc-900/90 text-white ring-2 ring-emerald-500/20"
        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
      : isOpen
        ? "border-emerald-500 bg-white text-zinc-900 ring-2 ring-emerald-500/20"
        : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50";

  return (
    <div
      ref={selectRef}
      className={cn(
        "relative w-full md:w-44",
        isOpen ? "z-[120]" : "z-40",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((previousState) => !previousState)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300",
          triggerStyles,
        )}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={cn(
            "ml-2 transition-transform duration-300",
            isOpen ? "rotate-180 text-emerald-500" : "text-zinc-400",
          )}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-[130] mt-2 w-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-2xl">
          <ul className="max-h-60 overflow-auto py-1">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-zinc-50",
                      isSelected ? "bg-emerald-50/50 font-semibold text-emerald-600" : "text-zinc-600",
                    )}
                  >
                    {option.label}
                    {isSelected ? <Check size={14} className="text-emerald-500" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
