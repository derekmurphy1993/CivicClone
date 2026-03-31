import VideocamSharpIcon from "@mui/icons-material/VideocamSharp";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";

import ShareButton from "../buttons/ShareButton";
import { GACategory, GAUserAction } from "../../types/analytics";
import "./EventList.css";

export default function EventListItem({ civEvent }) {
  function recordGAViewMore() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_EVENT_VIEW_MORE_FROM_LIST,
      label: civEvent.slug,
    });
  }

  return (
    <Link to={`/events/${civEvent.slug}`} onClick={recordGAViewMore}>
      <div className="EventListItem">
        <div className="eventListItemImageContainer">
          { civEvent.isVirtual && (
            <div id="eventListItemVirtualTag" >
              <VideocamSharpIcon />
              <p>Online Event</p>
            </div>
          )}
          <img className="eventListItemImage" src={civEvent.coverImageUrl}
            alt={civEvent.title}
          />
        </div>

        <div className="eventListItemContent">
          <div className="eventListItemInfo">
            <p className="eventListItemDate">
              { civEvent.start.readable.full }
            </p>
            <h2 className="eventTitle">{ civEvent.title }</h2>
            { civEvent.hostName && (
              <p className="hostName">
                Hosted by <b>{ civEvent.hostName }</b>
              </p>
            )}
          </div>
          <div className="eventListItemActions">
            <ShareButton shareSource={GAUserAction.SHARE_FROM_LIST}
              shareEvent={civEvent} sx={{
                width: "81px",
                height: "48px",
                color: "var(--primary-mediumgray)",
                padding: 0,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
