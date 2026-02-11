import { createContext, useContext, useMemo, useReducer } from "react";
import type { PropsWithChildren } from "react";
import { propertyRepository as defaultPropertyRepository } from "@/data/repositories/InMemoryPropertyRepository";
import type { PropertyRepository } from "@/entities/property/model/repository";
import type {
  CreatePropertyInput,
  PropertyFilters,
  PropertyType,
} from "@/entities/property/model/types";
import {
  ActionTypes,
  appReducer,
  createInitialAppState,
  type AppState,
  type AppView,
} from "@/app/state/appReducer";
import {
  selectFilteredProperties,
  selectHomeFeaturedProperties,
  selectSelectedProperty,
} from "@/app/state/selectors";

interface AppDependencies {
  propertyRepository: PropertyRepository;
}

interface AppActions {
  navigate: (view: AppView, propertyId?: number | null) => void;
  openPropertyDetail: (propertyId: number) => void;
  updateFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  openSearchWithType: (propertyType: PropertyType) => void;
  createProperty: (payload: CreatePropertyInput) => void;
}

interface AppContextValue {
  state: AppState;
  derived: {
    filteredProperties: ReturnType<typeof selectFilteredProperties>;
    selectedProperty: ReturnType<typeof selectSelectedProperty>;
    featuredProperties: ReturnType<typeof selectHomeFeaturedProperties>;
  };
  actions: AppActions;
}

const defaultDependencies: AppDependencies = {
  propertyRepository: defaultPropertyRepository,
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps extends PropsWithChildren {
  dependencies?: Partial<AppDependencies>;
}

export function AppProvider({ children, dependencies }: AppProviderProps) {
  const mergedDependencies = useMemo<AppDependencies>(
    () => ({
      ...defaultDependencies,
      ...dependencies,
    }),
    [dependencies],
  );

  const seedProperties = useMemo(
    () => mergedDependencies.propertyRepository.getAll(),
    [mergedDependencies],
  );

  const [state, dispatch] = useReducer(appReducer, seedProperties, createInitialAppState);

  const actions = useMemo<AppActions>(
    () => ({
      navigate: (view, propertyId) => {
        dispatch({ type: ActionTypes.NAVIGATE, payload: { view, propertyId } });
      },
      openPropertyDetail: (propertyId) => {
        dispatch({ type: ActionTypes.NAVIGATE, payload: { view: "detail", propertyId } });
      },
      updateFilters: (filters) => {
        dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters });
      },
      resetFilters: () => {
        dispatch({ type: ActionTypes.RESET_FILTERS });
      },
      openSearchWithType: (propertyType) => {
        dispatch({
          type: ActionTypes.UPDATE_FILTERS,
          payload: { type: propertyType },
        });
        dispatch({
          type: ActionTypes.NAVIGATE,
          payload: { view: "search" },
        });
      },
      createProperty: (payload) => {
        dispatch({ type: ActionTypes.ADD_PROPERTY, payload });
        dispatch({
          type: ActionTypes.NAVIGATE,
          payload: { view: "search" },
        });
      },
    }),
    [],
  );

  const derived = useMemo(
    () => ({
      filteredProperties: selectFilteredProperties(state),
      selectedProperty: selectSelectedProperty(state),
      featuredProperties: selectHomeFeaturedProperties(state),
    }),
    [state],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      derived,
      actions,
    }),
    [actions, derived, state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider.");
  }

  return context;
}
