import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";

import Styles from "./EventCard.module.css";
import ShareButton from "../buttons/ShareButton";
import { AppContext } from "../../constants/contexts";
import { GACategory, GAUserAction } from "../../types/analytics";

export default function EventCard() {
  const { mapEvent, isMobile, setMapEvent } = useContext(AppContext);

  function recordGAViewMoreEvent() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_EVENT_VIEW_MORE_FROM_MAP,
      label: mapEvent.id,
    });
  }

  function handleCloseCard() {
    setMapEvent(null);
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_EVENT_CARD,
      label: mapEvent.id,
    });
  }

  return (
    <div onTouchStart={e => e.stopPropagation()}>
      <div
        id="closeEventCardButton"
        onClick={handleCloseCard}
        onMouseDown={e => e.stopPropagation()}
      >
        <span className={Styles.closeEventCardButton}>✕</span>
      </div>
      <Link
        to={`/events/${mapEvent.slug}`}
        style={{ textDecoration: "none", color: "black" }}
        onClick={recordGAViewMoreEvent}
        className={Styles.cardContent}
      >
        <div className={Styles.imageContainer}>
          <img
            className={Styles.image}
            src={mapEvent.coverImageUrl}
            alt={mapEvent.title + " event cover image"}
          />
        </div>

        <Grid container className={Styles.cardText} justifyContent="center">
          <Grid item xs={10.5} className={Styles.eventInfo}>
            <h3>{mapEvent.title}</h3>
            <div>
              {mapEvent.hostName && (
                <p>
                  Hosted by: <b>{mapEvent.hostName}</b>
                </p>
              )}
              <p>{mapEvent.start.readable.full}</p>
            </div>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>  
              <ShareButton shareSource={GAUserAction.SHARE_FROM_MAP}
                shareEvent={mapEvent} sx={{ color: "var(--primary-mediumgray)" }}
              />
            </Grid>
          )}
        </Grid>
      </Link>
    </div>
  );
}
