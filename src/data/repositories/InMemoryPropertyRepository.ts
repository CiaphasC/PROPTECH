import { PROPERTIES_MOCK } from "@/data/properties.mock";
import type { PropertyRepository } from "@/entities/property/model/repository";
import type { Property } from "@/entities/property/model/types";

class InMemoryPropertyRepository implements PropertyRepository {
  private readonly properties: Property[];

  constructor(seed: Property[]) {
    this.properties = [...seed];
  }

  getAll(): Property[] {
    return [...this.properties];
  }

  getById(id: number): Property | null {
    return this.properties.find((property) => property.id === id) ?? null;
  }
}

export const propertyRepository: PropertyRepository = new InMemoryPropertyRepository(PROPERTIES_MOCK);
