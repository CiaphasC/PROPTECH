import { Search } from "lucide-react";
import type { Property, PropertyFilters } from "@/entities/property/model/types";
import PropertyCard from "@/entities/property/ui/PropertyCard";
import PropertyFiltersBar from "@/entities/property/ui/PropertyFiltersBar";
import Reveal from "@/shared/components/Reveal";
import Button from "@/shared/components/ui/Button";

interface SearchViewProps {
  properties: Property[];
  filters: PropertyFilters;
  onFiltersChange: (next: Partial<PropertyFilters>) => void;
  onResetFilters: () => void;
  onOpenDetail: (propertyId: number) => void;
}

export default function SearchView({
  properties,
  filters,
  onFiltersChange,
  onResetFilters,
  onOpenDetail,
}: SearchViewProps) {
  return (
    <div className="min-h-screen bg-zinc-50 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl font-medium text-zinc-900">Mercado Actual</h1>
            <p className="mt-2 text-zinc-500">Mostrando {properties.length} propiedades disponibles</p>
          </div>
        </div>

        <PropertyFiltersBar
          filters={filters}
          onFiltersChange={onFiltersChange}
          showSearchButton={false}
          theme="light"
          className="mb-10"
        />

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 pb-20 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, index) => (
              <Reveal key={property.id} delay={index * 60}>
                <PropertyCard property={property} onClick={() => onOpenDetail(property.id)} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-zinc-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Sin resultados</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Ajusta tu busqueda o limpia los filtros para volver al inventario.
            </p>
            <Button variant="ghost" className="mt-4 text-emerald-600" onClick={onResetFilters}>
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
