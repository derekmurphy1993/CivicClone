import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useContext } from "react"

import "./skeletons.css";
import { AppContext } from "../../constants/contexts"

/** Loading skeleton for EventList. */
export default function EventListItemSkeleton() {
  const { isMobile } = useContext(AppContext);

  return (
    <div className="EventListItemSkeleton" >
      <Skeleton id="SkeletonImg" sx={{ bgcolor: "#e8e3e3" }} height={isMobile ? 200 : 250} width={isMobile ? 150 : 275} />

      <div id="eventSectionSkeleton" >
        <Stack spacing={isMobile ? 1.5 : 2.5} >
          <Skeleton key="1" sx={{ bgcolor: "#e8e3e3" }} variant="text"
            height={30} width={isMobile ? 80 : 125} />
          <Skeleton key="2" sx={{ bgcolor: "#e8e3e3" }} variant="rectangular"
            height={15} width={isMobile ? 150 : 250} />
          <Skeleton key="3" sx={{ bgcolor: "#e8e3e3" }} variant="rectangular"
            height={15} width={isMobile ? 120 : 220} />
        </Stack>
      </div>

      <div id="BtnSkeleton" >
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="rectangular" height={isMobile ? 30 : 40}
          width={isMobile ? 60 : 110} />
      </div>
    </div>
  );
}
