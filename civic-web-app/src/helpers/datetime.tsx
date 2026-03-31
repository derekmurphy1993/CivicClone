import { MONTHS, WEEKDAYS } from '../constants/datetime';
import { DateInfo, ReadableDate } from '../types/datetime';

/** Parses human-readable time string from Date object. */
export function getTimeStringFromDate(datetime: Date): string {
  let timeString = "";
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();
  if (hours > 0 && hours <= 12) {
    timeString = "" + hours;
  } else if (hours > 12) {
    timeString = "" + (hours - 12);
  } else if (hours === 0) {
    timeString = "12";
  }

  timeString += (minutes <10) ? ":0" + minutes : ":" + minutes;
  timeString += (hours >= 12) ? " PM" : " AM";
  return timeString;
}

/** Convert date string from CMS to format recognized by all browsers. */
export function convertToUtcString(cmsDate: string) {
  const dateStringArr = cmsDate.split(" ");
  const dateString = (dateStringArr[0].replace(/-/g, "/") + " " +
    dateStringArr[1] + " " + dateStringArr[2]);
  return dateString;
}

/** Returns human-readable date and time strings for provided Date object. */
export function getReadableDate(date: Date): ReadableDate {
  const dateString = getWeekdayName(date.getDay()) + ", " +
    getMonthName(date.getMonth()) + " " + date.getDate();
  const timeString = getTimeStringFromDate(date);
  return {
    date: dateString,
    time: timeString,
    full: `${dateString} • ${timeString}`,
  }
}

/**
 * Converts CMS-formatted date string to JS Date object and human-readable
 * date and time strings.
 */
export function getDateInfo(cmsDate: string): DateInfo {
  const date = new Date(convertToUtcString(cmsDate));
  return {
    date: date,
    readable: getReadableDate(date),
  }
}

/** Get month name as string from month index as in JS Date objects. */
export function getMonthName(monthIndex: number): string {
  return MONTHS[monthIndex];
}

/** Get weekday name as string from weekday index as in JS Date objects. */
export function getWeekdayName(weekdayIndex: number): string {
  return WEEKDAYS[weekdayIndex];
}  

/** Returns true if two readable date strings are on the same day, else false. */
export function isSameDay(readableDateA: string, readableDateB: string) {
  return readableDateA.split("•")[0] === readableDateB.split("•")[0];
}
