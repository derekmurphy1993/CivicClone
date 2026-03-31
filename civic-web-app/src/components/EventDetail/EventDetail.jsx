import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Button, Grid } from "@mui/material";
import Autolinker from "autolinker";
import parse from "html-react-parser";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import ReactGA from "react-ga";
import { Link, useParams } from "react-router-dom";

import EventDate from "./EventDate";
import ShareButton from "../buttons/ShareButton";
import EventDetailSkeleton from "../loaders/EventDetailSkeleton";
import ErrorMessage from "../utils/ErrorMessage";
import { AppContext } from "../../constants/contexts";
import { fetchEvent } from "../../helpers/fetch";
import { getShareInfo } from "../../helpers/modals";
import { getSearchParamStringFromFilters } from "../../helpers/params";
import { GACategory, GAUserAction } from "../../types/analytics";
import ConditionalWrapper from "../utils/ConditionalWrapper";
import "./EventDetail.css";

const EVENT_MISSING_ERROR_MESSAGE = "Cannot find event. Please choose another.";

/** Handles the display of an event when user clicks "View More". */
export default function EventDetail() {
  /** Event data to display in this component. */
  const [civEvent, setCivEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [less, setLess] = useState("");
  const [more, setMore] = useState("");
  const [isMoreEnabled, setIsMoreEnabled] = useState(false);
  const params = useParams();
  const eventDetailEl = useRef(null);
  const {
    isMobile, activeFilters, civEvents, setMapEvent, setModalsConfig
  } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(civEvents.byId).length > 0) {
      setCivEvent(getCivEvent(params.slugOrId));
    }
  }, [civEvents, params]);
    
  useEffect(() => {
    reset();
    if (Object.keys(civEvents.byId).length > 0) {
      setLoading(false);
    }
    if (civEvent) {
      setMapEvent(civEvent);

      if (civEvent.description) {
        const description = civEvent.description.split(" ");
        const half = Math.ceil(description.length / 2);
        let firstHalf = description.slice(0, half);
        let secondHalf = description.slice(half,);
  
        firstHalf = (firstHalf.join(" ") + " ").replace(/(\r\n|\n|\r)/g,"<br />");
        secondHalf = secondHalf.join(" ").replace(/(\r\n|\n|\r)/g,"<br />");
        setLess(Autolinker.link(firstHalf));
        setMore(Autolinker.link(secondHalf));
      }
    }
  }, [civEvent]);

  const fetchAndSetCivEvent = useCallback(eventId => {
    fetchEvent(eventId).then(event => {
      setCivEvent(event);
    });
  });

  function getCivEvent(slugOrId) {
    const eventId = civEvents.slugToId.get(slugOrId) || slugOrId;

    if (civEvents.byId[eventId]) {
      return civEvents.byId[eventId];
    } else {
      console.error("Event data is missing");
      return {};
    }
      // TODO: replace with single event fetch when slugs are handled by backend
    // else {
    //   fetchAndSetCivEvent(eventSlug);
    // }
  }

  /** Resets the component's state and appearance. */
  function reset() {
    window.scrollTo(0, 0);
    if (eventDetailEl.current) {
      eventDetailEl.current.scrollTo(0, 0);
    }
    setIsMoreEnabled(false);
  }

  function readMore() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_READ_MORE_FROM_EVENT_DETAIL,
      label: civEvent.slug,
    });
    setIsMoreEnabled(true);
  }

  function readLess() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_READ_LESS_FROM_EVENT_DETAIL,
      label: civEvent.slug,
    });
    setIsMoreEnabled(false);
  }

  function recordGASeeMoreEvents() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_SEE_MORE_EVENTS_FROM_EVENT_DETAIL,
    });
  }

  function openCalendarModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.ADD_TO_CALENDAR,
      label: civEvent.slug,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      calendar: {
        open: true,
      },
      shareInfo: getShareInfo(),
    }));
  }

  if (loading) {
    return <EventDetailSkeleton />;
  }
  if (!civEvent.id) {
    return <ErrorMessage message={EVENT_MISSING_ERROR_MESSAGE} />;
  }
  return (
    <Grid container className="Events" id="EventDetail" ref={eventDetailEl}
      spacing={1} justifyContent="center" sx={{ margin: 0 }}
    >
      <Grid item xs={12} id="seeOthersContainer">
        <Link to={`/events?${getSearchParamStringFromFilters(activeFilters)}`}
          style={{ textDecoration: "none" }}
        >
          <Button id="seeOthers" varient="contained" onClick={recordGASeeMoreEvents}>
            <ArrowBackIosNewIcon id="seeOthersArrow" />
            See other events
          </Button>
        </Link>
      </Grid>

      <Grid item className="eventDetailTitle" xs={12}>
        <h2>{civEvent.title}</h2>
        <div className="eventDetailSubtitle">
          <p>
            <span>Hosted by </span>
            <b>
              <ConditionalWrapper condition={civEvent.hostUrl}
                wrapper={children => (
                  <a id="hostUrl" target="_blank" href={civEvent.hostUrl}>
                    {children}
                  </a>
                )}
              >
                {civEvent.hostName}
              </ConditionalWrapper>
            </b>
          </p>
          <ShareButton shareSource={GAUserAction.SHARE_FROM_EVENT_DETAIL}
            shareEvent={civEvent} sx={{
              backgroundColor: "var(--primary-main)",
              color: "black",
              width: "20%",
              marginLeft: "5px",
            }}
          />
        </div>
      </Grid>

      <Grid item xs={12} id="eventDetailImageContainer">
        <img className="eventDetailImage" src={civEvent.coverImageUrl}
          alt={civEvent.title} />
      </Grid>

      <Grid item className="eventDetailIconText"
        xs={ isMobile ? 12 : 6 }
      >
        <CalendarTodayIcon id="CalendarIcon" />
        <EventDate civEvent={civEvent} />
      </Grid>

      <Grid item className="eventDetailIconText"
        xs={isMobile ? 12 : 6 }
      >
        <LocationOnSharpIcon id="LocationIcon" />
        <address style={{ fontStyle: "normal" }}>
          {civEvent.address}
        </address>
      </Grid>

      { civEvent.externalLink && (
        <Grid item className="eventDetailIconText" xs={12} >
          <LinkIcon id="LinkIcon" />
          <p id="eventLink">
            {parse(Autolinker.link(civEvent.externalLink))}
          </p>
        </Grid>
      )}
      {/* <Grid item id="eventButtons" xs={isMobile ? 12 : 3}>
        <Button id="calendarButton" varient="contained" onClick={openCalendarModal} >
          <img src={Icons.Calendar} alt="" />
          Add to calendar
        </Button>
      </Grid> */}
      <Grid item xs={12} id="EventDetailInfo">
        <div id="EventDetailDescription">
          <b> Event Description </b>
          <p>
            <span>{parse(less)}</span>
            <span>{isMoreEnabled ? parse(more) : "..." }</span>
          </p>
            { isMoreEnabled ? (
              <button onClick={readLess}>See less</button>
            ) : (
              <button onClick={readMore}>See more</button>
            )}     
        </div>

        <b> Categories </b>
        <p id="categories">
          {civEvent.tags.join(", ")}
        </p>
      </Grid>
    </Grid>
  );
}
