import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useRoutes } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import ModalManager from "./components/ModalManager/ModalManager";
import PageTracking from "./components/utils/PageTracking.js";
import { DEFAULT_CIV_EVENTS } from "./constants/civEvents";
import { AppContext } from "./constants/contexts";
import { DEFAULT_EVENT_FILTER_STATE } from "./constants/eventFilters";
import { DEFAULT_MODALS_CONFIG } from "./constants/modals";
import { getFilteredEvents } from "./helpers/civEvents";
import { fetchEvents } from "./helpers/fetch";
import { getAppRoutes, getMobileAppRoutes } from "./views/routes";
import "./App.css";

export const THEME = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1025,
      xl: 1600,
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    htmlFontSize: 17,
    button: {
      textTransform: 'none',
      fontWeight: 900
    }
  }
});

const META_CONTENT = "A hub for causes in your community. Find events, meet " +
  "new people, change your world.";

export default function App() {
  /** All event data, in object of type CivEvents (see /types/civEvents). */
  const [civEvents, setCivEvents] = useState(DEFAULT_CIV_EVENTS);
  /**
   * Event data for open EventCard in Map. setMapEvent is called when the user
   * clicks a map marker for an event, or when the civEvent in EventDetail
   * changes.
   */
  const [mapEvent, setMapEvent] = useState({});
  /** Events matching all active filters. Defaults to all events. */
  const [filteredEvents, setFilteredEvents] = useState([]);
  /** Updating activeFilters will cause an update of filteredEvents. */
  const [activeFilters, setActiveFilters] = useState(DEFAULT_EVENT_FILTER_STATE);
  const [modalsConfig, setModalsConfig] = useState(DEFAULT_MODALS_CONFIG);
  const isMobile = useMediaQuery("(max-width:800px)");
  const DesktopView = () => useRoutes(getAppRoutes());
  const MobileView = () => useRoutes(getMobileAppRoutes());

  useEffect(() => {
    fetchAndSetEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(getFilteredEvents(civEvents, activeFilters));
  }, [activeFilters, civEvents]);
  
  const fetchAndSetEvents = useCallback(() => {
    fetchEvents().then(civEvents => {
      setCivEvents(civEvents);
      setFilteredEvents(Object.values(civEvents.byId));
    });
  });

  PageTracking();

  return (
    <ThemeProvider theme={THEME}>
      <Helmet>
        <title>Civic | Change Your World</title>
        <meta name="description" content={META_CONTENT} />
      </Helmet>
      <AppContext.Provider value={{ isMobile, activeFilters, setActiveFilters,
        civEvents, setCivEvents, filteredEvents, mapEvent, setMapEvent,
        modalsConfig, setModalsConfig }}
      >
        <ModalManager />      
        { isMobile ? MobileView() : DesktopView()}
      </AppContext.Provider>
    </ThemeProvider>
  );
}
