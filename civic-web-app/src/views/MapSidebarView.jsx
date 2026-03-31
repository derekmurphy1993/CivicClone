import Grid from "@mui/material/Grid";
import { Outlet, useLocation } from "react-router-dom";

import EventFilters from "../components/EventFilters/EventFilters";
import Map from "../components/Map/Map";
import Nav from "../components/Nav/Nav";
import "./MapSidebarView.css";

export default function MapSidebarView() {
  const location = useLocation();

  function isEventList() {
    return !!location.pathname.match(/^\/events\/?$/g);
  }

  function getTop() {
    return isEventList() ? "188px" : "66px";
  }
  
  return (
    <Grid container>
      <Grid item xs={12} sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }}>
        <Nav />
        {isEventList() && <EventFilters />}
      </Grid>
      <Grid item xs={12} sx={{
        display: "flex",
        position: "fixed",
        top: getTop(),
      }}>
        <div className="Sidebar">
          <Outlet />
        </div>
        <div className="Map">
          <Map />
        </div>
      </Grid>
    </Grid>
  );
}
