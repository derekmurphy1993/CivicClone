import IosShareIcon from "@mui/icons-material/IosShare";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { useContext } from "react";
import ReactGA from "react-ga";

import { AppContext } from "../../constants/contexts";
import icons from "../../icons/IconModule";
import { getShareInfo, getMobileShareInfo } from "../../helpers/modals";
import { GACategory, GAUserAction } from "../../types/analytics";
import { CivEvent } from "../../types/civEvents";
import { ModalsConfig } from "../../types/modals";
import "./ShareButton.css";

interface ShareButtonProps {
  shareEvent: CivEvent;
  shareSource: GAUserAction;
  sx: SxProps
}

export default function ShareButton({ shareEvent, shareSource, sx }: ShareButtonProps) {
  const { isMobile, setModalsConfig } = useContext(AppContext);

  function openShareModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: shareSource,
      label: shareEvent.id,
    });
    if (isMobile && navigator.share) {
      navigator.share(getMobileShareInfo(shareEvent)).catch(console.error);
    } else {
      setModalsConfig((prevState: ModalsConfig) => ({
        ...prevState,
        share: {
          open: true,
        },
        shareInfo: getShareInfo(shareEvent),
      }));
    }
  }

  return (
    <Button id="ShareButton" variant="text" onClick={openShareModal} 
      sx={sx}
    >
      <IosShareIcon sx={{ marginRight: "5px", position: "relative",
        bottom: "2px" }} />
      Share
    </Button>
  )
}
