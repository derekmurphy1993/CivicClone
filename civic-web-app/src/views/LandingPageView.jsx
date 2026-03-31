import { Grid } from "@mui/material";
import { useContext } from "react";

import LandingPage from "../components/LandingPage/LandingPage";
import Nav from "../components/Nav/Nav";
import { AppContext } from "../constants/contexts";

export default function LandingPageView() {
  const { isMobile } = useContext(AppContext);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ position: "fixed", top: 0 }}>
        <Nav hideSearchBar={true} hideBorder={true} />
      </Grid>
      <Grid item xs={12} sx={{
        position: "fixed",
        top: isMobile ? "75px" : "66px",
      }}>
        <LandingPage />
      </Grid>
    </Grid>
  );
}
