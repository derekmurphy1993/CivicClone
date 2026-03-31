import { useLocation, useNavigate } from "react-router-dom";
import { EventFilters } from "../../types/eventFilters";

import { getSearchParamStringFromFilters } from "../params";

export default function useNavigateWithEventFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  function navigateWithEventFilters(filters: EventFilters) {
    const searchParams = getSearchParamStringFromFilters(filters);
    const newLocation = `/events?${searchParams}`;
    if (newLocation !== location.pathname) {
      navigate(`/events?${searchParams}`);
    }
  }
  
  return (filters: EventFilters) => navigateWithEventFilters(filters);
}
