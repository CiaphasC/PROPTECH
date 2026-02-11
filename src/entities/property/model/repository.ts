import type { Property } from "@/entities/property/model/types";

export interface PropertyRepository {
  getAll: () => Property[];
  getById: (id: number) => Property | null;
}
