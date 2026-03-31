import ReactGA from "react-ga";

import { getDateInfo, convertToUtcString } from "./datetime";
import icons from "../icons/IconModule";
import { GACategory, GAUserAction } from "../types/analytics";
import { CivEvent, CivEvents, CmsEvent } from "../types/civEvents";
import { EventFilters, AvailabilityBlock } from "../types/eventFilters";
import { EventType } from "../types/eventTypes";

/** Convert event data from CMS object to CivEvent object. */
export function getCivEventFromCmsEvent(
  cmsEvent: CmsEvent
): CivEvent | undefined {
  if (isValid(cmsEvent)) {
    return convertCmsToCivEvent(cmsEvent);
  } else {
    console.error("Failed to load event from backend.");
  }
}

/** Convert all event data from CMS objects to CivEvent objects. */
export function getCivEventsFromCmsEvents(cmsEvents: CmsEvent[]): CivEvents {
  const civEventsById: { [id: string]: CivEvent } = {};
  const mapEventTagToIds = new Map<string, Set<string>>();
  const mapEventSlugToId = new Map<string, string>();

  cmsEvents.forEach((cmsEvent) => {
    if (!isValid(cmsEvent)) {
      return;
    }
    const civEvent = convertCmsToCivEvent(cmsEvent);
    civEventsById[civEvent.id] = civEvent;
    civEvent.tags.forEach((tag) => {
      // Skip the tag NYC while we are operating only in NYC.
      if (tag === "NYC") {
        return;
      }
      if (!mapEventTagToIds.has(tag)) {
        mapEventTagToIds.set(tag, new Set());
      }
      mapEventTagToIds.get(tag)!.add(civEvent.id);
    });
    mapEventSlugToId.set(civEvent.slug, civEvent.id);
  });

  return {
    byId: civEventsById,
    loaded: true,
    slugToId: mapEventSlugToId,
    tagsSortedByEventCount: getSortedEventTags(mapEventTagToIds),
    tagToIds: mapEventTagToIds,
  };
}

/** Returns array of civEvents filtered according to filters parameter. */
export function getFilteredEvents(civEvents: CivEvents,
    filters: EventFilters): CivEvent[] {
  recordGAFilterEvents(filters);
  const allEvents: CivEvent[] = Object.values(civEvents.byId);
  const eventsByPriority: Array<Set<CivEvent>> = [new Set(), new Set()];
  const eventsMatchingFilters = new Set<CivEvent>();
  
  allEvents.forEach((civEvent) => {
    // Filters are ordered here from least to most computationally expensive.
    if (filters.virtualOnly && !civEvent.isVirtual) {
      return;
    }
    if (filters.eventTypes.length && !filters.eventTypes.includes(civEvent.type)) {
      return;
    }
    if (filters.eventTags.length && !filters.eventTags.some(
        (tag: string) => civEvents.tagToIds.get(tag)?.has(civEvent.id))) {
      return;
    }
    if (filters.searchInput) {
      const score = getRelevanceScore(filters.searchInput, civEvent);
      if (score > 0) {
        if (!eventsByPriority[score]) {
          eventsByPriority[score] = new Set<CivEvent>();
        }
        eventsByPriority[score].add(civEvent);
      } else {
        return;
      }
    }
    if (filters.availability.length && !isEventMatchingAvailability(
        civEvent, filters.availability)) {
      return;
    }
    eventsMatchingFilters.add(civEvent);
  });
  
  if (filters.searchInput) {
    let sortedEvents: CivEvent[] = [];
    eventsByPriority.reverse().forEach((eventSet: Set<CivEvent>) => {
      sortedEvents = [...sortedEvents, ...Array.from(eventSet)];
    })
    return sortedEvents;
  } else {
    return Array.from(eventsMatchingFilters);
  }
}

