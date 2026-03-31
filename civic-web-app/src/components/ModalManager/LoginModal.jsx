import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState, useContext } from "react";
import ReactGA from "react-ga";

import { AppContext } from "../../constants/contexts";
import { UNSET_EMAIL } from "../../constants/userInfo";
import icons from "../../icons/IconModule";
import { GACategory, GAUserAction, GASocialLabel } from "../../types/analytics";

export default function LoginModal() {
  const [userInfo, setInfo] = useState(UNSET_EMAIL);
  const { setModalsConfig } = useContext(AppContext);

  function handleChange(event) {
    const {id , value} = event.target;
    setInfo(prestate => ({
      ...prestate,
      [id] : value
    }));
  }

  function closeModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_LOGIN_MODAL,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      login: {
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

  function recordGAEventMobileAppDownload(mobileOSLabel) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_DOWNLOAD_MOBILE_APP,
      label: mobileOSLabel,
    });
  }


  function handleSubmit(e) {
    e.preventDefault()

    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.SUBSCRIBE_EMAIL,
    });

    if (userInfo.email) {
      axios.post(`${process.env.REACT_APP_EMAILLIST}`, {
        data: {
            email: userInfo.email
        }
      }).catch(err => {
        console.error("Failed to subscribe email.")
        console.error(err);
      }).finally(() => {
        setInfo(UNSET_EMAIL);
        setModalsConfig(prevState => ({
          ...prevState,
          thankYou: {
            open: true,
          },
        }));
        closeModal();
      });
    }
  }


  return (
    <div className="LoginModal" >
      <button id="closeLoginModal" onClick={closeModal} > 
        < CloseIcon />
      </button>
          
      <h1> Thank you for using Civic </h1>

      {/* <h2> To login, download our mobile app</h2>

      <div className="IconDisplay" >
      
          <a rel="noreferrer" href="https://apps.apple.com/us/app/civic-organizing-reimagined/id1563302188" target="_blank"
              onClick={() => recordGAEventMobileAppDownload(GAMobileOSLabel.IOS)}>
              <IconButton aria-label="delete">
                  <img src={icons.Applestore} alt="Apple store" />
              </IconButton>
          </a>
          <a rel="noreferrer" href="https://play.google.com/store/apps/details?id=co.civicapp" target="_blank"
              onClick={() => recordGAEventMobileAppDownload(GAMobileOSLabel.ANDROID)}>
              <IconButton aria-label="delete">
                  <img id="Googleplay" src={icons.Googleplay} alt="Googleplay" />
              </IconButton>
          </a>

      </div> */}

      <h3 style={{fontSize: "25px"}} >Join our email list for updates</h3>

      <form>
        <input placeholder="Your email"  onChange={handleChange}
          type="email" id="email" value={userInfo.email} required />
        <button type="submit" onClick={handleSubmit} id="Subscribe" >
          Subscribe
        </button>
      </form>

      <h4>and follow us on</h4>

      <Stack className="socialMedia" direction="row" m="auto" width="200px">
        <a rel="noreferrer" href="https://twitter.com/TheCivicApp" target="_blank"
          onClick={() => recordGAEventSocialClick(GASocialLabel.TWITTER)}
        >
          <button> <img src={icons.Twitter} alt="Follow on Twitter"/> </button>
        </a>
        <a rel="noreferrer" href="https://www.instagram.com/thecivicapp/" target="_blank"
          onClick={() => recordGAEventSocialClick(GASocialLabel.INSTAGRAM)}
        >
          <button> <img src={icons.Instagram} alt="Follow on Instagram"/> </button>
        </a>
        <a rel="noreferrer" href="https://www.facebook.com/thecivicplatform" target="_blank"
          onClick={() => recordGAEventSocialClick(GASocialLabel.FACEBOOK)}
        >
          <button> <img src={icons.Facebook} alt="Follow on Facebook"/> </button>
        </a>
      </Stack>
    </div>
  );
}