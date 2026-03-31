import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid, Tooltip } from "@mui/material";
import React, { useState } from "react";

import { EventTypeDescriptions } from "./EventTypeDescriptions";
import { EventTypeOption } from "./EventTypeOption";
import { EVENT_TYPES } from "../../constants/eventTypes";
import "./EventTypeInput.css";

/* Filters events by event type. */
export default function EventTypeInput({ selectedTypes, setSelectedTypes,
    multiple }) {
  const [typeInFocus, setTypeInFocus] =  useState(null);

  function handleClickTypeOption(type) {
    if (multiple) {
      const typeIdx = selectedTypes.indexOf(type);
      if (typeIdx >= 0) {
        setSelectedTypes(selectedTypes
          .slice(0, typeIdx)
          .concat(selectedTypes.slice(typeIdx + 1)));
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    } else if (type !== selectedTypes[0]) {
      setSelectedTypes([type])
    }
  }

  function clearTypeFilter() {
    setSelectedTypes([]);
  }

  return (
    <Grid container className="EventTypeFilter"
      sx={{ minWidth: "250px", width: "250px", height: "100%" }}
      alignItems="flex-start" direction="column"
    >
      <Grid item>
        <p className="eventTypeFilterTitle">
          Event Types
          <Tooltip placement="bottom-start" title={
            <React.Fragment>
              <EventTypeDescriptions />
            </React.Fragment>
          }> 
            <HelpOutlineIcon sx={{
              color: "var(--primary-lightgray)",
              fontSize: "20px",
              marginLeft: "5px",
              position: "relative",
              top: "5px",
            }}/>
          </Tooltip>
          { selectedTypes.length > 0 && (
            <span className="clearText" onClick={clearTypeFilter}>
              [clear]
            </span>
          )}
        </p>
      </Grid>
      <Grid item>
        <div className="eventTypeOptions">
          {Array.from(EVENT_TYPES).reverse().map(
            ([eventType, eventTypeData], idx) => (
              <EventTypeOption key={eventType} eventType={eventType}
                isSelected={selectedTypes.includes(eventType)}
                iconPath={eventTypeData.iconPath} positionIdx={idx}
                setTypeInFocus={setTypeInFocus}
                handleClickTypeOption={handleClickTypeOption}
              />
            )
          )}
        </div>
      </Grid>
      <Grid item className="eventTypeText" sx={{ textAlign: "left" }}>
        { typeInFocus && (
          <p>{ typeInFocus }</p>
        )}
      </Grid>
    </Grid>
  );
}