/** Returns true if civEvent occurs over multiple days. */
export function isMultiDay(civEvent: CivEvent): boolean {
  if (!civEvent.end) {
    return false;
  }
  return civEvent.start.readable.date !== civEvent.end.readable.date;
}

/** Convert an event object from the CMS to a CivEvent object. */
function convertCmsToCivEvent(cmsEvent: CmsEvent): CivEvent {
  const errorIdentifier = cmsEvent.attributes.fields.title || cmsEvent.id;
  const cmsEndDate = cmsEvent.attributes.fields["end-date"];
  let endDateInfo;
  if (cmsEndDate) {
    endDateInfo = getDateInfo(cmsEndDate);
  }
  const tags = cmsEvent.attributes.fields.categories
    ? getFormattedTags(cmsEvent.attributes.fields.categories)
    : [];
  // Use default cover image if cmsEvent lacks one.
  const coverImageUrl =
    cmsEvent.attributes.fields.coverasset?.url || icons.CoverDefault;
  const slug =
    slugify(cmsEvent.attributes.fields.title) +
    "-" +
    cmsEvent.id.substring(0, 5);
  let virtual = false;
  if (cmsEvent.attributes.fields["is-virtual"]) {
    virtual = cmsEvent.attributes.fields["is-virtual"] === "true";
  }

  return {
    id: cmsEvent.id,
    title: cmsEvent.attributes.fields.title,
    slug: slug,
    isVirtual: virtual,
    errorIdentifier: errorIdentifier,
    description: cmsEvent.attributes.fields.bio,
    lat: cmsEvent.attributes.fields.lat,
    lng: cmsEvent.attributes.fields.long,
    start: getDateInfo(cmsEvent.attributes.fields.start),
    end: endDateInfo,
    type: cmsEvent.attributes.fields["event-type"],
    tags: tags,
    coverImageUrl: coverImageUrl,
    address: cmsEvent.attributes.fields.address,
    hostName: cmsEvent.attributes.fields["metadata-custom-host-name"],
    hostUrl: cmsEvent.attributes.fields.hostUrl,
    externalLink: cmsEvent.attributes.fields["event-link"],
  };
}

/** Returns a number indicating how relevant a CivEvent is to searchInput. */
function getRelevanceScore(searchInput: string, civEvent: CivEvent) {
  const searchWords = searchInput.split(" ")
      .filter(word => word.trim() !== "")
      .map(word => word.toLowerCase());
  let score = 0;
  searchWords.forEach(word => {
    if (civEvent.title.toLowerCase().includes(word)) {
      score += 1;
    }
  })
  return score;
}

/** Returns an array of event tags sorted by corresponding event count. */
function getSortedEventTags(tagToIds: Map<string, Set<string>>): string[] {
  return [...tagToIds.entries()]
    .sort((entryA, entryB) => {
      const [tagA, eventIdsSetA] = entryA;
      const [tagB, eventIdsSetB] = entryB;
      return eventIdsSetB.size - eventIdsSetA.size;
    })
    .map(([tag, eventIdsSet]) => tag);
}

/** Transforms comma-separated string of tags into array of formatted tags. */
function getFormattedTags(tags: string): string[] {
  const formattedTags: string[] = [];
  tags
    .trim()
    .split(",")
    .forEach((tag) => {
      // Skip empty strings.
      if (tag) {
        const formattedTag = tag
          .trim()
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
        formattedTags.push(formattedTag);
      }
    });
  return formattedTags;
}

