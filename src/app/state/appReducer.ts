import {
  buildPropertyFromInput,
  DEFAULT_PROPERTY_FILTERS,
} from "@/entities/property/model/constants";
import { getNextPropertyId } from "@/entities/property/model/selectors";
import type { CreatePropertyInput, Property, PropertyFilters } from "@/entities/property/model/types";

export type AppView = "home" | "search" | "detail" | "dashboard";

export interface AppState {
  currentView: AppView;
  selectedPropertyId: number | null;
  filters: PropertyFilters;
  properties: Property[];
}

export const ActionTypes = Object.freeze({
  NAVIGATE: "NAVIGATE",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
  ADD_PROPERTY: "ADD_PROPERTY",
});

export type AppAction =
  | {
      type: typeof ActionTypes.NAVIGATE;
      payload: { view: AppView; propertyId?: number | null };
    }
  | {
      type: typeof ActionTypes.UPDATE_FILTERS;
      payload: Partial<PropertyFilters>;
    }
  | {
      type: typeof ActionTypes.RESET_FILTERS;
    }
  | {
      type: typeof ActionTypes.ADD_PROPERTY;
      payload: CreatePropertyInput;
    };

function normalizeNumericField(value: number, minValue = 0): number {
  if (!Number.isFinite(value)) {
    return minValue;
  }

  return Math.max(minValue, Math.round(value));
}

export function createInitialAppState(seedProperties: Property[]): AppState {
  return {
    currentView: "home",
    selectedPropertyId: null,
    filters: DEFAULT_PROPERTY_FILTERS,
    properties: [...seedProperties],
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case ActionTypes.NAVIGATE: {
      const { propertyId, view } = action.payload;
      const nextSelectedPropertyId =
        propertyId === undefined ? state.selectedPropertyId : propertyId;

      return {
        ...state,
        currentView: view,
        selectedPropertyId: nextSelectedPropertyId,
      };
    }

    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ActionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: { ...DEFAULT_PROPERTY_FILTERS },
      };

    case ActionTypes.ADD_PROPERTY: {
      const nextId = getNextPropertyId(state.properties);
      const payload = {
        ...action.payload,
        price: normalizeNumericField(action.payload.price, 1),
        beds: normalizeNumericField(action.payload.beds, 0),
        baths: normalizeNumericField(action.payload.baths, 0),
        area: normalizeNumericField(action.payload.area, 1),
      };

      const property = buildPropertyFromInput(payload, nextId);

      return {
        ...state,
        properties: [property, ...state.properties],
        selectedPropertyId: property.id,
      };
    }

    default:
      return state;
  }
}
