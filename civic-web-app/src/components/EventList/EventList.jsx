import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import EventListItem from "./EventListItem";
import EventListItemSkeleton from "../loaders/EventListItemSkeleton";
import { AppContext } from "../../constants/contexts";
import { getFiltersFromSearchParams } from "../../helpers/params";
import "./EventList.css";

export default function EventList() {
  const [loading, setLoading] = useState(true);
  const [eventCount, setEventCount] = useState(10);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isMobile, setActiveFilters, civEvents, filteredEvents
  } = useContext(AppContext);
  const eventListEl = useRef(null);

  useEffect(() => {
    resetScroll();
  }, [])

  useEffect(() => {
    if (civEvents?.loaded) {
      setLoading(false);
      setActiveFilters(memoizedFilters);
    }
  }, [civEvents]);
  
  useEffect(() => {
    setDisplayedEvents(filteredEvents.slice(0, 10));
  }, [filteredEvents]);

  useEffect(() => {
    setActiveFilters(memoizedFilters);
  }, [searchParams]);

  const memoizedFilters = useMemo(() => {
    return getFiltersFromSearchParams(
      searchParams, civEvents.tagsSortedByEventCount);
  }, [searchParams, civEvents]);

  function loadMoreEvents() {
    const newEventCount = eventCount + 10;
    const newDisplayedEvents = filteredEvents.slice(0, newEventCount);
    setEventCount(newEventCount);
    setDisplayedEvents(newDisplayedEvents);
  }

  /** Resets the component's state and appearance. */
  function resetScroll() {
    window.scrollTo(0, 0);
    if (eventListEl.current) {
      eventListEl.current.scrollTo(0, 0);
    }
  }
  
  return(
    <div className="EventList Events" ref={eventListEl}>
      { loading ?
        [...Array(4)].map(
          (x, i) => <EventListItemSkeleton key={i}/>)
      :
        <div>
          {!displayedEvents.length && (
            <p>No events to show for these filters.</p>
          )}
          {displayedEvents.map(civEvent => (
            <EventListItem key={civEvent.id} civEvent={civEvent} />
          ))}
        </div>
      }
      { isMobile && (
        <Link to="/map">
          <button className="MobileBtn">
            <span> Map </span>
            <MapOutlinedIcon />
          </button> 
        </Link>
      )}
      { displayedEvents.length < filteredEvents.length && (
        <div className="loadMoreButtonContainer">
          <button className="loadMoreButton" onClick={loadMoreEvents}>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
