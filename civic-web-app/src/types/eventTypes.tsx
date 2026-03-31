/** Type categories of CivEvents. */
export enum EventType {
  CAMPAIGNS = "Campaigns",
  COMMUNITY = "Community",
  DEMONSTRATIONS = "Demonstrations",
  GOVERNMENT = "Government",
  TALKS = "Talks",
  VOLUNTEERING = "Volunteering",
  VOTING = "Voting",
  OTHER = "Other",
}

/** Metadata about an event type. */
export interface EventTypeData {
  description: string;
  iconPath: string;
}
