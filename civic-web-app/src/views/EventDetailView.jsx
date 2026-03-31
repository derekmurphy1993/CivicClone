import { Grid } from "@mui/material";

import EventDetail from "../components/EventDetail/EventDetail";
import Nav from "../components/Nav/Nav";
import ErrorBoundary from "../components/utils/ErrorBoundary";

export default function EventDetailView() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 11 }}>
        <Nav hideBorder={true} />
      </Grid>
      <Grid item xs={12}>
        <ErrorBoundary>
          <EventDetail />
        </ErrorBoundary>
      </Grid>
    </Grid>
  );
}