/** Returns true if civEvent falls within availability block. */
function isEventMatchingAvailability(
  civEvent: CivEvent,
  availability: AvailabilityBlock[]
): boolean {
  const today = new Date();

  for (const availableBlock of availability) {
    // The number of days difference between today and the start or end
    // of the availability window.
    let startDelta = 0;
    let endDelta = 0;
    // Start from today.
    const availableStartDate = new Date(today.getTime());
    const availableEndDate = new Date(today.getTime());
    switch (availableBlock) {
      case AvailabilityBlock.TODAY:
        break;
      case AvailabilityBlock.THIS_WEEK:
        // Monday-Friday of the current or upcoming week.
        if (today.getDay() === 6) {
          endDelta = 6;
        } else {
          endDelta = 5 - today.getDay();
        }
        break;
      case AvailabilityBlock.THIS_WEEKEND:
        // Friday-Sunday of the current or upcoming weekend.
        if (today.getDay() === 0) {
          startDelta = -2;
          endDelta = 0;
        } else if (today.getDay() === 6) {
          startDelta = -1;
          endDelta = 1;
        } else {
          startDelta = 5 - today.getDay();
          endDelta = 7 - today.getDay();
        }
        break;
      case AvailabilityBlock.NEXT_WEEK:
        // Monday-Friday of the week after the current or upcoming week.
        if (today.getDay() === 6) {
          startDelta = 9;
        } else {
          startDelta = 8 - today.getDay();
        }
        endDelta = startDelta + 4;
        break;
      case AvailabilityBlock.NEXT_WEEKEND:
        // Friday-Sunday of the weekend after the current or upcoming weekend.
        if (today.getDay() === 6) {
          startDelta = 6;
        } else if (today.getDay() === 0) {
          startDelta = 5;
        } else {
          startDelta = 12 - today.getDay();
        }
        endDelta = startDelta + 2;
        break;
      default:
        console.error(
          `Encountered unspecified availableBlock ${availableBlock}`
        );
        continue;
    }
    availableStartDate.setDate(today.getDate() + startDelta);
    availableEndDate.setDate(today.getDate() + endDelta);
    availableStartDate.setHours(0);
    availableEndDate.setHours(23);

    if (
      civEvent.start.date >= availableStartDate &&
      civEvent.start.date <= availableEndDate
    ) {
      return true;
    }
    if (
      civEvent.end &&
      civEvent.end.date >= availableStartDate &&
      civEvent.end.date <= availableEndDate
    ) {
      return true;
    }
  }
  return false;
}

/** Returns true if event can be converted to CivEvent, otherwise logs error. */
function isValid(cmsEvent: CmsEvent): boolean {
  // Skip events without a start date.
  if (!cmsEvent?.attributes?.fields?.start) {
    console.error(
      `Event ${cmsEvent.attributes?.fields?.title || cmsEvent.id} is missing a
      start date. Event will not appear in app.`
    );
    return false;
  }
  // Skip events that have passed. Use end date if present. Otherwise assume one
  // day from start date.
  const now = new Date();
  let compareDate;
  if (cmsEvent.attributes.fields["end-date"]) {
    compareDate = new Date(
      convertToUtcString(cmsEvent.attributes.fields["end-date"])
    );
  } else {
    const startDate = new Date(
      convertToUtcString(cmsEvent.attributes.fields.start)
    );
    compareDate = new Date(startDate);
    compareDate.setDate(startDate.getDate() + 1);
  }
  if (compareDate < now) {
    return false;
  }
  return true;
}

function recordGAFilterEvents(filters: EventFilters) {
  if (filters.availability.length) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.FILTER_BY_DATES,
      label: filters.availability.join(", "),
    });
  }
  if (filters.eventTags.length) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.FILTER_BY_TAGS,
      label: filters.eventTags.join(", "),
    });
  }
  if (filters.eventTypes.length) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.FILTER_BY_TYPES,
      label: filters.eventTypes.join(", "),
    });
  }
  if (filters.searchInput) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.FILTER_BY_SEARCH_INPUT,
      label: filters.searchInput,
    });
  }
  if (filters.virtualOnly) {
    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.FILTER_BY_VIRTUAL_ONLY,
    });
  }
}

/**
 * Returns unique slug, i.e. URL-compatible lowercase string. For example:
 *  "2022-summer-human-rights-institute-6e8ee"
 */
function slugify(title: string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
