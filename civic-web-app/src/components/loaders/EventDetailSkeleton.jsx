import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useContext } from "react"

import { AppContext } from "../../constants/contexts"

export default function EventDetailSkeleton() {
  const { isMobile } = useContext(AppContext);

  return(
    <div className="EventDetailSkeleton"
      style={{ height: "91vh", overflow: "scroll", width: "100%" }}
    >
      <Skeleton sx={{ bgcolor: "#e8e3e3", marginLeft: isMobile ? 10 : 4 }} variant="text" width={isMobile ? 120 : 180} height={isMobile ? 50 : 60} />
      <Stack spacing={1} sx={{marginLeft: "3vw", position: "relative", top: "3vh", paddingLeft: isMobile ? 4 : 0 }} >
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 450} height={40} />
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 200 : 300} height={40} />
      </Stack>
      <Skeleton sx={{ bgcolor: "#e8e3e3", display: "block", position: "relative", left: isMobile ? "70vw" : "40vw"}}
       variant="text" width={isMobile ? 80 : 180} height={80} 
      />
      <Skeleton sx={{ bgcolor: "#e8e3e3", position: "relative", left: isMobile ? "10vw" : "5vw", top: "-13vh" }}
       variant="text" width={isMobile ? 320 : 650} height={450} 
      />
      <div style={{marginTop: "-23vh", marginBottom: "5vh", paddingLeft: isMobile ? "8vw" : "2vw" }} >
        <Stack spacing={1} >
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 270 : 200} height={40} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={270} height={40} />
        </Stack>
        <Skeleton sx={{ bgcolor: "#e8e3e3", position: isMobile ? "block" : "relative", left: "32vw", top: "-11vh", marginBottom: isMobile ? 4 : 0 }}
         variant="text" width={270} height={40} 
        />
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={210} height={70} />
        <Stack spacing={2}>
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 675} height={20} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 675} height={20} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 675} height={20} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 675} height={20} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 675} height={20} />
          <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={isMobile ? 300 : 350} height={20} />
        </Stack>
        <br/>       
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={210} height={70} />
        <Skeleton sx={{ bgcolor: "#e8e3e3" }} variant="text" width={350} height={15} />
      </div>
    </div>
  )
}
