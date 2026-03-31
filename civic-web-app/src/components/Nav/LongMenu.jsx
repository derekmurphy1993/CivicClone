import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useContext, useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useNavigate } from "react-router-dom";

import ConditionalWrapper from "../utils/ConditionalWrapper";
import { AppContext } from "../../constants/contexts";
import { GACategory, GAUserAction } from "../../types/analytics";

const ITEM_HEIGHT = 48;

export default function LongMenu({ sx }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const desktopOptions = [
    { text: "About us", link: "https://about.civicapp.co/" },
    { text: "Give feedback", link: "https://97z5nbm4kkq.typeform.com/to/t33u4qGK" },
    { text: "Contact us", link: "https://about.civicapp.co/" },
    { text: "Subscribe", onClickCallback: () => showLoginModal() },
  ];  
  const mobileOptions = [
    { text: "Map", onClickCallback: () => navigate("/map") },
    { text: "Explore causes", onClickCallback: () => navigate("/explore") },
    { text: "Add event", link: "https://97z5nbm4kkq.typeform.com/to/dlaFJ2YT" },
  ].concat(desktopOptions);
  const { isMobile, setModalsConfig } = useContext(AppContext);

  useEffect(() => {
    setMenuOptions(isMobile ? mobileOptions : desktopOptions);
  }, [isMobile])

  function showLoginModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLICK_LOGIN,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      login: {
          open: true,
      }
    }));
  }

  const handleMenuIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (onClickCallback) => {
    setAnchorEl(null);
    if (onClickCallback) {
      onClickCallback();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        style={{
          width: "50px",
          color: "white",
          ...(sx ? sx : {}),
        }}
        onClick={handleMenuIconClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {menuOptions.map((option) => (
          <ConditionalWrapper condition={option.link} key={option.text}
            wrapper={children => <a target="_blank" href={option.link}>{children}</a>} >
            <MenuItem value={option.text}
              onClick={() => handleMenuItemClick(option.onClickCallback)}
              sx={{
                minHeight: "auto",
              }}
            >
              {option.text}
            </MenuItem>
          </ConditionalWrapper>
        ))}
      </Menu>
    </div>
  );
}

