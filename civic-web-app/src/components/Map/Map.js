import ListIcon from "@mui/icons-material/List";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import React, { useContext, useEffect } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";

// custom Google map styling JSON object
import EventCard from "./EventCard";
import MapStyle from "./MapStyle";
import { AppContext } from "../../constants/contexts";
import { getSearchParamStringFromFilters } from "../../helpers/params";
import { GACategory, GAUserAction } from "../../types/analytics";
import Styles from "./Map.module.css";

const markerEventIcon = (tag) => {
  switch (tag) {
    case "Talks":
      return "/Assets/map_icons/Talks-Large.png";
    case "Voting":
      return "/Assets/map_icons/Voting-Large.png";
    case "Demonstrations":
      return "/Assets/map_icons/Demonstrations-Large.png";
    case "Government":
      return "/Assets/map_icons/Government-Large.png";
    case "Campaigns":
      return "/Assets/map_icons/Campaigns-Large.png";
    case "Volunteering":
      return "/Assets/map_icons/Volunteering-Large.png";
    case "Virtual":
      return "/Assets/map_icons/VirtualEvent-Large.png";
    case "Community":
      return "/Assets/map_icons/Community-Large.png";
    default:
      return "/Assets/map_icons/Other-Large.png";
  }
};

// Map.js imports Google Map, as well as styles for it, and displays filtered events as pinpoints
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapContainerMobile = {
  width: "100%",
  height: "100%",
};

// Centering the map on NYC, will change to ask for browser location in future version
const CENTER = {
  lat: 40.735,
  lng: -73.972,
};

// check size to decide UI display
// will only work on page load, should not be an issue for users but should find better fix
const desktop = window.matchMedia("(min-width: 855px)").matches;
// Map style and UI options
const options = {
  styles: MapStyle,
  disableDefaultUI: true,
  zoomControl: desktop,
};

export default function Map () {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });
  const {
    isMobile, activeFilters, filteredEvents, mapEvent, setMapEvent
  } = useContext(AppContext);

  useEffect(() => {
    if (mapRef.current?.panTo && mapEvent?.lat && mapEvent?.lng) {
      mapRef.current?.panTo({ lat: mapEvent.lat, lng: mapEvent.lng });
    }
  }, [mapEvent])

  // sets custom popup location
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  function handleMarkerClick(civEvent) {
    setMapEvent(civEvent);

    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_MAP_MARKER,
      label: civEvent.slug,
    });
  }

  if (loadError) return "error loading map";
  if (!isLoaded) return "loading map";

  return (
    <GoogleMap
      mapContainerStyle={isMobile ? mapContainerMobile : mapContainerStyle}
      zoom={13}
      center={CENTER}
      options={options}
      onLoad={onMapLoad}
      onClick={() => {
        setMapEvent(null);
      }}
    >
      {( filteredEvents || [] )
        .filter((civEvent) => civEvent.lat && civEvent.lng)
        .map((civEvent) => (
          <Marker
            key={civEvent.id}
            position={{ lat: civEvent.lat, lng: civEvent.lng }}
            icon={{
              url: markerEventIcon(civEvent.type),
              scaledSize: new window.google.maps.Size(42, 42),
              origin: new window.google.maps.Point(0, 0),
              // Set anchor at half the scaled size to prevent sliding on scroll.
              anchor: new window.google.maps.Point(21, 21),
            }}
            onClick={() => handleMarkerClick(civEvent)}
          />
        ))}

      { mapEvent && mapEvent.lat && mapEvent.lng && (
        <OverlayView
          position={{ lat: mapEvent.lat, lng: mapEvent.lng }}
          mapPaneName={OverlayView.FLOAT_PANE}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <div>
            <div className={Styles["popup-bubble"]}>
              <EventCard />
            </div>
            <div className={Styles["popup-bubble-anchor"]} />
          </div>
        </OverlayView>
      )}
      { isMobile && !mapEvent && (
        <Link to={`/events?${getSearchParamStringFromFilters(activeFilters)}`}>
          <button className="MobileBtn">
            <span> List </span>
            <ListIcon />
          </button> 
        </Link>
      )}
    </GoogleMap>
  );
};
