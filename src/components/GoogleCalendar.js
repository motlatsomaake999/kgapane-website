// src/components/GoogleCalendar.js
export default function GoogleCalendar({ title = "School Calendar" }) {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Africa/Johannesburg"
      style={{ border: 0 }}
      width="100%"
      height="600"
      frameBorder="0"
      scrolling="no"
      title={title}
    ></iframe>
  );
}
