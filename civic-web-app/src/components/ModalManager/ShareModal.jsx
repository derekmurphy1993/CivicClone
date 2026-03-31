import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import ReactGA from "react-ga";

import ShareModalCopyLink from "./ShareModalCopyLink";
import { AppContext } from "../../constants/contexts";
import icons from "../../icons/IconModule";
import {
  GACategory,
  GASocialLabel,
  GAUserAction,
} from "../../types/analytics";

export default function ShareModal() {
  const { modalsConfig, setModalsConfig } = useContext(AppContext);

  function closeModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_SHARE_MODAL,
      label: modalsConfig.shareInfo.id,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      share: {
        open: false,
      }
    }));
  }

  function recordGAEventSocialLink(socialLabel) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_CIVIC_SOCIAL_LINK,
      label: socialLabel,
    });
  }

  return (
    <div className="ShareModal">
      <button id="smCloseBtn" onClick={closeModal}>
        {" "}
        <CloseIcon />{" "}
      </button>

      <div id="SMinnerDiv">
        <h2>share this event with your friends!</h2>

        <div>
          <img src={ modalsConfig.shareInfo.url } alt="" />
          <p id="smTitle">{ modalsConfig.shareInfo.title }</p>
        </div>

        <br />
        <h3>Copy link</h3>
        <ShareModalCopyLink slug={ modalsConfig.shareInfo.slug } />

        <h3>Social Media</h3>
        <div className="socialMedia">
          {/* <div>
            <a
              rel="noreferrer"
              href="https://www.facebook.com/thecivicplatform"
              target="_blank"
              onClick={() => recordGAEventSocialLink(GASocialLabel.FACEBOOK)}
            >
              <button>
                {" "}
                <img src={icons.Facebook} alt="" />
              </button>
              <p> Facebook </p>
            </a>
          </div> */}
          <div
            className="fb-share-button"
            data-href={"http://civicapp.co/events/" + modalsConfig.shareInfo.slug}
            data-layout="button"
            data-size="small"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcivicapp.co%2Fevent%2F&amp;src=sdkpreparse"
              className="fb-xfbml-parse-ignore"
              onClick={() => recordGAEventSocialLink(GASocialLabel.FACEBOOK)}
            >
              <button>
                {" "}
                <img src={icons.Facebook} alt="" />
              </button>
              <p> Facebook </p>
            </a>
          </div>

          <div>
            <a
              rel="noreferrer"
              href="https://twitter.com/intent/tweet"
              target="_blank"
              onClick={() => recordGAEventSocialLink(GASocialLabel.TWITTER)}
            >
              <button>
                {" "}
                <img src={icons.Twitter} alt="" />
              </button>
              <p> Twitter </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
