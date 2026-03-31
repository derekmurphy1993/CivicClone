import { EventType } from "./eventTypes";
import { DateInfo } from "./datetime";

/** The primary object type using in the Event portions of the app. */
export interface CivEvent {
  id: string;
  title: string;
  // Unique human-readable identifier based on title.
  slug: string;
  isVirtual?: Boolean;
  // Title if present, otherwise ID.
  errorIdentifier: string;
  description?: string;
  lat?: number;
  lng?: number;
  // JS Date objects and readable date strings for start, and end if applicable.
  start: DateInfo;
  end?: DateInfo;
  type: EventType;
  tags: string[];
  coverImageUrl: string;
  // The physical location of the event.
  address?: string;
  // The organization or person hosting the event.
  hostName?: string;
  // Link to website of the host.
  hostUrl?: string;
  externalLink?: string;
}

export interface CivEvents {
  byId: {
    [id: string]: CivEvent;  
  };
  loaded: boolean;
  slugToId: Map<string, string>;
  tagsSortedByEventCount: string[];
  tagToIds: Map<string, Set<string>>;
}

/** The format of the civEvent data coming from the CMS. */
export interface CmsEvent {
  id: string;
  attributes: {
    fields: {
      title: string;
      address?: string,
      bio?: string,
      start: string;
      "end-date"?: string;
      "is-virtual"?: string;
      categories?: string;
      lat?: number;
      long?: number;
      "event-link"?: string;
      "event-type": EventType;
      "metadata-custom-host-name"?: string;
      hostUrl?: string;
      coverasset?: {
        url?: string;
      }
    }
  }
}
