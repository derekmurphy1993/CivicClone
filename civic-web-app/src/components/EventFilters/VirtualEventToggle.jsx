import Switch from "@mui/material/Switch";
import { useContext } from "react";

import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";
import "./VirtualEventToggle.css";

export default function VirtualEventToggle() {
  const { activeFilters, civEvents } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  function handleChange() {
    if (civEvents.loaded) {
      const newFilters = {
        ...activeFilters,
        virtualOnly: !activeFilters.virtualOnly,
      };
      navigateWithEventFilters(newFilters);
    }
  }
  
  return (
    <div className="VirtualEventToggle" >
      <div id="virtualToggleContents">
        <Switch onChange={handleChange} checked={activeFilters.virtualOnly}
          inputProps={{ "aria-label": "Toggle filtering by virtual events" }}
        />
        <img  src={"/Assets/map_icons/Virtual-Large.png"} alt={"Virtual icon"} 
          width="100%" height="100%"
        />
        <span>virtual only</span>
      </div>
    </div>
  );
}
