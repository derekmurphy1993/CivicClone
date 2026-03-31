import { Avatar, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useHover } from "usehooks-ts";

import { EVENT_TYPES } from "../../constants/eventTypes";

export function EventTypeOption({ eventType, isSelected, handleClickTypeOption,
    iconPath, positionIdx, setTypeInFocus }) {
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  useEffect(() => {
    setTypeInFocus(isHovered ? eventType : "");
  }, [isHovered]);

  return (
    <Box className="EventTypeOption" ref={hoverRef} 
      sx={{
        position: "relative",
        left: `${(EVENT_TYPES.size - 1 - positionIdx)*-10}px`,
      }}
    >
      <Avatar className="EventTypeAvatar"
        id={isSelected ? "selectedEventType" : "unselectedEventType"}
        sx={{ height: "35px", width: "35px"}}
      >
        <img src={iconPath} alt={eventType} width="100%" height="100%"
          onClick={() => handleClickTypeOption(eventType)} />
      </Avatar>
    </Box>
  );
}
