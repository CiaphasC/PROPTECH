import { Building, ChevronRight } from "lucide-react";
import type { Property, PropertyFilters, PropertyType } from "@/entities/property/model/types";
import PropertyCard from "@/entities/property/ui/PropertyCard";
import PropertyFiltersBar from "@/entities/property/ui/PropertyFiltersBar";
import ParticleWave from "@/features/background/ui/ParticleWave";
import Reveal from "@/shared/components/Reveal";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";

interface HomeViewProps {
  filters: PropertyFilters;
  featuredProperties: Property[];
  onFiltersChange: (next: Partial<PropertyFilters>) => void;
  onOpenSearch: () => void;
  onOpenDetail: (propertyId: number) => void;
  onOpenSearchWithType: (propertyType: PropertyType) => void;
}

const lifestyleCards = [
  {
    key: "urban",
    title: "Departamentos Urbanos",
    subtitle: "Conectados con el ritmo de la ciudad.",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    className: "md:col-span-6",
  },
  {
    key: "office",
    title: "Oficinas",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-3",
  },
  {
    key: "land",
    title: "Terrenos",
    subtitle: "Oportunidad",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    className: "md:col-span-3",
  },
] as const;

export default function HomeView({
  filters,
  featuredProperties,
  onFiltersChange,
  onOpenSearch,
  onOpenDetail,
  onOpenSearchWithType,
}: HomeViewProps) {
  return (
    <>
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
        <ParticleWave />
        <div className="container relative z-10 mx-auto px-6 pt-20">
          <div className="mx-auto max-w-5xl space-y-8 text-center">
            <Reveal>
              <Badge variant="emeraldLight" className="px-4 py-2">
                El Nuevo Estandar Inmobiliario
              </Badge>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display text-5xl font-medium leading-[1] tracking-tight text-white md:text-8xl">
                Encuentra tu proximo
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic">
                  hogar inteligente.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
                Miles de propiedades verificadas en Lima. Precios transparentes en Soles y trato
                directo.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <PropertyFiltersBar
                filters={filters}
                onFiltersChange={onFiltersChange}
                onSearchClick={onOpenSearch}
                theme="dark"
                className="mx-auto mt-12 max-w-5xl"
              />
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
          <ChevronRight className="mx-auto rotate-90" />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <Reveal>
              <div>
                <h2 className="font-display text-4xl font-medium tracking-tight text-zinc-900">
                  Recien Agregadas
                </h2>
                <p className="mt-3 text-lg font-light text-zinc-500">
                  Oportunidades de inversion en moneda local.
                </p>
              </div>
            </Reveal>
            <Button variant="outline" className="group hidden md:flex" onClick={onOpenSearch}>
              Ver Inventario
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property, index) => (
              <Reveal key={property.id} delay={index * 100}>
                <PropertyCard property={property} onClick={() => onOpenDetail(property.id)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zinc-950 py-32">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-20 text-center">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">
                Descubre tu espacio
              </span>
              <h2 className="font-display text-5xl font-medium text-white md:text-6xl">
                Explora por Estilo de Vida
              </h2>
            </div>
          </Reveal>

          <div className="grid h-auto grid-cols-1 gap-6 md:h-[800px] md:grid-cols-12">
            <div
              className="group relative cursor-pointer overflow-hidden rounded-3xl md:col-span-6 md:row-span-2"
              onClick={() => onOpenSearchWithType("Casa")}
            >
              <Reveal className="h-full">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-700 group-hover:bg-black/0" />
                  <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"
                    className="h-full w-full object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-110"
                    alt="Residencias Premium"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10">
                    <div className="translate-y-4 transform transition-transform duration-500 group-hover:translate-y-0">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-emerald-400 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                        Exclusividad
                      </span>
                      <h3 className="font-display mb-2 text-4xl font-medium italic text-white">
                        Residencias Premium
                      </h3>
                      <p className="max-w-sm text-lg font-light text-zinc-300 opacity-80 transition-opacity group-hover:opacity-100">
                        Espacios amplios y privacidad absoluta para quienes exigen lo mejor.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {lifestyleCards.map((card, index) => (
              <div
                key={card.key}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl ${card.className}`}
                onClick={onOpenSearch}
              >
                <Reveal className="h-full" delay={(index + 1) * 100}>
                  <div className="relative h-full w-full">
                    <img
                      src={card.image}
                      className="h-full w-full object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-110"
                      alt={card.title}
                    />

                    {card.key === "urban" ? (
                      <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-l from-black/80 via-transparent to-transparent p-8">
                        <h3 className="font-display text-3xl font-medium text-white transition-colors group-hover:text-emerald-400">
                          {card.title}
                        </h3>
                        <p className="mt-2 translate-y-2 transform text-zinc-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {card.subtitle}
                        </p>
                      </div>
                    ) : null}

                    {card.key === "office" ? (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 p-6 text-center transition-colors group-hover:bg-black/30">
                        <Building size={20} className="mb-2 text-white" />
                        <h3 className="font-display text-xl font-medium text-white">{card.title}</h3>
                      </div>
                    ) : null}

                    {card.key === "land" ? (
                      <>
                        <div className="absolute inset-0 bg-emerald-900/80 opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40" />
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                          <span className="w-fit rounded-full border border-white/20 px-2 py-1 text-xs uppercase tracking-widest text-white/50">
                            {card.subtitle}
                          </span>
                          <h3 className="font-display text-2xl font-medium text-white">{card.title}</h3>
                        </div>
                      </>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
