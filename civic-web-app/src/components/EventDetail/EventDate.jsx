import { isMultiDay } from "../../helpers/civEvents";

export default function EventDate({ civEvent }) {
  let firstLine, secondLine;
  if (isMultiDay(civEvent)) {
    firstLine = <p>{ `${civEvent.start.readable.full} —` }</p>
    secondLine = <p>{ civEvent.end.readable.full }</p>
  } else {
    if (civEvent.end) {
      firstLine = <p>{ civEvent.start.readable.date }</p>;
      secondLine = (
        <p>
          { `${civEvent.start.readable.time} — ${civEvent.end.readable.time}` }
        </p>
      );
    } else {
      firstLine = <p>{ civEvent.start.readable.full }</p>;
    }
  }
  
  return (
    <div className="eventDetailDate">
      { firstLine }
      { secondLine }
    </div>
  );
}
