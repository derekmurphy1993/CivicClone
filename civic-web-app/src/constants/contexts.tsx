import { createContext } from "react";

import { DEFAULT_CIV_EVENT, DEFAULT_CIV_EVENTS } from "./civEvents";
import { DEFAULT_EVENT_FILTER_STATE } from "./eventFilters";
import { DEFAULT_MODALS_CONFIG } from "./modals";
import { AppContextValue } from "../types/contexts";

export const AppContext = createContext<AppContextValue>({
  isMobile: false,
  activeFilters: DEFAULT_EVENT_FILTER_STATE,
  setActiveFilters: activeFilters => {
    console.error("setCivEvents not initialized.");
  },
  civEvents: DEFAULT_CIV_EVENTS,
  setCivEvents: civEvents => {
    console.error("setCivEvents not initialized.");
  },
  filteredEvents: [],
  mapEvent: DEFAULT_CIV_EVENT,
  setMapEvent: mapEvent => {
    console.error("setMapEvent not initialized.");
  },
  modalsConfig: DEFAULT_MODALS_CONFIG,
  setModalsConfig: modalsConfig => {
    console.error("setModalsConfig not initialized.");
  },
});
