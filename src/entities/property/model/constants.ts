import type {
  CreatePropertyInput,
  Property,
  PropertyFilterStatus,
  PropertyFilters,
  PropertyFilterType,
  PropertyStatus,
  PropertyType,
  SelectOption,
} from "@/entities/property/model/types";

export const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80";

export const DEFAULT_PROPERTY_FEATURES = [
  "Seguridad 24/7",
  "Zona Social",
  "Pet Friendly",
] as const;

export const DEFAULT_PROPERTY_FILTERS: PropertyFilters = {
  search: "",
  type: "Todos",
  status: "Todos",
};

export const PROPERTY_TYPE_OPTIONS: ReadonlyArray<SelectOption<PropertyFilterType>> = [
  { value: "Todos", label: "Todos" },
  { value: "Casa", label: "Casa" },
  { value: "Departamento", label: "Departamento" },
  { value: "Comercial", label: "Comercial" },
];

export const PROPERTY_STATUS_OPTIONS: ReadonlyArray<SelectOption<PropertyFilterStatus>> = [
  { value: "Todos", label: "Todos" },
  { value: "Venta", label: "Venta" },
  { value: "Alquiler", label: "Alquiler" },
];

export const DASHBOARD_TYPE_OPTIONS: ReadonlyArray<SelectOption<PropertyType>> = [
  { value: "Casa", label: "Casa" },
  { value: "Departamento", label: "Departamento" },
  { value: "Comercial", label: "Comercial" },
];

export const DASHBOARD_STATUS_OPTIONS: ReadonlyArray<SelectOption<PropertyStatus>> = [
  { value: "Venta", label: "Venta" },
  { value: "Alquiler", label: "Alquiler" },
];

export const DEFAULT_CREATE_PROPERTY_INPUT: CreatePropertyInput = {
  title: "",
  price: 0,
  type: "Casa",
  status: "Venta",
  beds: 1,
  baths: 1,
  area: 50,
  location: "",
  description: "",
  image: DEFAULT_PROPERTY_IMAGE,
  tag: "",
  features: [...DEFAULT_PROPERTY_FEATURES],
};

export const EXTRA_DETAIL_FEATURES = ["Gym", "Zona BBQ", "Lobby", "Ascensor Directo"] as const;

export function buildPropertyFromInput(
  input: CreatePropertyInput,
  nextId: number,
  fallbackAgent = "Propietario Verificado",
): Property {
  return {
    id: nextId,
    title: input.title.trim(),
    price: input.price,
    currency: "PEN",
    type: input.type,
    status: input.status,
    beds: input.beds,
    baths: input.baths,
    area: input.area,
    location: input.location.trim(),
    tag: input.tag?.trim() || "Nuevo",
    description: input.description.trim(),
    image: input.image?.trim() || DEFAULT_PROPERTY_IMAGE,
    agent: fallbackAgent,
    agentImg: `https://i.pravatar.cc/150?u=property-${nextId}`,
    features:
      input.features && input.features.length > 0
        ? input.features.map((feature) => feature.trim()).filter(Boolean)
        : [...DEFAULT_PROPERTY_FEATURES],
  };
}
