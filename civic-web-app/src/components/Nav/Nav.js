import { Grid } from "@mui/material";
import { useContext } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";

import LongMenu from "./LongMenu";
import NavSearchBar from "./NavSearchBar";
import { NavButton } from "../buttons/NavButton";
import { AppContext } from "../../constants/contexts";
import icons from "../../icons/IconModule";
import { GACategory, GAUserAction } from "../../types/analytics";
import styles from "./Nav.module.css";

export default function Nav({ hideSearchBar, hideBorder, sx, buttonSx }) {
  const { isMobile } = useContext(AppContext);

  function homeRedirect() {
    window.location.href = "/"
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_HOME,
    });
  }

  return (
    <div className={styles.Nav} style={{
        ...(hideBorder ?
            { border: "none" } :
            { borderBottom: "1px solid var(--primary-lightgray)" }),
        backgroundColor: "var(--primary-darkbackground)",
        ...(sx ? sx : {}),
      }}
    >
      <img alt="civic logo" className={styles.logo} onClick={homeRedirect}
        src={isMobile ? icons.MobileLogo : "/Assets/logo/civic_full_logo.png"}
      />
      
      { !hideSearchBar && (
        <div className={styles.searchBarContainer}>
          <NavSearchBar />
        </div>
      )}

      <Grid item sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        { !isMobile &&
          <Grid container sx={{ width: "auto", margin: "0 20px 0 0" }}
            columnSpacing={1}
          >
            <Grid item>
              <Link to="/map">
                <NavButton text="Map" sx={buttonSx} />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/explore">
                <NavButton text="Explore causes" sx={buttonSx} />
              </Link>
            </Grid>
            <Grid item>
              <a rel="noreferrer" href="https://97z5nbm4kkq.typeform.com/to/dlaFJ2YT"
                target="_blank" style={{textDecoration: "none"}}
              >
                <NavButton text="Add event" sx={buttonSx} />
              </a>
            </Grid>
          </Grid>
        }
        <LongMenu sx={buttonSx} />
      </Grid>
    </div>
  );
};
