import { EVENT_TYPES } from "../../constants/eventTypes";

export function EventTypeDescriptions() {
  return (
    <div className="EventTypeDescriptions">
      <h3>Event Types</h3>
      {Array.from(EVENT_TYPES.entries()).map(([eventType, eventTypeData]) => {
        return (
          <p><b>{eventType}</b>: {eventTypeData.description}</p>
        );
      })}
    </div>
  )
}
