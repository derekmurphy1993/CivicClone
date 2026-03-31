import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { DEFAULT_EVENT_FILTER_STATE } from "../../constants/eventFilters";

import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";
import { EventFilters } from "../../types/eventFilters";

interface EventTagListProps {
  tags: string[];
  onTagClick?: () => void;
}

type LIMouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;

export default function EventTagList({ tags, onTagClick }: EventTagListProps) {
  const navigateWithEventFilters = useNavigateWithEventFilters();

  function handleTagClick(e: LIMouseEvent, tag: string) {
    const newFilters: EventFilters = {
      ...DEFAULT_EVENT_FILTER_STATE,
      eventTags: [tag],
    }
    navigateWithEventFilters(newFilters);
    onTagClick && onTagClick();
  }

  return (
    <List sx={{
      backgroundColor: "var(--primary-surface)",
      zIndex: 10,
    }}>
      { tags.map(tag => (
        <ListItem key={tag} onClick={e => handleTagClick(e, tag)} sx={{
          cursor: "pointer",
        }}>
          <ListItemText primary={tag} />
        </ListItem>
      ))}
    </List>
  )
}
