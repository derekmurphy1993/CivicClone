import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import ReactGA from "react-ga";

import { AppContext } from "../../constants/contexts";
import { GACategory, GAUserAction } from "../../types/analytics";

export default function AddToCalendarModal() {
  const { modalsConfig, setModalsConfig } = useContext(AppContext);

  function closeModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_CALENDAR_MODAL,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      calendar: {
        open: false,
      }
    }));
  }

  return (
    <div className="AddToCalendarModal" >
      <button id="atcCloseBtn" onClick={closeModal} > <CloseIcon /> </button>
      
      <h2>Add this event to your calendar</h2>
      <div>
        <img src={modalsConfig.shareInfo.url} alt=""/>
        <p id="atcTitle" >{modalsConfig.shareInfo.title}</p>
      </div>

      <div id="atcBg" >
        <button>Google Calendar <span><ArrowForwardIosIcon/></span> </button>
        <button>Apple Calendar <span><ArrowForwardIosIcon/></span> </button>
        <button>Outlook Calendar <span><ArrowForwardIosIcon/></span> </button>
      </div>
    </div>
  );
}
