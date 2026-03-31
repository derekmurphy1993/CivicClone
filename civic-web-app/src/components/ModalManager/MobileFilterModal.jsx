import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState, useEffect } from "react";
import ReactGA from "react-ga";

import { AVAILABILITY_OPTIONS } from "../../constants/eventFilters";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";
import { GACategory, GAUserAction } from "../../types/analytics";
import EventTagInput from "../inputs/EventTagInput";

const DEFAULT_OPEN_STATE = {
  availability: false,
  eventType: false,
  eventTag: false,
};

export default function MobileFilterModal() {
  const [open, setOpen] = useState(DEFAULT_OPEN_STATE);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const { activeFilters, setModalsConfig } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  useEffect(() => {
    setSelectedTags(new Set(activeFilters.eventTags));
  }, [activeFilters]);

  useEffect(() => {
    const newFilters = {
      ...activeFilters,
      availability: availableTimes,
    };
    navigateWithEventFilters(newFilters);
  }, [availableTimes]);

  function clearTags() {
    const newFilters = {
      ...activeFilters,
      eventTags: [],
    };
    navigateWithEventFilters(newFilters);
  }

  function handleSelectTag(tag) {
    const newFilters = {
      ...activeFilters,
      eventTags: [...activeFilters.eventTags, tag],
    };
    navigateWithEventFilters(newFilters);
  }

  function handleUnselectTag(tag) {
    const newFilters = {
      ...activeFilters,
      eventTags: activeFilters.eventTags.filter(eventTag => eventTag !== tag),
    };
    navigateWithEventFilters(newFilters);
  }
  
  function toggleAvailabilityFilter() {
    setOpen(prevState => ({
      ...prevState,
      availability: !prevState.availability,
    }));
  }

  function toggleEventTypeFilter() {
    setOpen(prevState => ({
      ...prevState,
      eventType: !prevState.eventType,
    }));
  }

  function toggleTagFilter() {
    setOpen(prevState => ({
      ...prevState,
      eventTag: !prevState.eventTag,
    }));
  }

  function closeModal() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLOSE_MOBILE_FILTER_MODAL,
    });
    setModalsConfig(prevState => ({
      ...prevState,
      mobileFilter: {
        open: false,
      }
    }));
  }
  
  function handleSelectType(e, newSelectedType) {
    const newFilters = {
      ...activeFilters,
      eventTypes: [newSelectedType],
    };
    navigateWithEventFilters(newFilters);
  };

  function handleSelectAvailability(availableTimeCheckbox) {
    let newAvailableTimes;
    if (availableTimeCheckbox.target.checked) {
      newAvailableTimes = [...availableTimes, availableTimeCheckbox.target.value];
    } else {
      newAvailableTimes = availableTimes.filter(
        availableTime => availableTime !== availableTimeCheckbox.target.value);
    }
    setAvailableTimes(newAvailableTimes);
  }

  return (
    <div className="MobileFilter">
      <div id="mobileFilterHeader">
        <h2> Filter </h2>
        <button id="closeButton" onClick={closeModal}>
          {" "}
          <CloseIcon />{" "}
        </button>
      </div>

      <div className="mobileFiltersCollection">
        <button onClick={toggleAvailabilityFilter} className="mobileFilterButton">
          <p> I'm available </p>
          { open.availability ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
        </button>
        { open.availability && 
          <fieldset>
            {AVAILABILITY_OPTIONS.map(option => (
              <div>
                <input type="checkbox" className="dateRangeCheckbox"
                  value={option.value} onClick={handleSelectAvailability}
                />
                <label htmlFor={option.value} >{option.label}</label>
              </div>
            ))}
          </fieldset>
        }

        <button onClick={toggleEventTypeFilter} className="mobileFilterButton">
          <p> Event Types </p>
          { open.eventType ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
        </button>

        { open.eventType &&
          <div>
            <div id="mobileFilterTypes" >
              <ToggleButtonGroup
                value={activeFilters.eventTypes[0]}
                exclusive
                onChange={handleSelectType}
              >
                {Array.from(EVENT_TYPES).map(([eventType, eventTypeData]) =>
                  <ToggleButton value={eventType} id={eventType} key={eventType}>
                    <Avatar className="EventTypeAvatar">
                      <img src={eventTypeData.iconPath} alt={eventType}
                        width="100%" height="100%" />
                    </Avatar>
                    <span>{eventType}</span>
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </div>
          </div>
        }

        <button onClick={toggleTagFilter} className="mobileFilterButton"
          id="mobileFilterTagToggle"
        >
          <p> Tags </p>
          { open.eventTag ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
        </button>

        { open.eventTag &&         
          <EventTagInput clearTags={clearTags} handleSelectTag={handleSelectTag}
            handleUnselectTag={handleUnselectTag} selectedTags={selectedTags}
          />
        }
      </div>
    </div>
  );
}
