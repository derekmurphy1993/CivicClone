import { AvailabilityBlock } from "../types/eventFilters";

export const AVAILABILITY_OPTIONS = [
 {
   label: "Today",
   value: AvailabilityBlock.TODAY,
 }, 
 {
   label: "This Week",
   value: AvailabilityBlock.THIS_WEEK,
 }, 
 {
   label: "This Weekend",
   value: AvailabilityBlock.THIS_WEEKEND,
 }, 
 {
   label: "Next Week",
   value: AvailabilityBlock.NEXT_WEEK,
 }, 
 {
   label: "Next Weekend",
   value: AvailabilityBlock.NEXT_WEEKEND,
 }, 
]

export const DEFAULT_EVENT_FILTER_STATE = {
  availability: [],
  eventTags: [],
  eventTypes: [],
  virtualOnly: false,
  searchInput: "",
};
