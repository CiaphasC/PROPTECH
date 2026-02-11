export type PropertyType = "Casa" | "Departamento" | "Comercial";
export type PropertyStatus = "Venta" | "Alquiler";
export type PropertyFilterType = PropertyType | "Todos";
export type PropertyFilterStatus = PropertyStatus | "Todos";

export interface Property {
  id: number;
  title: string;
  price: number;
  currency: "PEN";
  type: PropertyType;
  status: PropertyStatus;
  beds: number;
  baths: number;
  area: number;
  location: string;
  tag?: string;
  description: string;
  image: string;
  agent: string;
  agentImg: string;
  features: string[];
}

export interface PropertyFilters {
  search: string;
  type: PropertyFilterType;
  status: PropertyFilterStatus;
}

export interface CreatePropertyInput {
  title: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  beds: number;
  baths: number;
  area: number;
  location: string;
  description: string;
  image?: string;
  tag?: string;
  features?: string[];
}

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}
