import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import EventTagChipBox from "./EventTagChipBox";
import SearchTextInput from "../SearchBar/SearchTextInput";
import { AppContext } from "../../constants/contexts";

interface EventTagInputProps {
  clearTags: () => void;
  handleSelectTag: (tag: string) => void;
  handleUnselectTag: (tag: string) => void;
  selectedTags: Set<string>;
}

export default function EventTagInput({ clearTags, handleSelectTag,
    handleUnselectTag, selectedTags }: EventTagInputProps) {
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [textInput, setTextInput] = useState("");
  const { civEvents } = useContext(AppContext);
  
  useEffect(() => {
    setFilteredTags(newFilteredTags);
  }, [selectedTags])

  useEffect(() => {
    setFilteredTags(newFilteredTags);
  }, [textInput])

  const newFilteredTags = useMemo(() => {
    return civEvents.loaded ?
      civEvents.tagsSortedByEventCount.filter(tag => matchesInput(tag)) :
      [];
  }, [civEvents])

  const matchesInput = useCallback((tag: string) => {
    return !selectedTags.has(tag) && tag.toLowerCase().includes(textInput);
  }, [textInput, selectedTags]);

  return (
    <div>
      <SearchTextInput value={textInput} setValue={setTextInput} showIcon={false}
        sx={{ marginBottom: "10px" }}
      />
      { selectedTags.size > 0 && (
        <EventTagChipBox tags={Array.from(selectedTags)} isDeselect={true}
          clearTags={clearTags} handleTagClick={handleUnselectTag}
          containerSx={{ marginBottom: "8px" }}
        />
      )}
      <EventTagChipBox tags={filteredTags} handleTagClick={handleSelectTag}
        containerSx={{
          maxHeight: "125px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
