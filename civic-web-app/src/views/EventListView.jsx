import { Grid } from "@mui/material";

import EventList from "../components/EventList/EventList";
import Nav from "../components/Nav/Nav";
import ErrorBoundary from "../components/utils/ErrorBoundary";

export default function EventListView() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 11 }}>
        <Nav hideBorder={true} />
      </Grid>
      <Grid item xs={12} sx={{ height: "calc(100vh - 75px)" }}>
        <ErrorBoundary>
          <EventList />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}
