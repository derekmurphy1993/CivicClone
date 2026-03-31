import { Navigate } from "react-router-dom";

import EventDetail from "../components/EventDetail/EventDetail";
import EventList from "../components/EventList/EventList";
import LandingPage from "../components/LandingPage/LandingPage";
import EventDetailView from "./EventDetailView";
import EventListView from "./EventListView";
import ExploreView from "./ExploreView";
import LandingPageView from "./LandingPageView";
import MapSidebarView from "./MapSidebarView";
import MapView from "./MapView";

export function getAppRoutes() {
  return [
    {
      path: "/",
      children: [
        { index: true, element: <LandingPageView /> },
        { path: "explore", element: <ExploreView /> },
        { path: "map", element: <Navigate replace to="/events" /> },
        { path: "events", element: <MapSidebarView />, children: [
          { index: true, element: <EventList /> },
          { path: ":slugOrId", element: <EventDetail /> },
        ]},
        { path: "event", element: <MapSidebarView />, children: [
          { index: true, element: <EventList /> },
          { path: ":slugOrId", element: <EventDetail /> },
        ]},
      ],
    },
  ];
}

export function getMobileAppRoutes() {
  return [
    {
      path: "/",
      children: [
        { index: true, element: <LandingPageView /> },
        { path: "explore", element: <ExploreView /> },
        { path: "map", element: <MapView /> },
        { path: "events", children: [
            { index: true, element: <EventListView /> },
            { path: ":slugOrId", element: <EventDetailView /> },
        ]},
        { path: "event", children: [
            { index: true, element: <EventListView /> },
            { path: ":slugOrId", element: <EventDetailView /> },
        ]},
      ],
    },
  ];
}
