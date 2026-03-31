import SearchIcon from "@mui/icons-material/Search";
import { ClickAwayListener, Grid, GridSize, Paper, Popper } from "@mui/material";
import { useCallback, useContext, useEffect, useState, useRef, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

import SearchTextInput from "./SearchTextInput";
import ZipCodeTextInput from "./ZipCodeTextInput";
import EventTagList from "../inputs/EventTagList";
import { AppContext } from "../../constants/contexts";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";

interface SearchBarProps {
  filteredTags: string[];
  setFilteredTags: Dispatch<SetStateAction<string[]>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ filteredTags, setFilteredTags, searchInput,
    setSearchInput }: SearchBarProps) {
  const [zipCode, setZipCode] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const { activeFilters, civEvents, isMobile } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();
  const location = useLocation();
  const popperRef = useRef(null);

  useEffect(() => {
    if (civEvents.tagsSortedByEventCount.length) {
      setFilteredTags(civEvents.tagsSortedByEventCount);
    }
  }, [civEvents]);

  useEffect(() => {
    filterTags(searchInput);
  }, [searchInput])

  const filterTags = useCallback((searchInput: string) => {
    if (civEvents.loaded) {
      setFilteredTags(
        civEvents.tagsSortedByEventCount.filter(
          tag => tag.toLowerCase().includes(searchInput.toLowerCase())));
    }
  }, [civEvents]);

  const runSearch = useCallback(() => {
    const newFilters = {
      ...activeFilters,
      searchInput: searchInput,
    };
    closePopper();
    navigateWithEventFilters(newFilters);
  }, [activeFilters, searchInput]);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      runSearch();
    }
  }

  function closePopper() {
    setPopperOpen(false);
    setAnchorEl(null);
  }

  function openPopper() {
    setAnchorEl(popperRef.current);
    setPopperOpen(true);
  };

  function getTemplate() {
    if (location.pathname === "/") {
      return (
        <Grid container onKeyDown={handleKeyDown}
          sx={{ justifyContent: "space-between"  }}
        >
          <Grid item xs={5.8 as GridSize}>
            <SearchTextInput value={searchInput} setValue={setSearchInput}
              showIcon={true} sx={{}}
            />
          </Grid>
          <Grid item xs={5.8 as GridSize}>
            <ZipCodeTextInput value={zipCode} setValue={setZipCode} 
              showIcon={true} sx={{}}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container onKeyDown={handleKeyDown}>
          <ClickAwayListener onClickAway={closePopper}>
            <Grid item xs={5.5 as GridSize} ref={popperRef}>
              <SearchTextInput value={searchInput} setValue={setSearchInput}
                onFocus={openPopper} onClick={openPopper}
                showIcon={false} sx={{
                borderRadius: "5px 0 0 5px",
                borderWidth: "1.75px 0 1.75px 1.75px",
                borderColor: "#C3DFDD",
              }}/>
              <Popper open={popperOpen} anchorEl={anchorEl} placement="bottom-start"
                disablePortal
                style={{ width: (isMobile ? "50vw" : "20vw"), zIndex: 10, }}
                >
                <EventTagList tags={filteredTags} onTagClick={closePopper} />
              </Popper>
            </Grid>
          </ClickAwayListener>
          <Grid item xs={5.5 as GridSize}>
            <ZipCodeTextInput value={zipCode} setValue={setZipCode} 
              showIcon={false} sx={{
              borderRadius: "0",
            }}/>
          </Grid>
          <Grid item xs={1 as GridSize}>
            <Paper sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              border: "0 solid #C3DFDD",
              borderRadius: "0 5px 5px 0",
              borderWidth: "1.75px 1.75px 1.75px 0",
              boxSizing: "border-box",
              color: "var(--primary-lightgray)",
            }}>
              <SearchIcon onClick={runSearch} sx={{ cursor: "pointer" }} />
            </Paper>
          </Grid>
        </Grid>
      );
    }
  }

  return getTemplate();
}
