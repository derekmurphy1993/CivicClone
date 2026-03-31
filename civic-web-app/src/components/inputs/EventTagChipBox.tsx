import { Chip, Grid } from "@mui/material";
import ReactGA from "react-ga";

import { GACategory, GAUserAction } from "../../types/analytics";
import "./EventTagChipBox.css";

interface EventTagChipBoxProps {
  tags: string[];
  handleTagClick: (tag: string) => void;
  isDeselect?: boolean;
  // Must be present if isDeselect is true.
  clearTags?: () => void;
  size?: "small"|"medium";
  spacing?: number;
  sx?: {[cssKey: string]: any};
  containerSx?: {[cssKey: string]: any};
}

export default function EventTagChipBox({ tags, handleTagClick, isDeselect,
    clearTags, size, spacing, sx, containerSx }: EventTagChipBoxProps) {

  function clearSelectedTags() {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.CLEAR_SELECTED_TAGS,
    });
    clearTags && clearTags();
  }

  function getSpacing() {
    return spacing === undefined ? 1 : spacing;
  }

  return (
      <Grid container className="EventTagChipBox" spacing={getSpacing()} sx={{
        ...containerSx,
        width: "100%",
      }}>
        { isDeselect && (
          <Grid item>
            <Chip onDelete={clearSelectedTags} onClick={clearSelectedTags}
              label="Clear Tags" size={size}
              sx={{
                color: "#D79999",
                backgroundColor: "#460000",
                '&:hover': { backgroundColor: "#890000" }
              }}
            />
          </Grid>
        )}
        {tags.map(tag => (
          <Grid item key={tag}>
            <Chip id="tagChip" size={size}
              // Set empty onDelete to display x icon for deselect box.
              {...(isDeselect ? { onDelete: () => {} } : {})}
              label={tag} onMouseDown={() => handleTagClick(tag)}  sx={{
                backgroundColor:
                  isDeselect ? "var(--primary-main)" : "var(--primary-pressed)",
                color: isDeselect ? "var(--primary-darkestgray)" : "white",
                ...sx
              }}
            />
          </Grid>
        ))}
      </Grid>
  );
}
