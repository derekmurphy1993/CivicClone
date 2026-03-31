import { useContext } from "react";

import LandingModal from "./LandingModal";
import { AppContext } from "../../constants/contexts";
import LandingModalSkeleton from "../loaders/LandingModalSkeleton";
import "./LandingPage.css";

export default function LandingPage() {
  const { civEvents } = useContext(AppContext);

  return (
    <div className="LandingPage">
      <div className="landingImageContainer">
        <img src="/Assets/landing_page_background.jpeg"
          className="landingImage" />
        <p className="landingImageSource">Photograph by Biz Herman</p>
      </div>
      <h1 className="landingPageTitle">Get involved in your community</h1>
      { civEvents.loaded ? <LandingModal /> : <LandingModalSkeleton />  }
    </div>
  );
}
