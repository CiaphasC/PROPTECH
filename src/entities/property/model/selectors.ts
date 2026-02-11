import type { Property, PropertyFilters } from "@/entities/property/model/types";

function matchesSearch(property: Property, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  const content = [property.title, property.location, property.type, property.status]
    .join(" ")
    .toLowerCase();

  return content.includes(normalizedQuery);
}

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    const matchesType = filters.type === "Todos" || property.type === filters.type;
    const matchesStatus = filters.status === "Todos" || property.status === filters.status;
    const searchMatches = matchesSearch(property, filters.search);
    return matchesType && matchesStatus && searchMatches;
  });
}

export function selectPropertyById(properties: Property[], id: number | null): Property | null {
  if (id === null) {
    return null;
  }

  return properties.find((property) => property.id === id) ?? null;
}

export function selectLatestProperties(properties: Property[], limit = 6): Property[] {
  return [...properties]
    .sort((leftProperty, rightProperty) => rightProperty.id - leftProperty.id)
    .slice(0, limit);
}

export function getNextPropertyId(properties: Property[]): number {
  return properties.reduce((maxId, property) => Math.max(maxId, property.id), 0) + 1;
}
