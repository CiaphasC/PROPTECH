import { Bath, Bed, Check, Heart, MapPin, Maximize2, Share2, Square, Star } from "lucide-react";
import type { Property } from "@/entities/property/model/types";
import { EXTRA_DETAIL_FEATURES } from "@/entities/property/model/constants";
import MetricItem from "@/entities/property/ui/MetricItem";
import ContactAgentForm from "@/features/detail/ui/ContactAgentForm";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { formatPen } from "@/shared/lib/formatters";

interface DetailViewProps {
  property: Property | null;
  onBackToSearch: () => void;
}

export default function DetailView({ property, onBackToSearch }: DetailViewProps) {
  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <h2 className="font-display text-4xl text-zinc-900">No se encontro la propiedad</h2>
        <p className="mt-2 text-zinc-500">Selecciona una propiedad desde el listado para ver detalle.</p>
        <Button className="mt-6" onClick={onBackToSearch}>
          Volver al listado
        </Button>
      </div>
    );
  }

  const allFeatures = [...property.features, ...EXTRA_DETAIL_FEATURES];

  return (
    <div className="min-h-screen bg-white">
      <div className="group relative h-[75vh] w-full overflow-hidden">
        <img
          src={property.image}
          className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          alt={property.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        <div className="pointer-events-none absolute left-0 top-0 z-0 h-32 w-full bg-gradient-to-b from-black/80 to-transparent" />

        <div className="animate-fade-in-up absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-transparent p-8 text-white md:p-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="emeraldSolid">{property.status}</Badge>
                <Badge variant="whiteGlass">{property.type}</Badge>
              </div>
              <h1 className="font-display mb-4 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
                {property.title}
              </h1>
              <p className="flex items-center gap-2 text-lg font-light text-zinc-200">
                <MapPin size={20} className="text-emerald-400" /> {property.location}
              </p>
            </div>

            <div className="flex flex-col items-end gap-6">
              <div className="text-right">
                <p className="font-display flex items-center justify-end gap-2 text-3xl font-medium text-white md:text-5xl">
                  {formatPen(property.price)}
                </p>
                <p className="mt-1 text-right text-sm uppercase tracking-widest text-zinc-400">
                  Precio en Nuevos Soles
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="glass" icon={Share2}>
                  Compartir
                </Button>
                <Button variant="glass" icon={Heart}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <div className="flex flex-wrap gap-8 rounded-2xl border border-zinc-100 bg-zinc-50 p-8">
            <MetricItem icon={Square} label="Area Total" value={`${property.area} m2`} />
            <div className="hidden h-12 w-px self-center bg-zinc-200 md:block" />
            <MetricItem icon={Bed} label="Dormitorios" value={property.beds} />
            <div className="hidden h-12 w-px self-center bg-zinc-200 md:block" />
            <MetricItem icon={Bath} label="Banos" value={property.baths} />
            <div className="hidden h-12 w-px self-center bg-zinc-200 md:block" />
            <MetricItem icon={Maximize2} label="Estacionamientos" value="2" />
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-3xl font-medium text-zinc-900">Sobre esta propiedad</h3>
            <p className="text-lg font-light leading-loose text-zinc-600">
              {property.description} Una oportunidad unica para vivir en una de las zonas mas
              exclusivas. Diseno pensado para maximizar la luz natural y la ventilacion cruzada.
              <br />
              <br />
              Los acabados incluyen pisos de madera estructurada, griferia importada y cocina
              equipada con tope de cuarzo.
            </p>
          </div>

          <div>
            <h3 className="font-display mb-6 text-3xl font-medium text-zinc-900">Comodidades</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {allFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm transition-colors hover:border-emerald-200"
                >
                  <Check className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-zinc-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-3xl bg-zinc-200 grayscale transition-all hover:grayscale-0">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
              className="h-full w-full object-cover opacity-50"
              alt="Mapa referencial"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="primary" icon={MapPin}>
                Ver en Mapa
              </Button>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32 rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-zinc-200/50">
            <div className="mb-6 flex items-center gap-4">
              <img
                src={property.agentImg}
                className="h-16 w-16 rounded-full border-2 border-emerald-100 object-cover"
                alt={property.agent}
              />
              <div>
                <h3 className="font-display text-lg font-bold text-zinc-900">{property.agent}</h3>
                <div className="flex items-center text-sm text-emerald-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Agente Verificado
                  </span>
                </div>
              </div>
            </div>

            <ContactAgentForm propertyTitle={property.title} />

            <p className="mt-4 text-center text-xs text-zinc-400">
              Al enviar aceptas nuestros terminos de privacidad.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
