"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface CalendarProps {
  events: {
    title: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }[];
}

const Calendar = ({ events }: CalendarProps) => {
  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        fixedWeekCount={false}
        height="auto"
        firstDay={1}
        events={events}
      />
    </div>
  );
};

export default Calendar;
