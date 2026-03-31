import CloseIcon from "@mui/icons-material/Close";
import ReactGA from "react-ga";
import { useContext } from "react";

import { AppContext } from "../../constants/contexts";
import icons from "../../icons/IconModule";
import { GACategory, GAUserAction, GASocialLabel } from "../../types/analytics";

export default function ThankYouModal() {
  const { setModalsConfig } = useContext(AppContext);

  function closeModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_THANK_YOU_MODAL,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      thankYou: {
        open: false,
      }
    }));
  }

  function recordGAEventSocialClick(socialLabel) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_CIVIC_SOCIAL_LINK,
      label: socialLabel,
    });
  }

  return (
    <div className="ThankYouModal" >
      <button id="closeTYModal" onClick={closeModal} > 
          <CloseIcon />
      </button>
      <h3>Thank you for subscribing to Civic!</h3>

      <h4>and follow us on</h4>
      <div className="socialMedia" >
          <a rel="noreferrer" href="https://twitter.com/TheCivicApp"
            onClick={() => recordGAEventSocialClick(GASocialLabel.TWITTER)}
            target="_blank"
          >
            <button>
              <img src={icons.Twitter} alt="Follow us on Twitter"/>
            </button>
          </a>
          <a rel="noreferrer" href="https://www.instagram.com/thecivicapp/"
            onClick={() => recordGAEventSocialClick(GASocialLabel.INSTAGRAM)}
            target="_blank"
          >
            <button>
              <img src={icons.Instagram} alt="Follow us on Instagram"/>
            </button>
          </a>
          <a rel="noreferrer" href="https://www.facebook.com/thecivicplatform"
            onClick={() => recordGAEventSocialClick(GASocialLabel.FACEBOOK)}
            target="_blank"
          >
            <button>
              <img src={icons.Facebook} alt="Follow us on Facebook"/>
            </button>
          </a>
        </div>
    </div>
  );
}
