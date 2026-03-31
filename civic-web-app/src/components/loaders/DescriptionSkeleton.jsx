import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "./skeletons.css";

export default function DescriptionSkeleton() {
  return (
    <div className="DescriptionSkeleton" >
      <Stack spacing={.5}>
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={375} >
          <h2>Welcome to Civic</h2>
        </Skeleton>
        {[...Array(5)].map((x, i) => (
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={450}
            height={20} key={i} />
        ))}
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={350}
          height={20} />
      </Stack>
    </div>
  );
}

