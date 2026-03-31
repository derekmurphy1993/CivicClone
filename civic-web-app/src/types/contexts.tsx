import { Dispatch, SetStateAction } from "react";

import { CivEvent, CivEvents } from "./civEvents";
import { EventFilters } from "./eventFilters";
import { ModalsConfig } from "./modals";

export interface AppContextValue {
  isMobile: boolean;
  activeFilters: EventFilters;
  setActiveFilters: Dispatch<SetStateAction<EventFilters>>;
  civEvents: CivEvents;
  setCivEvents: Dispatch<SetStateAction<CivEvents>>;
  filteredEvents: CivEvent[];
  mapEvent: CivEvent;
  setMapEvent: Dispatch<SetStateAction<CivEvent>>;
  modalsConfig: ModalsConfig;
  setModalsConfig: Dispatch<SetStateAction<ModalsConfig>>;
}
