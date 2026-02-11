import { filterProperties, selectLatestProperties, selectPropertyById } from "@/entities/property/model/selectors";
import type { AppState } from "@/app/state/appReducer";

export function selectFilteredProperties(state: AppState) {
  return filterProperties(state.properties, state.filters);
}

export function selectSelectedProperty(state: AppState) {
  return selectPropertyById(state.properties, state.selectedPropertyId);
}

export function selectHomeFeaturedProperties(state: AppState) {
  const filteredProperties = filterProperties(state.properties, state.filters);
  return selectLatestProperties(filteredProperties, 6);
}
