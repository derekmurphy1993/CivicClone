import { Grid } from "@mui/material";

import Map from "../components/Map/Map";
import Nav from "../components/Nav/Nav";

/** View containing only map. Currently only for mobile. */
export default function MapView() {
  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      <Grid item xs={12} sx={{
        position: "sticky",
        top: 0,
        height: "75px",
        zIndex: 1,
      }}>
        <Nav hideBorder={true} />
      </Grid>
      <Grid item xs={12} sx={{
        height: "calc(100vh - 75px)",
        width: "100vw",
        position: "fixed",
        top: "75px",
      }}>
        <Map />
      </Grid>
    </Grid>
  );
}
