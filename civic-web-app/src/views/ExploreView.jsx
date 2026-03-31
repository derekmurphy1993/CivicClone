import { Grid } from "@mui/material";

import Explore from "../components/Explore/Explore";
import Nav from "../components/Nav/Nav";

export default function ExploreView() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ position: "sticky", top: 0 }}>
        <Nav hideSearchBar={true} hideBorder={true} sx={{
            backgroundColor: "var(--primary-surface)",
            color: "black",
          }} buttonSx={{ color: "black" }}
       />
      </Grid>
      <Grid item xs={12}>
        <Explore />
      </Grid>
    </Grid>
  );
}
