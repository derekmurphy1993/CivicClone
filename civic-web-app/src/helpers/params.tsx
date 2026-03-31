import { AVAILABILITY_OPTIONS } from "../constants/eventFilters";
import { AvailabilityBlock, EventFilters } from "../types/eventFilters";
import { EventType } from "../types/eventTypes";
import { SearchParams, SearchParamKey } from "../types/params";

/** Returns EventFilters based on search params to be used as activeFilters. */
export function getFiltersFromSearchParams(searchParams: URLSearchParams,
    eventTags: string[]): EventFilters {
  const datesParam = searchParams.get("dates");
  const tagsParam = searchParams.get("tags");
  const typesParam = searchParams.get("types");
  const searchParam = searchParams.get("search");
  const virtualParam = searchParams.get("virtualOnly");
  const selectedDates = datesParam ?
    getSelectedValuesFromParam<AvailabilityBlock>(
      datesParam, SearchParamKey.DATES, getValidDateRange
    ) : [];
  const selectedTags = tagsParam ?
    getSelectedValuesFromParam<string>(
      decodeURIComponent(tagsParam),
      SearchParamKey.TAGS,
      getValidEventTagFunction(eventTags)
    ) : [];    
  const selectedTypes = typesParam ?
    getSelectedValuesFromParam<EventType>(
      typesParam, SearchParamKey.TYPES, getValidEventType
    ) : [];
  const searchInput = searchParam ? decodeURIComponent(searchParam) : "";
  const virtualOnly = virtualParam === "true";

  return {
    availability: selectedDates,
    eventTags: selectedTags,
    eventTypes: selectedTypes,
    searchInput: searchInput,
    virtualOnly: virtualOnly,
  }
}

/** Returns search params object based on provided filters. */
export function getSearchParamsFromFilters(filters: EventFilters): SearchParams {
  const searchParams: SearchParams = {};
  if (filters.availability.length) {
    searchParams[SearchParamKey.DATES] = filters.availability.join(",");
  }
  if (filters.eventTags.length) {
    searchParams[SearchParamKey.TAGS] = filters.eventTags.map(
      tag => encodeURIComponent(tag)).join(",");
  }
  if (filters.eventTypes.length) {
    searchParams[SearchParamKey.TYPES] = filters.eventTypes.join(",");
  }
  if (filters.searchInput.length) {
    searchParams[SearchParamKey.SEARCH] = encodeURIComponent(filters.searchInput);
  }
  if (filters.virtualOnly) {
    searchParams[SearchParamKey.VIRTUAL] = String(filters.virtualOnly);
  }
  return searchParams;
}

/** Returns search params string to append to "/events?" based on filters. */
export function getSearchParamStringFromFilters(filters: EventFilters): string {
  const searchParams = getSearchParamsFromFilters(filters);
  let searchParamString = "";
  Object.entries(searchParams).forEach(([searchParamKey, selectedValues]) => {
    if (searchParamString.length) {
      searchParamString += "&";
    }
    searchParamString += `${searchParamKey}=${selectedValues}`;
  });
  return searchParamString;
}

/**
 * Get an array of valid string values from a comma-separated param string, e.g.
 * getSelectedValuesFromParam("Talks,Other,InvalidValue", SearchParamKey.TYPE)
 * will return ["Talks", "Other"].
 */
function getSelectedValuesFromParam<T>(param: string, paramType: SearchParamKey,
    getValidValue: (value: string) => T|undefined): T[] {
  const selectedValues: T[] = [];
  param.split(",").forEach(value => {
    const validValue = getValidValue(value);
    if (validValue) {
      selectedValues.push(validValue);
    } else {
      console.error(`Cannot filter by unknown ${paramType} ${value}. Skipping 
        ${paramType}.`);
    }
  });
  return selectedValues;
}

/** Returns the corresponding date range if applicable, else undefined. */
function getValidDateRange(value: string): AvailabilityBlock|undefined {
  const option = AVAILABILITY_OPTIONS.find(option => option.value === value);
  return option?.value;
}

/** Returns the corresponding event tag if applicable, else undefined. */
function getValidEventTagFunction(
    eventTags: string[]): (value: string) => string|undefined {
  return (value: string) => eventTags.find(tag => tag === value);
}

/** Returns the corresponding EventType if applicable, else undefined. */
function getValidEventType(value: string): EventType|undefined {
  const eventTypes = Object.keys(EventType).map(
    type => type as keyof typeof EventType);
  const validEventType = eventTypes.find(type => EventType[type] === value);
  return validEventType && EventType[validEventType];
}
