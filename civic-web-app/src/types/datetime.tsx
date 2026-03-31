/** Readable strings for date and time for a Date object.  */
export interface ReadableDate {
  // For example: "MON JUN 9". Month and day of week are always 3 characters.
  date: string;
  // For example: "8:15 PM"
  time: string;
  // For example: "MON JUN 9 • 8:15 PM"
  full: string;
}

/** All data needed for an event date, either start or end. */
export interface DateInfo {
  // JS Date object representing date.
  date: Date,
  // All needed readable date strings.
  readable: ReadableDate,
}
