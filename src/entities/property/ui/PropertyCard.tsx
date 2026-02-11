import { Bath, Bed, MapPin, Move } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import { formatPen } from "@/shared/lib/formatters";
import type { Property } from "@/entities/property/model/types";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  animationDelay?: number;
}

export default function PropertyCard({ property, onClick, animationDelay = 0 }: PropertyCardProps) {
  return (
    <article
      className="animate-fade-in-up group cursor-pointer overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50"
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant="glass">{property.status}</Badge>
          {property.tag ? <Badge variant="emerald">{property.tag}</Badge> : null}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button variant="emerald" className="rounded-full px-6">
            Ver Detalles
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-6">
        <p className="font-display flex items-center text-2xl font-medium text-zinc-900">
          <span className="mr-1 text-sm font-normal text-emerald-600">S/</span>
          {formatPen(property.price).replace("S/", "").trim()}
        </p>
        <h3 className="font-display truncate text-lg font-bold text-zinc-700 transition-colors group-hover:text-emerald-600">
          {property.title}
        </h3>
        <p className="flex truncate items-center text-sm font-light text-zinc-500">
          <MapPin size={14} className="mr-1 text-zinc-400" /> {property.location}
        </p>

        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-500">
          <div className="flex items-center gap-1" title="Dormitorios">
            <Bed size={16} /> <span>{property.beds}</span>
          </div>
          <div className="flex items-center gap-1" title="Banos">
            <Bath size={16} /> <span>{property.baths}</span>
          </div>
          <div className="flex items-center gap-1" title="Area">
            <Move size={16} /> <span>{property.area} m2</span>
          </div>
        </div>
      </div>
    </article>
  );
}
