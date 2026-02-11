import { useCallback, useEffect, useRef, useState } from "react";
import type { PropertyType } from "@/entities/property/model/types";
import HomeView from "@/features/home/ui/HomeView";
import SearchView from "@/features/search/ui/SearchView";
import DetailView from "@/features/detail/ui/DetailView";
import DashboardView from "@/features/dashboard/ui/DashboardView";
import AppHeader from "@/features/layout/ui/AppHeader";
import AppFooter from "@/features/layout/ui/AppFooter";
import { useScrollThreshold } from "@/shared/hooks/useScrollThreshold";
import { cn } from "@/shared/lib/cn";
import { useAppContext } from "@/app/providers/AppProvider";
import type { AppView } from "@/app/state/appReducer";

const NAVIGATION_TRANSITION_MS = 220;

export default function App() {
  const {
    state: { currentView, filters },
    derived: { featuredProperties, filteredProperties, selectedProperty },
    actions,
  } = useAppContext();

  const isScrolled = useScrollThreshold(50);
  const [animateIn, setAnimateIn] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setAnimateIn(true);
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const navigateWithTransition = useCallback(
    (view: AppView, propertyId?: number | null) => {
      setAnimateIn(false);

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        actions.navigate(view, propertyId);
        window.scrollTo({ top: 0, behavior: "auto" });
        setAnimateIn(true);
      }, NAVIGATION_TRANSITION_MS);
    },
    [actions],
  );

  const openSearchWithType = useCallback(
    (propertyType: PropertyType) => {
      setAnimateIn(false);
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        actions.openSearchWithType(propertyType);
        window.scrollTo({ top: 0, behavior: "auto" });
        setAnimateIn(true);
      }, NAVIGATION_TRANSITION_MS);
    },
    [actions],
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <AppHeader currentView={currentView} isScrolled={isScrolled} onNavigate={navigateWithTransition} />

      <main
        className={cn(
          "transition-opacity duration-500 ease-out",
          animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        {currentView === "home" ? (
          <HomeView
            filters={filters}
            featuredProperties={featuredProperties}
            onFiltersChange={actions.updateFilters}
            onOpenSearch={() => navigateWithTransition("search")}
            onOpenDetail={(propertyId) => navigateWithTransition("detail", propertyId)}
            onOpenSearchWithType={openSearchWithType}
          />
        ) : null}

        {currentView === "search" ? (
          <SearchView
            properties={filteredProperties}
            filters={filters}
            onFiltersChange={actions.updateFilters}
            onResetFilters={actions.resetFilters}
            onOpenDetail={(propertyId) => navigateWithTransition("detail", propertyId)}
          />
        ) : null}

        {currentView === "detail" ? (
          <DetailView property={selectedProperty} onBackToSearch={() => navigateWithTransition("search")} />
        ) : null}

        {currentView === "dashboard" ? (
          <DashboardView
            onCreateProperty={(payload) => {
              actions.createProperty(payload);
            }}
          />
        ) : null}
      </main>

      <AppFooter />
    </div>
  );
}
