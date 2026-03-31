import Skeleton from "@mui/material/Skeleton";
import "./skeletons.css";

export default function EventFiltersSkeleton() {
  return (
    <div className="EventFiltersSkeleton" >
      {[...Array(4)].map((x, i) =>
        <Skeleton key={i} sx={{ bgcolor: "#e8e3e3" }} variant="rectangular"
          width={95} height={35} />
      )}
    </div>
  );
}
