import { useState, useEffect, useContext } from "react";

import EventTypeInput from "../inputs/EventTypeInput";
import EventTypeFilterSkeleton from "../loaders/EventTypeFilterSkeleton";
import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";

/* Filters events by event type. */
export default function EventTypeFilter() {
  const [loading, setLoading] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const { activeFilters, civEvents } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  useEffect(() => {
    setLoading(!civEvents.loaded);
  }, [civEvents]);

  useEffect(() => {
    setSelectedTypes(activeFilters.eventTypes);
  }, [activeFilters]);

  useEffect(() => {
    const newFilters = {
      ...activeFilters,
      eventTypes: selectedTypes,
    };
    navigateWithEventFilters(newFilters);
  }, [selectedTypes]);

  if (loading) {
    return <EventTypeFilterSkeleton />;
  } else {
    return (
      <EventTypeInput selectedTypes={selectedTypes} multiple={true}
        setSelectedTypes={setSelectedTypes}
      />
    );
  }
}
