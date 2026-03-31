import axios from "axios";
import { MOCK_CMS_EVENTS } from "../constants/mockCmsEvents";
import { getCivEventFromCmsEvent, getCivEventsFromCmsEvents } from "./civEvents";
import { CivEvent, CivEvents, CmsEvent } from "../types/civEvents";

function shouldUseMockBackend(): boolean {
  return process.env.REACT_APP_USE_MOCK_BACKEND !== "false";
}

function getMockEventById(eventId: string): CmsEvent | undefined {
  return MOCK_CMS_EVENTS.find((event) => event.id === eventId);
}

/** Fetches all event data and calls argument functions with processed data. */
export async function fetchEvents(): Promise<CivEvents> {
  if (shouldUseMockBackend()) {
    return getCivEventsFromCmsEvents(MOCK_CMS_EVENTS);
  }

  try {
    return await axios.get(`${process.env.REACT_APP_PROXY}`).then(
      cmsResponse => getCivEventsFromCmsEvents(cmsResponse.data.data));
  } catch (error) {
    console.warn("Backend unavailable, using mock events instead.", error);
    return getCivEventsFromCmsEvents(MOCK_CMS_EVENTS);
  }
}

/** Fetches data for single event. */
export async function fetchEvent(eventId: string): Promise<CivEvent|undefined> {
  if (shouldUseMockBackend()) {
    const mockCmsEvent = getMockEventById(eventId);
    if (!mockCmsEvent) {
      return undefined;
    }
    return getCivEventFromCmsEvent(mockCmsEvent);
  }

  try {
    return await axios.get(`${process.env.REACT_APP_PROXY}` + "/" + eventId).then(
      cmsResponse => getCivEventFromCmsEvent(cmsResponse.data.data[0]));
  } catch (error) {
    console.warn("Backend unavailable, using mock event instead.", error);
    const mockCmsEvent = getMockEventById(eventId);
    if (!mockCmsEvent) {
      return undefined;
    }
    return getCivEventFromCmsEvent(mockCmsEvent);
  }
}
