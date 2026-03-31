import { getReadableDate } from "../helpers/datetime";
import icons from "../icons/IconModule";
import { CivEvent, CivEvents } from "../types/civEvents";
import { EventType } from "../types/eventTypes";

export const DEFAULT_CIV_EVENTS: CivEvents = {
  byId: {},
  loaded: false,
  slugToId: new Map(),
  tagsSortedByEventCount: [],
  tagToIds: new Map(),
};

export const DEFAULT_CIV_EVENT: CivEvent = {
  id: "",
  title: "",
  slug: "",
  isVirtual: false,
  errorIdentifier: "",
  start: {
    date: new Date(),
    readable: getReadableDate(new Date()),
  },
  type: EventType.OTHER,
  tags: [],
  coverImageUrl: icons.CoverDefault,
}
