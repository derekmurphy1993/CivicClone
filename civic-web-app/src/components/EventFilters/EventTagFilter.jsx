import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useContext } from "react";

import EventTagFilterPopper from "./EventTagFilterPopper";
import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";

/** Contains text input with autocomplete functionality to select tags.  */
export default function EventTagFilter() {
  const [isTagSelectOpen, setIsTagSelectOpen] = useState(false);
  const [unselectedTags, setUnselectedTags] = useState([]);
  const [tagUserInput, setTagUserInput] = useState("");
  const [selectedTagsLabel, setSelectedTagsLabel] = useState("");
  const { activeFilters, civEvents } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  useEffect(() => {
    const newUnselectedTags = civEvents.tagsSortedByEventCount.filter(
      tag => !activeFilters.eventTags.includes(tag));
    setUnselectedTags(newUnselectedTags);
    setSelectedTagsLabel(activeFilters.eventTags.join(", "));
  }, [activeFilters, civEvents])

  function handleSelectTag(e, selectedTag) {
    if (selectedTag) {
      const newFilters = {
        ...activeFilters,
        eventTags: [...activeFilters.eventTags, selectedTag],
      };
      navigateWithEventFilters(newFilters);
    }
    setTagUserInput("");
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

  function handleTagUserInputChange(e) {
    // value is used if the change is from the user typing in the input field.
    // textContent is used if user clicks on a tag option from the dropdown.
    const userInput = e?.target?.value || e?.target?.textContent;
    if (userInput) {
      setTagUserInput(userInput);
    } else {
      setTagUserInput("");
    }
  }

  return (
    <FormControl sx={{ width: "50%" }} id="tagFilterFormControl"
      onClick={() => setIsTagSelectOpen(true)}>
      <Autocomplete
        className="eventFilterDropdown"
        PopperComponent={EventTagFilterPopper}
        size="small"
        disableCloseOnSelect={false}
        options={unselectedTags}
        onChange={handleSelectTag}
        open={isTagSelectOpen}
        onOpen={() => setIsTagSelectOpen(true)}
        onClose={() => setIsTagSelectOpen(false)}
        inputValue={tagUserInput}
        onInputChange={handleTagUserInputChange}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search for causes"
            label={ isTagSelectOpen ? "Tags" : selectedTagsLabel }
          />
        )}
        sx={{
          borderRadius: 3,
          overflow: isTagSelectOpen ? "" : "hidden",
        }}
      />
    </FormControl>
  );
}
