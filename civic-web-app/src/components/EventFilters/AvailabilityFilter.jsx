import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";

import { AppContext } from "../../constants/contexts";
import { AVAILABILITY_OPTIONS } from "../../constants/eventFilters";
import useNavigateWithEventFilters from "../../helpers/customHooks/useNavigateWithEventFilters";

export default function AvailabilityFilter() {
  const { activeFilters } = useContext(AppContext);
  const navigateWithEventFilters = useNavigateWithEventFilters();

  function handleSelectAvailability(e) {
    const newAvailableTimes = e.target.value;
    const newFilters = {
      ...activeFilters,
      availability: newAvailableTimes,
    };
    navigateWithEventFilters(newFilters);
  }

  return (
    <FormControl sx={{ width: "47%" }}>
      <InputLabel id="availabilityFilterLabel">Availablity</InputLabel>
      <Select
        className="eventFilterDropdown"
        labelId="availabilityFilterLabel"
        id="availabilityFilterSelect"
        onChange={handleSelectAvailability}
        multiple
        label="Availablity"
        value={activeFilters.availability}
        sx={{
          borderRadius: 3,
        }}
      >
        {AVAILABILITY_OPTIONS.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
