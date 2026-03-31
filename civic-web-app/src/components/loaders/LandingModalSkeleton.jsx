import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import { SKELETON_SX } from "../../constants/skeletons";

export default function LandingModalSkeleton() {
  return (
    <Grid container id="LandingModalSkeleton" sx={{
      justifyContent: "space-between",
      minHeight: "40%",
    }}>
      <Grid item xs={12}>
        <Skeleton sx={SKELETON_SX} height={40} width={"50%"} variant="text" />
      </Grid>
      <Grid item xs={7.5} sm={5.8}>
        <Skeleton sx={SKELETON_SX} height={45} width={"100%"} variant="rectangular" />
      </Grid>
      <Grid item xs={4} sm={5.8}>
        <Skeleton sx={SKELETON_SX} height={45} width={"100%"} variant="rectangular" />
      </Grid>
      {[...Array(3)].map((x, rowIdx) => [...Array(4)].map((y, colIdx) => (
        <Grid item xs={1.8} key={`${rowIdx}:${colIdx}`} >
          <Skeleton variant="rectangular" height={32} sx={{
            ...SKELETON_SX,
            borderRadius: "30px",
          }}/>
        </Grid>
      )))}
      <Grid item sx={{ height: "6vh", width: "70%", margin: "0 auto" }}>
        <Skeleton variant="rectangular" sx={{
          ...SKELETON_SX,
          borderRadius: "10px",  
        }}/>
      </Grid>
    </Grid>
  );
}
