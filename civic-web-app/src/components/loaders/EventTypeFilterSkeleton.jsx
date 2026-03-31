import Skeleton from "@mui/material/Skeleton";
import "./skeletons.css";

export default function EventTypeFilterSkeleton() {
  return (
    <div className="EventTypeFilterSkeleton" >
      <Skeleton id="SkeletonTitle" sx={{ bgcolor: "#e8e3e3" }} height={32}
        variant="rectangular"
      >
        <h2>Event Types</h2>
      </Skeleton>
      <div className="SkeletonBoxOuter" >
        {[...Array(2)].map((x, i) => (
          <div className="SkeletonBoxContainer" key={i}>
            {[...Array(5)].map((x, i) => (
              <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="rectangular"
                width={50} height={50} key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

