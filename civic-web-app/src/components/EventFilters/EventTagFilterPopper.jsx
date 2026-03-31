import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { useContext } from "react";

import EventTagChipBox from "../inputs/EventTagChipBox";
import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";

export default function EventTagFilterPopper(props) {
  const { activeFilters } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  function clearTags() {
    const newFilters = {
      ...activeFilters,
      eventTags: [],
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

  return (
    <Popper {...props} placement="bottom-start"  style={{
      backgroundColor: "white",
      position: "absolute",
      width: "250px",
    }}>
      <Box onMouseDown={e => e.preventDefault()}>
        { activeFilters.eventTags.length > 0 && (
          <EventTagChipBox tags={activeFilters.eventTags} isDeselect={true}
            size="small" spacing={0.2} handleTagClick={handleUnselectTag}
            clearTags={clearTags}
          />
        )}
        {props.children}
      </Box>
    </Popper>
  );
}
