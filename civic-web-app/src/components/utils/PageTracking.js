import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

/**
 * Functional component to initialize Google Analytics (GA) tracking and send
 * information about page location to GA.
 */
export default function PageTracking() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
}
