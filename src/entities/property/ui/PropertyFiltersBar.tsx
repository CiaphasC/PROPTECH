import { Search } from "lucide-react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import {
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/entities/property/model/constants";
import type { PropertyFilters } from "@/entities/property/model/types";
import { cn } from "@/shared/lib/cn";

type FiltersTheme = "dark" | "light";

interface PropertyFiltersBarProps {
  filters: PropertyFilters;
  onFiltersChange: (next: Partial<PropertyFilters>) => void;
  onSearchClick?: () => void;
  searchButtonLabel?: string;
  showSearchButton?: boolean;
  theme?: FiltersTheme;
  className?: string;
}

export default function PropertyFiltersBar({
  filters,
  onFiltersChange,
  onSearchClick,
  searchButtonLabel = "Buscar",
  showSearchButton = true,
  theme = "dark",
  className,
}: PropertyFiltersBarProps) {
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={cn(
        "rounded-2xl border p-3 shadow-2xl",
        isDarkTheme
          ? "border-white/10 bg-zinc-900/40 backdrop-blur-xl"
          : "border-zinc-100 bg-white shadow-zinc-200/30",
        className,
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="group relative flex-1">
          <Search
            className={cn(
              "absolute left-4 top-3.5 transition-colors",
              isDarkTheme ? "text-zinc-400 group-focus-within:text-emerald-400" : "text-zinc-400",
            )}
            size={20}
          />
          <Input
            placeholder="San Isidro, Miraflores, Surco..."
            value={filters.search}
            onChange={(event) => onFiltersChange({ search: event.target.value })}
            className={cn(
              "pl-12",
              isDarkTheme
                ? "border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:border-emerald-500/50 focus-visible:bg-zinc-900/50 focus-visible:ring-emerald-500/50"
                : "border-zinc-200 bg-white text-zinc-900",
            )}
          />
        </div>

        <CustomSelect
          value={filters.type}
          onChange={(value) => onFiltersChange({ type: value })}
          placeholder="Tipo"
          options={PROPERTY_TYPE_OPTIONS}
          variant={isDarkTheme ? "dark" : "light"}
        />

        <CustomSelect
          value={filters.status}
          onChange={(value) => onFiltersChange({ status: value })}
          placeholder="Operacion"
          options={PROPERTY_STATUS_OPTIONS}
          variant={isDarkTheme ? "dark" : "light"}
        />

        {showSearchButton ? (
          <Button
            variant="emerald"
            className="h-12 px-8 text-base"
            onClick={onSearchClick}
          >
            {searchButtonLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
