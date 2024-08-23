"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { LeaveRequest, LeaveState } from "@prisma/client";
import { useEffect } from "react";

interface CalendarProps {
  events: {
    title: string | undefined;
    start: string | undefined;
    end: string | undefined;
    state: LeaveState | undefined;
  }[];
}

const Cal = ({ events }: CalendarProps) => {
  useEffect(() => {
    console.log(events);
  });

  return (
    <div className="w-[calc(100%/2)]">
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

export default Cal;
