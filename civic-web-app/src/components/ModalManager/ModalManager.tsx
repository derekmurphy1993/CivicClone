import Backdrop from "@mui/material/Backdrop";
import { useContext } from "react";

import AddToCalendarModal from "./AddToCalendarModal.jsx";
import LoginModal from "./LoginModal.jsx";
import MobileFilterModal from "./MobileFilterModal.jsx";
import ShareModal from "./ShareModal.jsx";
import ThankYouModal from "./ThankYouModal.jsx";
import { AppContext } from "../../constants/contexts";
import { ModalsConfig } from "../../types/modals";
import "./ModalManager.css";

export default function ModalManager() {
  const { modalsConfig }  = useContext(AppContext);

  return ( 
    <div className="ModalManager">
      { modalsConfig.mobileFilter.open && <MobileFilterModal />}
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isAnyModalOpen(modalsConfig)}
      >
        { modalsConfig.calendar.open && <AddToCalendarModal />}
        { modalsConfig.login.open && <LoginModal />}
        { modalsConfig.share.open && <ShareModal />}
        { modalsConfig.thankYou.open && <ThankYouModal />}
      </Backdrop> 
    </div>
  )
}

function isAnyModalOpen(modalsConfig: ModalsConfig) {
  return (modalsConfig.calendar.open || modalsConfig.login.open ||
    modalsConfig.share.open || modalsConfig.thankYou.open);
}
