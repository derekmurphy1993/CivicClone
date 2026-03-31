import { EventType, EventTypeData } from '../types/eventTypes';

export const EVENT_TYPES: Map<EventType, EventTypeData> = new Map([
  [EventType.COMMUNITY, {
    iconPath: "/Assets/map_icons/Community-Large.png",
    description: "Social events for a cause, such as a picnic, marathon, or meet up.",      
  }],
  [EventType.GOVERNMENT, {
    iconPath: "/Assets/map_icons/Government-Large.png",
    description: "Official government events, such as a city council hearing.",      
  }],
  [EventType.VOTING, {
    iconPath: "/Assets/map_icons/Voting-Large.png",
    description: "Events related to voting, such as a registration drive or a " +
    "polling place during an election.",      
  }],
  [EventType.DEMONSTRATIONS, {
    iconPath: "/Assets/map_icons/Demonstrations-Large.png",
    description: "Demonstration events, such as protests, marches, etc.",      
  }],
  [EventType.TALKS, {
    iconPath: "/Assets/map_icons/Talks-Large.png",
    description: "Talks and speaking events.",      
  }],
  [EventType.VOLUNTEERING, {
    iconPath: "/Assets/map_icons/Volunteering-Large.png",
    description: "Volunteering events and opportunities.",      
  }],
  [EventType.CAMPAIGNS, {
    iconPath: "/Assets/map_icons/Campaigns-Large.png",
    description: "Campaign events like a political campaign rally, or canvassing " +
      "for a cause or candidate.",      
  }],
  [EventType.OTHER, {
    iconPath: "/Assets/map_icons/Other-Large.png",
    description: "All other event types.",      
  }],
]);
