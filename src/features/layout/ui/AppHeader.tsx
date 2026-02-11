import { ArrowLeft, Building, Plus } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";
import type { AppView } from "@/app/state/appReducer";

interface AppHeaderProps {
  currentView: AppView;
  isScrolled: boolean;
  onNavigate: (view: AppView) => void;
}

const navItems: Array<{ label: string; view: AppView }> = [
  { label: "Inicio", view: "home" },
  { label: "Propiedades", view: "search" },
  { label: "Nuevos Proyectos", view: "search" },
];

export default function AppHeader({ currentView, isScrolled, onNavigate }: AppHeaderProps) {
  const isTransparentView = currentView === "home" || currentView === "detail";
  const hasSolidHeader = !isTransparentView || isScrolled;

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out",
        hasSolidHeader
          ? "border-b border-zinc-100 bg-white/90 py-3 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-2"
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
              hasSolidHeader ? "bg-zinc-900 text-white" : "bg-white text-zinc-900",
            )}
          >
            <Building size={20} />
          </div>
          <span
            className={cn(
              "font-display text-xl font-bold tracking-tighter",
              hasSolidHeader ? "text-zinc-900" : "text-white",
            )}
          >
            PROP<span className="font-light italic text-emerald-500">TECH</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                hasSolidHeader ? "text-zinc-600 hover:text-emerald-500" : "text-zinc-300 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {currentView !== "detail" ? (
            <Button
              variant={hasSolidHeader ? "outline" : "ghost"}
              className={cn(
                !hasSolidHeader ? "border-white/20 text-white hover:bg-white/10 hover:text-white" : "",
              )}
              onClick={() => onNavigate("dashboard")}
            >
              Acceder
            </Button>
          ) : null}

          {currentView === "detail" ? (
            <Button
              variant={isScrolled ? "outline" : "glass"}
              icon={ArrowLeft}
              className={cn(
                !isScrolled ? "border-white/30 text-white hover:bg-white/10" : "border-zinc-200 text-zinc-900 hover:bg-zinc-50",
              )}
              onClick={() => onNavigate("search")}
            >
              Volver
            </Button>
          ) : (
            <Button variant="emerald" icon={Plus} onClick={() => onNavigate("dashboard")}>
              Publicar
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
