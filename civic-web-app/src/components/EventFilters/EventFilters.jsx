import Grid from "@mui/material/Grid";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AvailabilityFilter from "./AvailabilityFilter";
import EventTagFilter from "./EventTagFilter";
import EventTypeFilter from "./EventTypeFilter";
import VirtualEventToggle from "./VirtualEventToggle"
import EventFiltersSkeleton from "../loaders/EventFiltersSkeleton";
import { AppContext } from "../../constants/contexts";
import "./EventFilters.css";

/* Screen-width bar containing filter input fields to filter visible events. */
export default function EventFilters() {
  const [loading, setLoading] = useState(true);
  const { civEvents, activeFilters, filteredEvents } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(!civEvents.loaded);
  }, [civEvents]);

  function clearFilters() {
    navigate("/events");
  }

  function getEventCountTitle() {
    if (!isAnyFilterActive()) {
      return "Displaying all events";
    } else if (filteredEvents.length === 0 && activeFilters.searchInput) {
      return `No events match selected filters and "${activeFilters.searchInput}"`;
    } else if (filteredEvents.length === 0) {
      return "No events match selected filters";
    } else if (activeFilters.searchInput) {
      return `${filteredEvents.length} events for "${activeFilters.searchInput}"`;
    } else {
      return `${filteredEvents.length} events match your filters`;
    }
  }

  function isAnyFilterActive() {
    return !!(
      activeFilters.availability.length ||
      activeFilters.eventTags.length ||
      activeFilters.eventTypes.length ||
      activeFilters.searchInput.length ||
      activeFilters.virtualOnly);
  }

  if (loading) {
    return <EventFiltersSkeleton />;
  } else {
    return (
      <div className="EventFilters">
        <Grid container className="eventFilterInputs" sx={{
            display: "flex",
            width: "calc(100% - 434px)",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "30px",
        }}>
          <Grid item xs={12}>
            <h2 className="filteredEventCount">
              { getEventCountTitle() }
              { isAnyFilterActive() && (
                <span className="clearText" onClick={clearFilters}>
                  [clear all filters]
                </span>
              )}
            </h2>
          </Grid>
          <Grid item xs={12} sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <AvailabilityFilter />
            <EventTagFilter />
          </Grid>
        </Grid>
        {/* width 184px */}
        <VirtualEventToggle />
        {/* width 250px */}
        <EventTypeFilter />
      </div>
    );
  }
}
