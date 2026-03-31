import { EventType } from './eventTypes';

export enum AvailabilityBlock {
  TODAY = "TODAY",
  THIS_WEEK = "THIS_WEEK",
  THIS_WEEKEND = "THIS_WEEKEND",
  NEXT_WEEK = "NEXT_WEEK",
  NEXT_WEEKEND = "NEXT_WEEKEND",
}

export interface EventFilters {
  availability: AvailabilityBlock[];
  eventTags: string[],
  eventTypes: EventType[],
  virtualOnly: boolean,
  searchInput: string
}
