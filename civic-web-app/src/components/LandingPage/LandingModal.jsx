import { Grid } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import EventTagChipBox from "../inputs/EventTagChipBox";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";
import { DEFAULT_EVENT_FILTER_STATE } from "../../constants/eventFilters";

export default function LandingModal() {
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigateWithEventFilters = useNavigateWithEventFilters();

  function handleTagClick(tag) {
    const newFilters = {
      ...DEFAULT_EVENT_FILTER_STATE,
      eventTags: [tag],
    }
    navigateWithEventFilters(newFilters);
  }

  function handleSearchClick() {
    const newFilters = {
      ...DEFAULT_EVENT_FILTER_STATE,
      searchInput: searchInput,
    }
    navigateWithEventFilters(newFilters);
  }

  return (
    <Grid container id="LandingModal" sx={{
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "40%",
    }}>
      <Grid item xs={12}>
        <p id="landingModalTitle">Find events near you</p>
      </Grid>
      <Grid container item xs={12} justifyContent="space-between" sx={{
        height: "45px",
        margin: "0 0 15px 0",
      }}>
        <SearchBar filteredTags={filteredTags} setFilteredTags={setFilteredTags}
          searchInput={searchInput} setSearchInput={setSearchInput}
        />
      </Grid>
      <Grid item className="filteredTagsContainer" xs={12} sx={{
        height: "125px",
        padding: "10px 0 0 0",
        width: "90%",
        overflow: "hidden"
      }}>
        <EventTagChipBox tags={filteredTags} handleTagClick={handleTagClick} />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/explore`} style={{ textDecoration: "none"}}>
          <button id="exploreMoreButton">
            <p id="exploreMore">Explore more...</p>
          </button>
        </Link>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSearchClick} id="searchButton">
          <p>Search</p>
        </button>
      </Grid>
    </Grid>
  );
}
